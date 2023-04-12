import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <div className="mobile-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobile-web-logo"
          />
        </Link>
        <ul className="mobile-component-items">
          <Link to="/">
            <li className="component-item">
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="component-item">
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>

          <li className="component-item">
            <button type="button" onClick={onClickLogout}>
              <FiLogOut className="icon" />
            </button>
          </li>
        </ul>
      </div>
      <div className="medium-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="components-list">
          <Link to="/" className="link">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="list-item">Jobs</li>
          </Link>
        </ul>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
