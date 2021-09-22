import React, { Component } from 'react'
import {Navbar,Container,Image} from 'react-bootstrap'
import LoginButton from './LoginButton' 
import LogoutButton from './LogoutButton'
import { withAuth0 } from '@auth0/auth0-react';
export class Header extends Component {
    render() {
        return (
            <div>
                <Navbar variant="info"  bg="dark" variant="dark" >
  <Container>
    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        
        {this.props.auth0.isAuthenticated ?
        <div>
            <Image src = {this.props.auth0.user.picture} roundedCircle style={{"height": "43px"}}/>
            Signed in as: <a href="#login">{this.props.auth0.user.name}</a>
        <LogoutButton/>
        
        </div>: <LoginButton/>}

      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
            </div>
        )
    }
}

export default withAuth0(Header)
