import React from 'react';
import { Navbar, FormGroup, FormControl, Button, Grid, Row, Col, NavItem, Nav } from 'react-bootstrap';
import '../App.css';

class NavBar extends React.Component {

    
onClickTab = (value) => {
    this.props.onUpdateTab(value);
    this.props.onUpdateComponent(value);
}



    render() {
        return(
      <Navbar>
          <Row className="show-grid">
        <Col xs={6} md={3}>
        <Navbar.Brand>
            <div >
        <img class="user-profile" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
      </div>
      </Navbar.Brand>

        </Col>
        <Col xs={6} md={5}>
        
            <div class="div-left">
            <div onClick={() => this.onClickTab("post")} class={this.props.tab === "post" ? "nav-item nav-item-text nav-item-text-click": "nav-item nav-item-text"}>
            
        <p >Post<p class="text-center">2</p></p>
        
        </div>
        
        <div onClick={() => this.onClickTab("following")} 
        class={this.props.tab === "following" ? "nav-item nav-item-text nav-item-text-click"
        : "nav-item nav-item-text"}>   
        <p >Following<p class="text-center">200</p></p>
        </div>

        <div onClick={() => this.onClickTab("followers")} class={this.props.tab === "followers" ? "nav-item nav-item-text nav-item-text-click": "nav-item nav-item-text"}>
        <p >Followers<p class="text-center">20000</p></p>
        </div>

        

        </div>
        </Col>
        <Col xsHidden md={4} >
            <div class="div-center follow">
          {/* <button type="submit" class="button button1">Edit Profile</button> */}
          <div onClick={() => this.onClickTab("editprofile")} 
        class={this.props.tab === "editprofile" ? "nav-item nav-item-text nav-item-text-click"
        : "nav-item nav-item-text"}>   
        <p >Edit Profile<p class="text-center"></p></p>
        </div>
          </div>

          
        </Col>
      </Row>    
    </Navbar>)
    }
}
export default (NavBar)