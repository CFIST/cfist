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
        admin:'',
        incorrect: false,
        adminCode: "123"
    };
  }

  signUp = async _ => {
    console.log(this.state.username, this.state.email, this.state.password);
    if(this.state.admin === this.state.adminCode){
      await fetch(
        `http://localhost:4000/addUser?username=${this.state.username}&password=${this.state.password}&email=${this.state.email}`
      ).catch(err => console.log(err));
      await this.setState({ redirect: true });
    }
    else{
      await this.setState({incorrect:true})
      console.log(this.state.incorrect);
    }
  };

  showIncorrect = _ =>{
    console.log(this.state.incorrect);
    if(this.state.incorrect){
      return <div style={{color:"red"}}> Admin Code Incorrect </div>
    }
    else{
      return <div> </div>
    }
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
          <label htmlFor="inputPassword" className="sr-only">
            Admin Code
          </label>
          <input  type="password" id="inputPassword"  className="form-control" onChange={e => this.setState({admin: e.target.value })} placeholder="Admin Code" required></input>
          <br/>
          {this.showIncorrect()}
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
