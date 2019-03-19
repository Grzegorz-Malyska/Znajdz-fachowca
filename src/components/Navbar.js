import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-inverse navbar-expand-lg navbar-header navbar-dark pb_navbar pb_scrolled-light" id="pb-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">Znajdź fachowca</Link>
                <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                        data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span><i className="ion-navicon" /></span>
                </button>
                <div className="collapse navbar-collapse" id="probootstrap-navbar">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="nav-link" href="#section-home">Strona główna</a></li>
                        <li className="nav-item"><a className="nav-link" href="#section-features">Funkcjonalności</a></li>
                        <li className="nav-item"><a className="nav-link" href="#section-faq">FAQ</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
