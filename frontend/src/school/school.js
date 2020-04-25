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
      mostRecentSeason_id:"",

      player_id:"",
      player_number:"",
      player_name:"",
      nfl_team: "",
      position:"",
      player_recruting_rank:"",
      player_image:"",

      season_id:"",
      year:"",
      final_cfr_rank:"",
      total_wins:"",
      total_losses:"",
      conference_wins:"",
      conference_losses:"",
      champions:"",

      playerData:[],
      seasonData:[],
    }
   

    async componentWillMount(){
      await this.getSchoolData();
      await this.getMostRecentPlayerID();
      await this.getPlayerData();
      await this.getSeasonData();
      await this.getMostRecentSeasonID();
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

    getMostRecentSeasonID = async _=>{
      await fetch(`http://localhost:4000/getseasonid`)
       .then(res => res.json())
       .then(res => {
        this.setState({ mostRecentSeason_id: res.data[0].season_id});
      })
      .catch(err => console.error(err));

      console.log(this.state.mostRecentSeason_id);
      if(this.state.mostRecentSeason_id === undefined || this.state.mostRecentSeason_id === null || this.state.mostRecentSeason_id === ''){
        await this.setState({mostRecentSeason_id:0});
      }
      console.log(this.state.mostRecentSeason_id);
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

    getSeasonData =  async _=>{
      let team_name = await this.state.schoolData.map((p)=>p.team_name);
      let conference = await this.state.schoolData.map((p)=>p.conference);

      await fetch(`http://localhost:4000/getSeasonData?team_name=${team_name}&conference=${conference}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ seasonData: res.data });
      })
      .catch(err => console.error(err));
      console.log(this.state.seasonData);
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

    renderPlayers = (name,nfl_team,position,number,recruting_rank,player_image)=>{
        return (
        <div className="card-inline" key={name}>
          <MDBCol>
            <MDBCard style={{ width: '17rem' }}>
              <MDBCardImage className="img-fluid" src={player_image} waves />
              <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                NFL Team: {nfl_team}<br/>
                Number: {number}<br/>
                Position: {position} <br/>
                Recruting Rank: {recruting_rank}<br/>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </div>);
    }

    renderSeasons = (record_year,final_CFP_rank,total_wins,total_losses,conference_losses,conference_wins,champions)=>{
      return (
          <tr>
            <th scope="row"> {record_year}</th>
            <td>{final_CFP_rank}</td>
            <td>{total_wins}</td>
            <td>{total_losses}</td>
            <td>{conference_wins}</td>
            <td>{conference_losses}</td>
            <td>{champions}</td>
          </tr>);
    }
  

  showAddSeason = _=>{
    if(localStorage.getItem("loginToken") == null){
      return <div> </div>;
    }
    else{
      return (
        <PopupState  variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <div>
                  <button className="btn btn-primary" color="primary" {...bindTrigger(popupState)}>
                    Add New Season
                  </button>
                  <Popover {...bindPopover(popupState)} anchorOrigin={{height: "100%", width: "50vw", vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ height: "100%", width: "50vw", vertical: 'top', horizontal: 'center'}}>
                    <div style={{paddingTop:"10%",paddingBottom:"10%", paddingLeft:"10%", paddingRight:"10%"}} align="center">        
                    <Box p={5}>
                    <p align="center" style={{fontSize:"35px",color:"blue"}}> Season </p>
                    <p align="top" style={{color:"blue"}}> Year <br/>

                    <input id="year_box" type="textbox" rows="1" label="School Name" onChange={e =>this.setState({year: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Final CFP Rank<br/>
                    <input id="final_CFP_rank_box" type="textbox" rows="1" label="zipcode" onChange={e =>this.setState({final_cfr_rank: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Total Wins<br/>
                    <input id="total_wins_box"  type="textbox" rows="5" label="city" onChange={e =>this.setState({total_wins: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Total Losses<br/>
                    <input id="total_losses_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({total_losses: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Conference Wins<br/>
                    <input id="conference_wins_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({conference_wins: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Conference Losses<br/>
                    <input id="conference_losses_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({conference_losses: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Champions<br/>
                    <input id="chapions_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({champions: e.target.value})}/>
                    </p>
                    <button className="btn btn-success"  color="primary" onClick={this.addNewSeason}>ADD</button>
                    </Box>
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
      );
      }
  }

  showAddPlayer = _=>{
    if(localStorage.getItem("loginToken") == null){
      return <div> </div>;
    }
    else{
      return (
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
                    <p align="top" style={{color:"blue"}}> Position<br/>
                    <input id="city_box"  type="textbox" rows="5" label="city" onChange={e =>this.setState({position: e.target.value})}/>
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
      );
      }
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
            {this.showAddSeason()}

            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">CFP Rank</th>
                    <th scope="col">Wins</th>
                    <th scope="col">Losses</th>
                    <th scope="col">Conference Wins</th>
                    <th scope="col">Conference Losses</th>
                    <th scope="col">Champions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.seasonData.map(p=> this.renderSeasons(p.record_year,p.final_CFP_rank,p.total_wins,p.total_losses,p.conference_losses,p.conference_wins,p.champions))}
                </tbody>
                </table>
                
            
                {/* {this.state.players.map(p => this.renderPlayers(p.image,p.name))} */}

                {this.showAddPlayer()}
                {this.state.playerData.map(p=> this.renderPlayers(p.name,p.nfl_team,p.position,p.number,p.recruting_rank,p.player_image))}
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
    console.log(this.state.position);
    console.log(this.state.player_recruting_rank);
    console.log(this.state.player_image);
    let team_name = this.state.schoolData.map((p)=>p.team_name);
    let conference = this.state.schoolData.map((p)=> p.team_conference);
    await fetch(`http://localhost:4000/addBelongsTo?player_id=${this.state.player_id}&team_name=${team_name}&conference=${conference}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    await fetch(`http://localhost:4000/addPlayers?player_id=${this.state.player_id}&number=${this.state.player_number}&name=${this.state.player_name}&nfl_team=${this.state.nfl_team}&position=${this.state.position}&recruting_rank=${this.state.player_recruting_rank}&player_image=${this.state.player_image}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    await this.getMostRecentPlayerID();
    await this.getPlayerData();
    console.log(this.state.mostRecentPlayer_id);
  }

  addNewSeason = async _=>{
    await this.setState({season_id: this.state.mostRecentSeason_id+1});
    let team_name = this.state.schoolData.map((p)=>p.team_name);
    let conference = this.state.schoolData.map((p)=>p.conference)
    await fetch(`http://localhost:4000/addHasRecord?season_id=${this.state.season_id}&team_name=${team_name}&record_year=${this.state.year}&conference=${conference}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    await fetch(`http://localhost:4000/addSeasonRecords?final_CFP_rank=${this.state.final_cfr_rank}&total_wins=${this.state.total_wins}&total_losses=${this.state.total_losses}&conference_losses=${this.state.conference_losses}&conference_wins=${this.state.conference_wins}&season_id=${this.state.season_id}&champions=${this.state.champions}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    await this.getMostRecentSeasonID();
    await this.getSeasonData();
    console.log(this.state.mostRecentSeason_id);
  }


}

export default School;