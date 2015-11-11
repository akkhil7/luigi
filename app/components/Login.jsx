import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import API from './API.js';

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoggingIn: false
    }
  }

  componentWillMount() {
    console.log(localStorage)
    if(window.localStorage.token != "")
      this.setState({isLoggedIn: true})
  }

  handleSubmit(e) {
    e.preventDefault();
    var url = API.url('tokens/verify');
    var inputs = document.getElementsByTagName('input');
    var username = inputs[0].value
    var password = inputs[1].value
    this.setState({
      isLoggingIn: true
    })
    
    var user = {
      user: {
        username: username,
        password: password
      }
    }
    
    var success = (res) => {
      console.log(res);
      this.context.router.transitionTo('dashboard');
      inputs[2].disabled = false
      var response = JSON.parse(res.text)
      localStorage.token = response.token
    }

    var failure = (res) => {
      console.log(res);
      inputs[2].disabled = false
    }

    API.post(url, user, success, failure)  
          
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
      <div>
        <div className="background-blur"> </div>
        <div className="form-container">
          <h2 className='form-text'> Login </h2>
          <hr />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Login;
