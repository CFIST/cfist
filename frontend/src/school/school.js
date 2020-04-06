import React, { Component } from 'react';
import './school.css';
import { Redirect , Link} from "react-router-dom";
import Navigation from '../navigation';
import {MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBBtn} from 'mdbreact';

let schoolData = [];
class School extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {
      schoolData:[],
      schoolName: this.props.location.schoolProps.schoolName,
        players: [{image: "https://i.insider.com/5df0f9d1fd9db20df51b6ba2?width=1600&format=jpeg&auto=webp", name:"Odell Beckham Jr."},
                  {image: "https://static.clubs.nfl.com/image/private/t_editorial_landscape_6_desktop/f_auto/v1560185130/patriots/vfacx65d5r66rikwni1x.jpg", name:"Tom Brady"},
                  {image: "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/ROD339293.png", name:"Aaron Rodgers"},
                  {image: "https://pbs.twimg.com/profile_images/871390705712680960/Ql0VzJzC_400x400.jpg", name:"J. J. Watt"},
                  {image: "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/BRE229498.png", name:"Drew Brees"},]
    }
   

    async componentWillMount(){
      await this.getSchoolData();
      console.log(this.state.schoolName);
      console.log(this.schoolName);
      console.log("COMPONENT DID MOUNT");
      console.log(this.state.schoolData);
    }

    getSchoolData =  async _=>{
      await fetch(`http://localhost:4000/getSchoolData?school_name=${this.props.location.schoolProps.schoolName}&zip_code=${this.props.location.schoolProps.zipcode}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ schoolData: res.data });
        schoolData = res.data;
      })
      .catch(err => console.error(err));
      console.log(this.state.schoolData);
      console.log();

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
          <div className="wrapper" align="center">
          <nav id="sidebar" style={{alignSelf:"center"}}>
            <div className="sidebar-header" style={{alignContent:"center"}}>
              <img className="center" style={{alignContent:"center"}} src={this.state.schoolData.map ((p)=> p.school_logo)} width="200" height="200" alt="SJSU SAMMY" />
              <h3>{this.state.schoolData.map ((p)=> p.school_name)}</h3>
            </div>
            <ul className="list-unstyled" >
              <p style={{textAlign:"left"}}>
                  
              </p>
            </ul>
          </nav>
  
          {/* <!-- Page Content  --> */}
          <div id="content">
             <p style={{fontSize:"100"}}> Players who went to this San Jose State University </p>
            <div className="card-inline" id="cards">
                {this.state.players.map(p => this.renderPlayers(p.image,p.name))}
                {this.state.schoolData.map(p => console.log(p))}
            </div>
          </div>
        </div>
      );
  }  
}

export default School;