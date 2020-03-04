import React, {Component} from "react"


class Header extends Component{
    render() {
        return (
            <nav className="navbar">
                <a className="navbar-brand" href="#">
                    CFIST
                </a>
                     <input className="form-control mr-sm-2" type="text"/>
                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                        Search
                    </button>
                <a className="navbar-brand" href="#">
                    Login
                </a>
            </nav>
        );
    };
}
export default Header;
