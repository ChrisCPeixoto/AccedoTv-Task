import React from 'react';
import {Link} from 'react-router-dom';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './Layout.css';
import logo from '../../../accedologo.png';

import Aux from '../../../hoc/Aux';


const layout = (props) =>(
  <Aux>
        <header className="App-header">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        </header>
        <main className="main-content">
          {props.children}
        </main>
        <Alert stack={{limit: 3}} />
        <footer>
          <span>AccedoTV Homework Task</span>
        </footer>
  </Aux>
);
export default layout;
