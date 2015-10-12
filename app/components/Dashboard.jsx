"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import NavBar from './NavBar.jsx'

class Dashboard extends React.Component{

  constructor () {
    super()
  }

  render () {
    return (
      <div className="dashboard">
        <NavBar />
        <h3> Dashboard page </h3>
      </div>
    );
  }
}

module.exports = Dashboard;
