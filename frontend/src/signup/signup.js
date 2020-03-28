import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        username: '',
        email: '',
        password: '',
        admin:1,
        adminCode: "123"
    };
  }

  signUp = _ => {
      console.log(this.state.username, this.state.email, this.state.password,this.state.admin);
    fetch(
      `http://localhost:4000/addUser?username=${this.state.username}&password=${this.state.password}&email=${this.state.email}&administrator=${this.state.admin}`
    ).catch(err => console.log(err));
    this.setState({ redirect: true });
  };

  showAdmin = _ =>{
      
  }

  render() {
    const { user } = this.state;
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <div className="logo rounded mx-auto d-block">
          <img width="300" height="200" src="https://esportsobserver.com/wp-content/uploads/2019/05/ncaa-no-go-on-collegiate-esports.jpg" alt="NCAA LOGO" />
          <p className="h3 mb-3 text-center font-weight-bold">CFIST</p>
          <h1 className="text-center h4 mb-3 font-weight-normal">Sign Up</h1>
          <label htmlFor="inputPassword" className="sr-only"> Username </label>
          <input  type="name" id="inputPassword" className="form-control" onChange={e => this.setState({ username: e.target.value })  } placeholder="Username" required autoFocus ></input>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input type="email" id="inputEmail" className="form-control" onChange={e =>  this.setState({ email: e.target.value  }) }  placeholder="Email address" required ></input>
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input  type="password" id="inputPassword"  className="form-control" onChange={e => this.setState({password: e.target.value })} placeholder="Password" required></input>
          <br/>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp}  type="submit" >
            Sign Up
          </button>
          <div className="mb-3">
            Already have an account? &nbsp;
            <Link to="/">Sign in</Link>
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; NCAA 2020</p>
        </div>
      </div>
    );
  }
}

export default Signup;
