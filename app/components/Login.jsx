import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import API from './API.js';

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoggedIn: false,
      isLoggingIn: false,
    }
  }

  componentWillMount() {
    console.log(localStorage)
    if(window.localStorage.token != "")
      this.setState({isLoggedIn: true})
  }

  componentDidMount() {
    var url = API.url('users');
    var inputs = document.getElementsByTagName('input');
    console.log(url);

    var success = (res) => {
      console.log(res);
      this.setState({
        isLoggedIn: true
      })
      inputs[2].disabled = false
    }

    var failure = (res) => {
      console.log(res);
      inputs[2].disabled = false
    }

    API.get(url, success, failure)  
  }
  
  handleSubmit(e) {

    var inputs = document.getElementsByTagName('input');
    inputs[2].disabled = true
    var username = inputs[0].value
    var password = inputs[1].value
    var user = {
      user: {
        username: username,
        password: password
      }
    }

    console.log(user);
    e.preventDefault();
    var url = API.url('tokens/verify');
    var _this = this
    var success = (res) => {
      console.log(res)
    }
    var failure = (res) => {
      console.log(res)
    }

    API.post(url, user, success, failure);
    /*API.post("http://localhost:3000/tokens/verify")
    .send({user:user})
    .end((err,res) => {
      console.log(res);
      let response = JSON.parse(res.text)
      const token  = response.token
      _this.setState({
        isLoggedIn: true
      })
      window.localStorage.token = token
      })
      */
  }

  logOut(e) {
    e.preventDefault();
    window.localStorage.token = ""
    console.log(localStorage)
    this.setState({
      isLoggedIn: false
    })
  }
  render () {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="enter username" ref="user" />
          <input type="password" placeholder="enter password" ref="pass" />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Login;
