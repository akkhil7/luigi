"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import NavBar from './NavBar.jsx'
import API from './API.js';

class Dashboard extends React.Component{

  constructor () {
    super()
    this.state = {
      current_user: undefined
    }
  }

  componentDidMount() {
    var url = API.url('users/me')
    console.log(localStorage)
    var success = (res) => {
      console.log(res)
      var user = JSON.parse(res.text)
      this.setState({current_user: user})
    }
    var failure = (res) => {
      console.log(res)
    }
    API.get(url,success,failure)
  }

  fileClicker(e) {
    e.preventDefault();
    var elem = document.getElementsByClassName('file-button')[0]
    elem.click()
  }
  
  handleFileChange(e) {
    e.preventDefault()
    var file  = document.getElementsByClassName('file-button')[0].files[0]
    this.uploadFile(file);
    console.log("Gonna start uploading")
  }

  uploadFile(file) {
    var url = API.url('imageposts')
    var file = {
      imagepost: {
        image: file,
        user_id: this.state.current_user.id
      }
    }
    var success = (res) => {
      alert("file uploaded")
      console.log(res)
    }
    var failure = (res) => {
      alert('file not uploaded')
      console.log(res)
    }

    API.post(url,file,success,failure)

  }
  render () {
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
        <button onClick={this.fileClicker.bind(this)} className="upload">
          Upload Photo
        </button>
        <input onChange={this.handleFileChange.bind(this)} type="file" ref="file" className="file-button">
        </input>

      </div>
    );
  }
}

module.exports = Dashboard;
