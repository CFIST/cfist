import React, { Component } from 'react';
import './home.css';
import { Redirect , Link} from "react-router-dom";
import Navigation from '../navigation';
import Button from 'mdbreact';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {

    }

    render(){
        return (
            <div>
                <div> This is  home </div>
                <a href="/about"> <button className="btn" color="stylish-color">About</button></a>
            </div>
        );
    }
}

export default Home;