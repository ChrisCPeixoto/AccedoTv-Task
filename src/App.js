import React, { Component } from 'react';
import {Route,BrowserRouter} from 'react-router-dom';


import './App.css';

import Layout from './components/containers/Layout/Layout';
import LoginContainer from './components/containers/LoginContainer/LoginContainer';
import ListContentContainer from './components/containers/ListContentContainer/ListContentContainer';
import DetailsContainer from './components/containers/DetailsContainer/DetailsContainer'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-md-11 col-sm-12">
                  <Layout>
                      <Route path="/" exact component={LoginContainer}/>
                      <Route path="/list" exact component={ListContentContainer}/>
                      <Route path="/details/:id" exact component={DetailsContainer}/>
                  </Layout>
                </div>
              </div>
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
