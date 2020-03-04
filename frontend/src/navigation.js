import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/home";
import About from "./about/about";

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";


    class Navigation extends Component {
        state = {
            isOpen: false
        };
    
        toggleCollapse = () => {
            this.setState({ isOpen: !this.state.isOpen });
        }
    
      render() {
        return (
          <Router>
              <MDBNavbar color="stylish-color" expand="md">
              <MDBNavLink style={{color:"white"}} to='/'>CFIST</MDBNavLink>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <MDBNavLink style={{color:"white"}} to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <MDBNavLink style={{color:"white"}} to='/about'>About</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <MDBFormInline waves>
                            <div className="md-form my-0" style={{color:"white"}}>
                            <input className="form-control mr-sm-2" style={{color:"white"}} type="text" placeholder="Search" aria-label="Search" />
                            </div>
                        </MDBFormInline>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
            </Switch>
          </Router>
        );
      }
    }
    export default Navigation;