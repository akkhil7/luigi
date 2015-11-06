"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';

class ImageEntry extends React.Component{

  constructor () {
    super()
  }

  componentDidMount() {
    console.log(this.props.entry.id)
  }

  render () {
    var entry = this.props.entry
    return (
      <div className="image-item">
        <img src={entry.image} />
      </div>
    );
  }
}

module.exports = ImageEntry;
