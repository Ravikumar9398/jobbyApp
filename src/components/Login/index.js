import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShow: false,
    errorMsg: '',
  }

  renderUsernameInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      isShow: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderInputForm = () => {
    const {username, password, isShow, errorMsg} = this.state
    return (
      <form className="username-container" onSubmit={this.submitForm}>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="input"
          onChange={this.renderUsernameInput}
          value={username}
        />
        <br />
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="input"
          onChange={this.onChangePasswordInput}
          value={password}
        />
        <br />
        <button type="submit" className="login-btn">
          Login
        </button>
        {isShow && <p className="error-msg">{errorMsg}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-info-back">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <div>{this.renderInputForm()}</div>
        </div>
      </div>
    )
  }
}

export default Login
