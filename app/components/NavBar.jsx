"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import Gravatar from './Gravatar.jsx';
import {Link} from 'react-router';
import { Motion, spring } from 'react-motion';

class NavBar extends React.Component{

  constructor () {
    super()
    this.state = {
      showMenu: false
    }
  }

  handleDropDown(e){
    e.preventDefault();
    var showMenu = this.state.showMenu
    
    this.setState({
      showMenu: !showMenu
    })

  }

  logOut(e){

    console.log("Logged out");
    localStorage.token = ""
    this.context.router.transitionTo('login')
    
  }
  render () {
    var user = this.props.user
    var email = user.email
    var menu = (
      <div className="user-menu">
        <ul>
          <li className="menu-item"><Link to='register'>Settings</Link></li>
          <li className="menu-item"><Link to='login' onClick={this.logOut.bind(this)}>Logout</Link></li>
        </ul>
      </div>
    )

    var displayMenu = this.state.showMenu ? menu : "" 
    return (
      <div className="nav-bar">
        <ul>
          <li> Dashboard </li>
          <li> About </li>
          <li> Prizes </li>
          <li> Rules </li>
          <li> Contact </li>
          <li className="avatar">
            <a href="#" onClick={this.handleDropDown.bind(this)}>
              <span>Welcome,&nbsp;</span><span>{user.first_name}</span>
              <Gravatar email={email} size={30}/>
            </a>
            <Motion style={{x: this.state.showMenu ? spring(30,[100,6]) : spring(-100,[100,6]),
                            y: this.state.showMenu ? spring(1) : spring(0)}}>
              {(interpolated) =>
                <div style={{transform: 'translateY('+interpolated.x+'px)',
                              opacity: interpolated.y}}>
                  {menu}
                </div>      
              }
            </Motion>
          </li>
        </ul>
      </div>
    );
  }
}

NavBar.contextTypes = {
  router: React.PropTypes.func.isRequired
}
module.exports = NavBar;
