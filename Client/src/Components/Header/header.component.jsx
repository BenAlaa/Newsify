import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './Assets/news-logo.png';
import './header.styles.css';

const Header = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light   fixed-top header-container">
            <NavLink className="navbar-brand" to="/home">
                <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="logo" />
                <span>Newsify</span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/sources">Sources</NavLink>
                    </li>
                    {!user &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                    }
                    {user && <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user.name}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <NavLink className="dropdown-item" to="/">Home</NavLink>
                            <NavLink className="dropdown-item" to="/sources">Sources</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                        </div>
                    </li>}
                </ul>
            </div>
        </nav>
    );
}

export default Header;