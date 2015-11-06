"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import NavBar from './NavBar.jsx'
import API from './API.js';
import ImageList from './ImageList.jsx';

class Dashboard extends React.Component{

  constructor () {
    super()
    this.state = {
      current_user: undefined
    }
  }

  componentWillMount() {
    var url = API.url('users/me')
    var _this = this
    var success = (res) => {
      console.log(res)
      var user = JSON.parse(res.text).user
      _this.setState({current_user: user})
    }
    var failure = (res) => {
      console.log(res)
    }
    API.get(url,success,failure)
  }

    render () {
    var user = this.state.current_user
    var display;
    if(!_.isEmpty(user))
      display = <ImageList user={user} />
    
    return (
      <div className="dashboard">
        <NavBar />
        <div className="flash-warning">
          <span> Your account type is Free. You cannot 
            upload a photograph without paying. </span>
        </div>
        <button className="pay-now">
          Pay Now
        </button>
       {display}
      </div>
    );
  }
}

module.exports = Dashboard;
