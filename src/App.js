import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PopularBooks from './PopularBooks';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Header from './components/Header';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
class App extends Component {
  
  
  callApi = () => {
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: "http://localhost:8001",
          url: '/auth'
        }
        axios(config)
          .then(result => console.log(result.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }else{
      console.log("user is not authenticated")
    }
  }
  render() {
  
    return (
      <div>
         <Header/>
        {/* <button onClick={() =>{this.first();this.second()}}></button> */}
        {/* <button onClick={this.callApi}></button> */}
        {this.props.auth0.isAuthenticated &&
        <div>
            <PopularBooks/>
        </div>
        }
     
      
      </div>
    )
  }
}

export default withAuth0(App)
