import React, { Component } from 'react';
import './school.css';
import { Redirect , Link} from "react-router-dom";
import Navigation from '../navigation';
import {MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBBtn} from 'mdbreact';

class School extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        players: [{image: "https://i.insider.com/5df0f9d1fd9db20df51b6ba2?width=1600&format=jpeg&auto=webp", name:"Odell Beckham Jr."},
                  {image: "https://static.clubs.nfl.com/image/private/t_editorial_landscape_6_desktop/f_auto/v1560185130/patriots/vfacx65d5r66rikwni1x.jpg", name:"Tom Brady"},
                  {image: "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/ROD339293.png", name:"Aaron Rodgers"},
                  {image: "https://pbs.twimg.com/profile_images/871390705712680960/Ql0VzJzC_400x400.jpg", name:"J. J. Watt"},
                  {image: "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/BRE229498.png", name:"Drew Brees"},]
    }

    renderPlayers = (image, name)=>{

        return (
        <div className="card-inline" key={name}>
          <MDBCol>
            <MDBCard style={{ width: '17rem' }}>
              <MDBCardImage className="img-fluid" src={image} waves />
              <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBBtn color="primary">VIEW STATS</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </div>);
    }

    render(){
        return (
            <div className="wrapper">
            <nav id="sidebar" style={{alignSelf:"center"}}>
              <div className="sidebar-header" style={{alignContent:"center"}}>
                <img className="center" style={{alignContent:"center"}} width="100" height="100" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/San_Jose_State_Spartans_logo.svg/378px-San_Jose_State_Spartans_logo.svg.png" alt="SJSU SAMMY" />
                <h3>San Jose State University</h3>
              </div>
              <ul className="list-unstyled" >
                <p style={{textAlign:"left"}}>
                    * San José State University (San Jose State or SJSU) is a public university in San Jose, California.<br/>
                    * SJSU is the oldest public university on the West Coast and the founding campus of the California State University (CSU) system.<br/>
                    * SJSU offers 145 bachelor's and master's degrees with 108 concentrations and five credential programs with 19 concentrations. <br/>
                    * The university also offers four doctoral degrees as of fall 2019. SJSU is accredited by the Western Association of Schools and Colleges (WASC).<br/>
                    * SJSU's total enrollment was 33,282 in fall 2019, including over 5,400 graduate and credential students.<br/>
                    </p>
              </ul>
            </nav>
    
            {/* <!-- Page Content  --> */}
            <div id="content">
               <p style={{fontSize:"100"}}> Players who went to this San Jose State University </p>
              <div className="card-inline" id="cards">
                  {this.state.players.map(p => this.renderPlayers(p.image,p.name))}
              </div>
            </div>
          </div>
        );
    }
}

export default School;