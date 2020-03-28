import React, { Component } from 'react';
import './home.css';
import { Redirect , Link} from "react-router-dom";
import Navigation from '../navigation';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {

    }

    render(){
        return (
            <div>
                
                <div id="top-margin"> 
                <a onClick={this.addNewSchool}> <button className="btn" color="stylish-color">ADD NEW SCHOOL</button></a>
                    This is home <br/> 
                <a href="/school"> <button className="btn" color="stylish-color">SJSU</button></a>
                </div>
            </div>
        );
    }

    addNewSchool = _=>{
        console.log("add new school")
    }
}

export default Home;