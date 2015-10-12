'use strict';

import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import crypto from 'crypto';

class Gravatar extends React.Component {

  render() {
    var email = this.props.email;
    var size = this.props.size
    if (email !== null)
     {
   var hash = crypto.createHash("md5").update(email).digest("hex");
   var src  = "http://www.gravatar.com/avatar/" + hash +"?s="+size +"&d=retro";
    }
  return(
    <img className="gravatar" src={src} />
    );
  }
};

module.exports = Gravatar;
