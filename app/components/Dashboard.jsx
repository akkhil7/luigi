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
    var url = API.url('tokens/verify_token')
    var _this = this
    var token = {token: localStorage.token} 
    var success = (res) => {
      console.log(res)
      var user = JSON.parse(res.text).user
      _this.setState({current_user: user})
    }
    var failure = (res) => {
      console.log(res)
      this.context.router.transitionTo('login');
    }
    API.post(url,token,success,failure)
  }



  render () {
    var user = this.state.current_user
    var display,menu;
    if(!_.isEmpty(user))
      { display = <ImageList user={user} />
        menu = <NavBar user={user} />
      }
    return (
      <div className="dashboard">
        {menu}
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

Dashboard.contextTypes = {
  router: React.PropTypes.func.isRequired
}
module.exports = Dashboard;
