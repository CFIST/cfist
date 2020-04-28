import React, { Component } from 'react';
import './login.css';
import { Redirect , Link} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
    }
    state = {
      username: undefined,
      email: undefined,
      password: undefined,
      admin:undefined,
      dbuser:[],
      dbusername: undefined,
      dbemail: undefined,
      dbpassword: undefined,
      dbadmin:undefined,
      validate: false
    }

    render(){
      const { user } = this.state;
      if (this.state.validate) {
        return <Redirect to={{
          pathname: '/',
          state: {email: this.state.email, username: this.state.username, admin: this.state.admin }
        }} />;
      }
      return (
      <div>
      <div className="logo rounded mx-auto d-block">
        <img width="300" height="200" src="https://esportsobserver.com/wp-content/uploads/2019/05/ncaa-no-go-on-collegiate-esports.jpg"  alt="NCAA LOGO" />
        <p className="h3 mb-3 text-center font-weight-bold">
          CFIST
        </p>
        <h1 className="text-center h4 mb-3 font-weight-normal">
          Sign In
        </h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input type="email" id="inputEmail" className="form-control" onChange={e => this.setState({ email: e.target.value }) } placeholder="Email address" required autoFocus>
        </input>
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input type="password" id="inputPassword" className="form-control" onChange={e => this.setState({ password: e.target.value }) } placeholder="Password" required >
        </input>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.logIn} type="submit">Log in</button>
        <div className="mb-3">
          Need an account? &nbsp;
          <Link to="/signup">Sign up</Link>
        </div>
        <p className="mt-5 mb-3 text-muted">&copy; NCAA 2020</p>
      </div>
    </div>
        );
    }

    logIn = async _=>{
      const {email, dbuser} = this.state;
      await fetch(`http://localhost:4000/login?email=${email}`)
      .then(res => res.json().then(res => this.setState({
          dbuser: res.data
        }, ()=> this.state.dbuser.map((p)=> (
          this.setState({
            username: p.username,
            email: p.email,
            pass: p.password,
            profile_pic_path: p.profile_pic_path
          })
        ))
        )))
        
        console.log(this.state.pass);
        console.log(this.state.password);
        if(this.state.pass === this.state.password && this.state.pass !== "" && this.state.pass !== null && this.state.pass !== undefined){
          localStorage.setItem("loginToken", this.state.username);
          this.setState({validate: true});
          window.location.reload(false);
        }
    };
}

export default Login;