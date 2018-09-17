import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../accedologo.png';
import './Layout.css';

import Aux from '../../../hoc/Aux'

const layout = (props) =>(
  <Aux>
    <header className="App-header">
      <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
    </header>
    <main className="main-content">
      {props.children}
    </main>
    <footer>
      <span>AccedoTV Homework Task</span>
    </footer>
  </Aux>
);
export default layout;
