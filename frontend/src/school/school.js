import React, { Component } from 'react';
import './school.css';
import { Redirect , Link} from "react-router-dom";
import Navigation from '../navigation';
import {MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle} from 'mdbreact';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

class School extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {
      schoolData:[],
      schoolName: this.props.location.schoolProps.schoolName,
      mostRecentPlayer_id:"",
      player_id:"",
      player_number:"",
      player_name:"",
      nfl_team: "",
      player_recruting_rank:"",
      player_image:"",

      playerData:[]
    }
   

    async componentWillMount(){
      await this.getSchoolData();
      await this.getMostRecentPlayerID();
      await this.getPlayerData();
      console.log(this.state.schoolName);
      console.log(this.state.schoolData);
      console.log("COMPONENT DID MOUNT");
      console.log(this.state.playerData);
    }

    getMostRecentPlayerID = async _=>{
      await fetch(`http://localhost:4000/getplayerid`)
       .then(res => res.json())
       .then(res => {
        this.setState({ mostRecentPlayer_id: res.data[0].player_id});
      })
      .catch(err => console.error(err));

      console.log(this.state.mostRecentPlayer_id);
      if(this.state.mostRecentPlayer_id === undefined || this.state.mostRecentPlayer_id === null || this.state.mostRecentPlayer_id === ''){
        await this.setState({mostRecentPlayer_id:0});
      }
      console.log(this.state.mostRecentPlayer_id);
    }


    getSchoolData =  async _=>{
      await fetch(`http://localhost:4000/getSchoolData?school_name=${this.props.location.schoolProps.schoolName}&zip_code=${this.props.location.schoolProps.zipcode}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ schoolData: res.data });
      })
      .catch(err => console.error(err));
      console.log(this.state.schoolData);
      console.log();

    }

    getPlayerData =  async _=>{
      let team_name = await this.state.schoolData.map((p)=>p.team_name);
      let conference = await this.state.schoolData.map((p)=> p.team_conference);
      
      await fetch(`http://localhost:4000/getPlayerData?team_name=${team_name}&conference=${conference}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ playerData: res.data });
      })
      .catch(err => console.error(err));
      console.log(this.state.playerData);
      console.log();

    }

    renderPlayers = (name,nfl_team,number,recruting_rank,player_image)=>{
        return (
        <div className="card-inline" key={name}>
          <MDBCol>
            <MDBCard style={{ width: '17rem' }}>
              <MDBCardImage className="img-fluid" src={player_image} waves />
              <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                NFL Team: {nfl_team}<br/>
                Number: {number}<br/>
                Recruting Rank: {recruting_rank}<br/>
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
              <img className="center" style={{alignContent:"center"}} src={this.state.schoolData.map ((p)=> p.school_logo)} width="200" height="200" alt="LOGO" />
              <h3>{this.state.schoolData.map ((p)=> p.school_name)}</h3>
            </div>
            <ul className="list-unstyled" >
              <p style={{textAlign:"center", fontSize:"150%"}}>
                School Information
              <div style={{textAlign:"center", fontSize:"70%"}} >
                Name: {this.state.schoolData.map ((p)=> p.school_name)}  <br/>
                City: {this.state.schoolData.map ((p)=> p.city)}  <br/>
                State: {this.state.schoolData.map ((p)=> p.state)}  <br/>
                Zipcode: {this.state.schoolData.map ((p)=> p.zip_code)}  <br/>
                Tution: {this.state.schoolData.map ((p)=> p.tuition)}
                </div>
              </p>
              <p style={{textAlign:"center", fontSize:"150%"}}>
              <img className="center" style={{alignContent:"center"}} src={this.state.schoolData.map ((p)=> p.team_logo)} width="200" height="200" alt="LOGO" />
              <br/>
                Team Information
              <div style={{textAlign:"center", fontSize:"70%"}} >
                Team Name: {this.state.schoolData.map ((p)=> p.team_name)}  <br/>
                Conference: {this.state.schoolData.map ((p)=> p.team_conference)}  <br/>
                Mascot: {this.state.schoolData.map ((p)=> p.mascot)}  <br/>
                National Championships: {this.state.schoolData.map ((p)=> p.national_championships)}  <br/>
                Heisman Trophies: {this.state.schoolData.map ((p)=> p.heisman_trophies)}
                </div>
              </p>

              <p style={{textAlign:"center", fontSize:"150%"}}>
                Coach Information
              <div style={{textAlign:"center", fontSize:"70%"}} >
                Coach Name: {this.state.schoolData.map ((p)=> p.coach_name)}  <br/>
                Experience: {this.state.schoolData.map ((p)=> p.experience)}  <br/>
                </div>
              </p>
            </ul>
           
          </nav>
  
          {/* <!-- Page Content  --> */}
          <div id="content">
            <div className="card-inline" id="cards">
            <PopupState  variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <div>
                  <button className="btn btn-primary" color="primary" {...bindTrigger(popupState)}>
                    Add New Player
                  </button>
                  <Popover {...bindPopover(popupState)} anchorOrigin={{height: "100%", width: "50vw", vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ height: "100%", width: "50vw", vertical: 'top', horizontal: 'center'}}>
                    <div style={{paddingTop:"10%",paddingBottom:"10%", paddingLeft:"10%", paddingRight:"10%"}} align="center">        
                    <Box p={5}>
                    <p align="center" style={{fontSize:"35px",color:"blue"}}> Player </p>
                    <p align="top" style={{color:"blue"}}> Name <br/>
                    <input id="school_name_box" type="textbox" rows="1" label="School Name" onChange={e =>this.setState({player_name: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Number<br/>
                    <input id="zipcode_box" type="textbox" rows="1" label="zipcode" onChange={e =>this.setState({player_number: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> NFL Team<br/>
                    <input id="city_box"  type="textbox" rows="5" label="city" onChange={e =>this.setState({nfl_team: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Recruting Rank<br/>
                    <input id="state_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({player_recruting_rank: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Image Link<br/>
                    <input id="state_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({player_image: e.target.value})}/>
                    </p>
                    <button className="btn btn-success"  color="primary" onClick={this.addNewPlayer}>ADD</button>
                    </Box>
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
                {/* {this.state.players.map(p => this.renderPlayers(p.image,p.name))} */}
                {this.state.playerData.map(p=> this.renderPlayers(p.name,p.nfl_team,p.number,p.recruting_rank,p.player_image))}
                {this.state.schoolData.map(p => console.log(p))}
            </div>
          </div>
        </div>
      );
  }
  addNewPlayer = async _=>{
    await this.setState({player_id: this.state.mostRecentPlayer_id+1});
    console.log(this.state.player_id);
    console.log(this.state.player_number);
    console.log(this.state.player_name);
    console.log(this.state.nfl_team);
    console.log(this.state.player_recruting_rank);
    console.log(this.state.player_image);
    let team_name = this.state.schoolData.map((p)=>p.team_name);
    let conference = this.state.schoolData.map((p)=> p.team_conference);
    await fetch(`http://localhost:4000/addBelongsTo?player_id=${this.state.player_id}&team_name=${team_name}&conference=${conference}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    await fetch(`http://localhost:4000/addPlayers?player_id=${this.state.player_id}&number=${this.state.player_number}&name=${this.state.player_name}&nfl_team=${this.state.nfl_team}&recruting_rank=${this.state.player_recruting_rank}&player_image=${this.state.player_image}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    await this.getMostRecentPlayerID();
    await this.getPlayerData();
    console.log(this.state.mostRecentPlayer_id);
  }  
}

export default School;