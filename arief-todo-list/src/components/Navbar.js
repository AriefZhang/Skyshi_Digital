import "../assets/css/Navbar.css"
import { Link, useLocation } from "react-router-dom";

import TodoBackIcon from '../assets/icon/todo-back-white-button.svg'

export default function Navbar() {
  const location = useLocation();
  const isActivity = location.pathname.includes('activity')
  const winWidth = window.innerWidth

  return (
    <div className="navbar__wrapper">
      {
        isActivity && winWidth < 580 ? (
          <Link
            className='navbar__to-home-page-mobile center'
            to="/"
          >
            <img src={TodoBackIcon} alt=""/>
            <h5 data-cy='header-title'>New Activity</h5>
          </Link>
        ) : !isActivity || winWidth >= 580 ? (
          <Link
            className="navbar__to-home-page fw-700"
            to="/"
            data-cy='header-title'
          >
            TO DO LIST APP
          </Link>
        ) : <></>
      }
    </div>
  )
}