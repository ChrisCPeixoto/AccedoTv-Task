import React, { Component } from 'react';
import {HotKeys} from 'react-hotkeys';
import axios from 'axios';

import Aux from '../../../hoc/Aux'

import './LoginContainer.css';

class LoginContainer extends Component {

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)

  }

  handleKeyDown(e) {
    const { cursor, result } = this.state
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }

handleSubmit=(event)=>{
   /* An alternative would be to not use a form, and handle the onClick normally*/
    event.preventDefault();
    const user = {
      email:event.target.emailInput.value,
      password:event.target.passwordInput.value,
    }
    const headers = {'X-SimpleOvpApi':'USER_KEY_1'}
    axios.post('https://react-rent.herokuapp.com/api/login/',user, {headers: headers})
    .then(response =>{
      if (response.status=="200"){
        /*Could also be local storage*/
        sessionStorage.setItem('Token', response.headers['x-simpleovpapi']);
        this.props.history.push('/list');
      }
    })
    .catch((error) => {
                alert("Login Failed!!");
            });
}



  componentDidMount(){

  }

render() {
  const map = {
      'moveUp': 'up',
      'moveDown': 'down'
  };
    return (
      <Aux>
        <HotKeys keyMap={map}>
          <div className="container">
            <div className="row justify-content-md-center">
                <form onSubmit={this.handleSubmit} className="contactForm col-sm-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="emailInput">Email address</label>
                    <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email"></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="form-control" id="passwordInput" placeholder="Password"></input>
                  </div>
                  <div className="row button-form">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
              </form>
            </div>
          </div>
        </HotKeys>
      </Aux>
    );
  }

}
export default LoginContainer;
