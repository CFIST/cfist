import React, { Component } from 'react';
import './home.css';
import { Redirect , Link} from "react-router-dom";
import Navigation from '../navigation';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        school_name:"",
        zip_code:"",
        city:"",
        state:"",
        tuition:"",
        school_logo:"",

        teamname:"",
        conference:"",
        mascot:"",
        nationalChampionships:"",
        heismanTropies:"",
        team_logo:"",
        
        coach_id:"",
        experience:"",
        gameplan:"",
        coach_name:"",

        mostRecentCoach_id:"",

        cardData:[],
        searchQuery:""
    }

    async componentWillMount(){
      await this.getMostRecentCoachID();
      console.log(this.state.mostRecentCoach_id);
      await this.getSchools();
    }

    getSchools = async _=>{
      await fetch(`http://localhost:4000/getSchools`)
      .then(res => res.json())
      .then(res => {
        this.setState({ cardData: res.data });
      })
      .catch(err => console.error(err));
      console.log(this.state.cardData);
    }

    getMostRecentCoachID = async _=>{
      await fetch(`http://localhost:4000/getcoachid`)
       .then(res => res.json())
       .then(res => {
        this.setState({ mostRecentCoach_id: res.data[0].coach_id });
      })
      .catch(err => console.error(err));

      console.log(this.state.mostRecentCoach_id);
      if(this.state.mostRecentCoach_id === undefined || this.state.mostRecentCoach_id === null || this.state.mostRecentCoach_id === ''){
        await this.setState({mostRecentCoach_id:0});
      }
      
      console.log(this.state.mostRecentCoach_id);
    }

    renderSchoolCard = (tuition,state,zip_code,name,city,school_logo)=>{
      return(
        <div className="card-inline">
          <div className="flip-container" onTouchStart="this.classList.toggle('hover');">
          <div className="flipper">
            <div className="front">
              <img className="flip-container"src={school_logo} alt={name}/>
            </div>
            <div align="center" class="back">
              <strong style={{color:"white", fontSize:"150%"}}> {name} </strong>
              <br/>
              <p style={{color:"white", fontSize:"100%"}}> State: {state} <br/>
               Zip Code: {zip_code}<br/>
               City: {city}<br/>
               Tuition: {tuition}<br/>
                <Link to ={{pathname:'school', schoolProps: {schoolName: name, zipcode: zip_code}}}> <button className="btn btn-success" color="stylish-color">View Team</button></Link></p>
            </div>
          </div>
        </div>
        </div>
        );
    }

    render(){
        return (
            <div>
                <div id="top-margin"> 
                <PopupState  variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <div>
                  <button className="btn btn-primary" color="primary" {...bindTrigger(popupState)}>
                    Add New School
                  </button>
                  <Popover {...bindPopover(popupState)} anchorOrigin={{height: "100%", width: "50vw", vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ height: "100%", width: "50vw", vertical: 'top', horizontal: 'center'}}>
                    <div style={{paddingTop:"10%",paddingBottom:"10%", paddingLeft:"10%", paddingRight:"10%"}}>        
                    <Box >
                    <p align="center" style={{fontSize:"35px",color:"blue"}}> Add New School </p>
                    <p align="top" style={{color:"blue"}}> School <br/>
                    <input id="school_name_box" type="textbox" rows="1" label="School Name" onChange={e =>this.setState({school_name: e.target.value})}/>
                    </p>

                    <p align="top" style={{color:"blue"}}> Zipcode<br/>
                    <input id="zipcode_box" type="textbox" rows="1" label="zipcode" onChange={e =>this.setState({zip_code: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> City<br/>
                    <input id="city_box"  type="textbox" rows="5" label="city" onChange={e =>this.setState({city: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> State<br/>
                    <input id="state_box" type="textbox" rows="5" label="state" onChange={e =>this.setState({state: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Tuition<br/>
                    <input id="tuition_box" type="textbox" rows="5" label="tuition" onChange={e =>this.setState({tuition: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Weblink of school logo<br/>
                    <input id="school_logo_box" type="textbox" rows="5" label="school_logo" onChange={e =>this.setState({school_logo: e.target.value})}/>
                    </p>

                    <p align="top" style={{color:"blue"}}> Teamname<br/>
                    <input id="teamname_box" type="textbox" rows="5" label="teamname" onChange={e =>this.setState({teamname: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Conference<br/>
                    <input id="conference_box" type="textbox" rows="5" label="conference" onChange={e =>this.setState({conference: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Mascot<br/>
                    <input id="mascot_box" type="textbox" rows="5" label="mascot" onChange={e =>this.setState({mascot: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> National Championships<br/>
                    <input id="nationalChampionships_box" type="textbox" rows="5" label="nationalChampionships" onChange={e =>this.setState({nationalChampionships: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Heisman Tropies<br/>
                    <input id="heismanTropies_box" type="textbox" rows="5" label="heismanTropies" onChange={e =>this.setState({heismanTropies: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Weblink of Team Logo<br/>
                    <input id="team_logo_box" type="textbox" rows="5" label="team_logo" onChange={e =>this.setState({team_logo: e.target.value})}/>
                    </p>

                    <p align="top" style={{color:"blue"}}> Coach Name<br/>
                    <input id="coach_name_box" type="textbox" rows="5" label="coach_name" onChange={e =>this.setState({coach_name: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Experience  <br/>
                    <input id="experience_box" type="textbox" rows="5" label="experience" onChange={e =>this.setState({experience: e.target.value})}/>
                    </p>
                    <p align="top" style={{color:"blue"}}> Gameplan   <br/>
                    <input id="gameplan_box" type="textbox" rows="5" label="gameplan" onChange={e =>this.setState({gameplan: e.target.value})}/>
                    </p>
                    <button className="btn btn-success"  color="primary" onClick={this.addNewSchool}>ADD</button>
                    </Box  >
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
            <div className="card-inline" id="cards" >
            {this.state.cardData.map(p => this.renderSchoolCard(p.tuition,p.state,p.zip_code,p.name,p.city,p.school_logo))}
            </div>
              </div>
            </div>
        );
    }

    addNewSchool = async _=>{
      await this.setState({coach_id: this.state.mostRecentCoach_id+1});
      console.log(this.state.school_name);
      console.log(this.state.zip_code);
      console.log(this.state.city);
      console.log(this.state.state);
      console.log(this.state.tuition);
      console.log(this.state.school_logo);
      console.log(this.state.teamname);
      console.log(this.state.conference);
      console.log(this.state.mascot);
      console.log(this.state.conference);
      console.log(this.state.nationalChampionships);
      console.log(this.state.heismanTropies);
      console.log(this.state.team_logo);
      console.log(this.state.coach_id);
      console.log(this.state.experience);
      console.log(this.state.gameplan);
      console.log(this.state.coach_name);


      await fetch(`http://localhost:4000/addSchool?tuition=${this.state.tuition}&state=${this.state.state}&zip_code=${this.state.zip_code}&name=${this.state.school_name}&city=${this.state.city}&school_logo=${this.state.school_logo}`)
      .then(res => res.json())
      .catch(err => console.error(err));

      await fetch(`http://localhost:4000/addFootballProgram?school_zip_code=${this.state.zip_code}&school_name=${this.state.school_name}&team_name=${this.state.teamname}&team_conference=${this.state.conference}`)
      .then(res => res.json())
      .catch(err => console.error(err));

      await fetch(`http://localhost:4000/addCollegeTeam?team_name=${this.state.teamname}&heisman_trophies=${this.state.heismanTropies}&conference=${this.state.conference}&mascot=${this.state.mascot}&national_championships=${this.state.nationalChampionships}&team_logo=${this.state.team_logo}`)
      .then(res => res.json())
      .catch(err => console.error(err));
      
      await fetch(`http://localhost:4000/addCoachedBy?coach_id=${this.state.coach_id}&team_name=${this.state.teamname}&conference=${this.state.conference}`)
      .then(res => res.json())
      .catch(err => console.error(err));

      await fetch(`http://localhost:4000/addCoach?gameplan=${this.state.gameplan}&coach_id=${this.state.coach_id}&experience=${this.state.experience}&coach_name=${this.state.coach_name}`)
      .then(res => res.json())
      .catch(err => console.error(err));

      await this.getSchools();
      await this.getMostRecentCoachID();
      console.log(this.state.mostRecentCoach_id);
    }
}

export default Home;