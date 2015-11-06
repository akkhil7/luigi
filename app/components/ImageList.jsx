"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import API from './API.js';
import ImageEntry from './ImageEntry.jsx';

class ImageList extends React.Component{

  constructor () {
    super()
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    var user = this.props.user
    console.log(user)
    var url = API.url('imageposts/current?id='+user.id)
    var _this = this
    var success = (res) => {
      console.log(res)
      var response = JSON.parse(res.text).imageposts
      _this.setState({images: response})
    }

    var failure = (res) => {
      console.log(res)
    }
    
    Request.get(url)
    .set('Authorization', 'Token token=' + localStorage.token)
    .end((err,res) => {
      if(res.status == 200) 
        success(res)
      else
        failure(res)
    })
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
    console.log(file)
    var success = (res) => {
      alert("file uploaded")
      console.log(res)
      var response = JSON.parse(res.text)
      console.log(response)
      this.addUploaded()
    }
    var failure = (res) => {
      alert('file not uploaded')
      console.log(res)
    }

    Request.post(url)
    .set('Authorization', 'Token token=' + localStorage.token)
    .field('imagepost[user_id]', this.state.current_user.id)
    .attach('imagepost[image]', file, file.name)
    .end((err,res) => {
      if(res.status == 200)
        success(res)
      else
        failure(res)
    })

  }

  addUploaded() {

  }

  render () {
    var images = this.state.images
    console.log(images)
    
    if(!_.isEmpty(images))
      var ImageEntries = images.map((entry) => {
                     return <ImageEntry entry={entry} />
      })
    
    var display = _.isEmpty(images) ? "No images" : ImageEntries
    return (
      <div className="image-list">
      <button onClick={this.fileClicker.bind(this)} className="upload">
      Upload Photo
      </button>
      <input onChange={this.handleFileChange.bind(this)} type="file" ref="file" className="file-button">
      </input>

      {display}
      </div>
    );
  }
}

module.exports = ImageList;
