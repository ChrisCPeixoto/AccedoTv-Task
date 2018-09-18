import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import Aux from '../../../hoc/Aux';

import './LoginContainer.css';

class LoginContainer extends Component {

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e, field) {
    const form = e.target.form;
    const index = Array.prototype.indexOf.call(form, e.target);
    //could also be a switch
    if (e.keyCode === 40 && index<2) {
      form.elements[index + 1].focus();
      e.preventDefault();
    }
    else if(e.keyCode === 38 && index>0){
     form.elements[index - 1].focus();
     e.preventDefault();
    }
   //can be blocked to just the button
   else if(e.keyCode === 13){
      this.handleSubmit(null,form.elements[0].value,form.elements[1].value);
    }
  }

handleSubmit=(event,mail,pswd)=>{
   /* An alternative would be to not use a form, and handle the onClick normally*/
   let user;
   if(event){
        event.preventDefault();
         user = {
          email:event.target.emailInput.value,
          password:event.target.passwordInput.value,
        }
    }else{
      user = {
       email:mail,
       password:pswd,
     }
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
              Alert.error('Wrong Login', {
                position: 'top',
                effect: 'slide',
                timeout: 'none'
              });
      });
}



render() {
    return (
      <Aux>
          <div className="container" onKeyDown={this.handleKeyDown}>
            <div className="row justify-content-md-center">
                <form onSubmit={this.handleSubmit.bind(this)}  id="loginForm" className="contactForm col-sm-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="emailInput">Email address</label>
                    <input type="text" className="form-control" autoComplete="off" autoFocus id="emailInput" aria-describedby="emailHelp" placeholder="Enter email"></input>
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
      </Aux>
    );
  }

}
export default LoginContainer;
