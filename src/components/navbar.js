import React from 'react';

/*
Navbar
*/

export default class Navbar extends React.Component {
    render(){
        return(

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
                <a className="navbar-brand" href="#">
                    <i className="fas fa-shapes"></i>
                    <b>OpenShapes</b>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Tutorial </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Gallery</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    
                    </ul>
                </div>
            </nav>

        );
    }
}