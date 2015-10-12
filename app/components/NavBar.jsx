"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import Gravatar from './Gravatar.jsx';

class NavBar extends React.Component{

  constructor () {
    super()
  }

  render () {
    var email = "akhilr94@gmail.com"
    return (
      <div className="nav-bar">
        <ul>
          <li> Dashboard </li>
          <li> About </li>
          <li> Prizes </li>
          <li> Rules </li>
          <li> Contact </li>
          <li className="avatar"> 
            <span>Welcome</span>
            <Gravatar email={email} size={30}/>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = NavBar;
