import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import Home from "./home/home";
import School from "./school/school";
import Login from "./login/login";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn } from "mdbreact";
import Signup from "./signup/signup";


    class Navigation extends Component {
      constructor(props) {
        super(props);
        this.state = {
            isOpen: false

        };
      }
        toggleCollapse = () => {
            this.setState({ isOpen: !this.state.isOpen });
        }
    
      render() {
        return (
          <Router>
              <MDBNavbar style={{position:"fixed", width:"100%"}} color="stylish-color" expand="md">
              <MDBNavLink style={{color:"white"}} to='/home'>CFIST</MDBNavLink>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <MDBNavLink style={{color:"white"}} to="/home">Home</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                          <a href="/"> <button className="btn btn-light">Login</button></a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            <Switch >
              <Route path="/" exact component={Login} />
              <Route path="/signup" exact component={Signup}/>
              <Route path="/home" exact component={Home}/>
              <Route path="/school" exact component={School}/>
            </Switch>
          </Router>
        );
      }

      logIn = _=>{
        console.log("login");
        return <Redirect to={{ pathname: '/home'}}/>
      }
    }
    export default Navigation;