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
      images: [],
      isUploading: false
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
    this.setState({isUploading: true})
  }

  uploadFile(file) {
    
    var url = API.url('imageposts')
    console.log(file)
    var success = (res) => {
      console.log("file uploaded")
      this.setState({isUploading: false})
      var response = JSON.parse(res.text)
      console.log(response)
      this.addUploaded(response)
    }
    var failure = (res) => {
      alert('file not uploaded')
      console.log(res)
      this.setState({isUploading: false})
    }

    Request.post(url)
    .set('Authorization', 'Token token=' + localStorage.token)
    .field('imagepost[user_id]', this.props.user.id)
    .attach('imagepost[image]', file, file.name)
    .end((err,res) => {
      if(res.status == 200)
        success(res)
      else
        failure(res)
    })

  }

  addUploaded(entry) {
    var images = this.state.images
    images.push(entry)
    this.setState(images)
  }

  render () {
    var images = this.state.images
    console.log(images)
    
    if(!_.isEmpty(images))
      var ImageEntries = images.map((entry) => {
                     return <ImageEntry entry={entry} />
      })
    
      var display = _.isEmpty(images) ? "No images" : ImageEntries

      if(this.state.isUploading)
        var isUploadingContent = <img className="loading-icon" />
      else
        var isUploadingContent =  (<button onClick={this.fileClicker.bind(this)} className="upload">
          Upload Photo
        </button>)

    return (
      <div className="image-list">
        {isUploadingContent}

        <input onChange={this.handleFileChange.bind(this)} type="file" ref="file" className="file-button">
        </input>

        {display}
      </div>
    );
  }
}

module.exports = ImageList;
