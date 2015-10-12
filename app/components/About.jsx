"use strict";

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import _ from 'lodash';

class About extends React.Component{

  constructor () {
    super()
  }

  render () {
    return (
      <h3> About page </h3>
    );
  }
}

module.exports = About;
