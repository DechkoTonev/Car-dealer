import React, { Component } from 'react';
import './NavigationBar.css';

export default class NavigationBar extends Component {
    render() {
        let username = this.props.username;
        if (username == null) {
            // No user logged in
            return (
                    <nav className="navigation-bar">
                        <div id="navbar-main">
                            <div className="navbar navbar-inverse navbar-fixed-top">
                                <div className="container">
                                    <div className="navbar-collapse collapse">
                                        <ul className="nav navbar-nav">
                                            <li><a href="#" onClick={this.props.homeClicked}>Home</a></li>
                                            <li><a href="#" onClick={this.props.loginClicked}>Login</a></li>
                                            <li><a href="#" onClick={this.props.registerClicked}>Register</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
            );
        } else {
            // User logged in
            return (
                <nav className="navigation-bar">
                    <div id="navbar-main">
                        <div className="navbar navbar-inverse navbar-fixed-top">
                            <div className="container">
                                <div className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#" onClick={this.props.homeClicked}>Home</a></li>
                                        <li><a href="#" onClick={this.props.booksClicked}>List Books</a></li>
                                        <li><a href="#" onClick={this.props.createBookClicked}>Create Book</a></li>
                                        <li><a href="#" onClick={this.props.showCarsClicked}>Showroom</a></li>
                                        <li><a href="#" onClick={this.props.myCarsClicked}>My Cars</a></li>
                                        <li><a href="#" onClick={this.props.logoutClicked}>Logout</a></li>
                                        <li>
                                            <span className="loggedInUser"> Welcome, {username}!
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
    }
}
