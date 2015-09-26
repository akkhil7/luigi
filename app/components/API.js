import _ from 'lodash';
import request from 'superagent';

module.exports = {
  
  mode: "development",

  __root: function () {
    return this.mode==="development" ? "http://localhost:3000/" : ""
  },

  url: function(path, id) {
    
    var id = id || null
    var baseUrl = this.__root() + path
    var url = (id === null) ?  baseUrl : baseUrl + "/" + id
   
    return url;
  },

  get: function(url) {

    var response = undefined
    request.get(url, function(err,res) {
      return res;
    })
  },

  post: function(url, data) {
    
    var response = undefined
    request.post(url, data, function(res) {
      response = JSON.parse(res.text)
    })
    return response
  }

}
