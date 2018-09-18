import React, { Component }  from 'react';
import PropTypes from "prop-types";
import Aux from '../../../hoc/Aux';
import './ContentCard.css';
import {Link} from 'react-router-dom';

class ContentCard extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props,context) {
    super(props,context)
    this.state = {
      id:props.id,
      name:props.name,
      type:props.type,
      img:props.img,
      handleFocus:props.handleFocus
    }
    this.handleUp = this.handleUp.bind(this);
  }

  //This one is done with Switch to show the alternative
  handleUp = (e) =>  {
      switch(e.key) {
          case "ArrowDown":
              if(this.state.id<=30){this.state.handleFocus(this.state.id+3);}
          break;
          case "ArrowUp":
              if(this.state.id>=4){this.state.handleFocus(this.state.id-3)};
          break;
          case "ArrowRight":
              if(this.state.id<=32){this.state.handleFocus(this.state.id+1)};
          break;
          case "ArrowLeft":
              if(this.state.id>=2){this.state.handleFocus(this.state.id-1)};
          break;
          case "Enter":
              this.context.router.history.push('/details/'+this.state.id);
          break;
      }
  }

  render() {
    return (
      <Aux>
          <div className="col-md-4 col-sm-12" >
            <div className="card" onKeyDown={this.handleUp}>
              <Link to={'/details/'+this.state.id} className="card-focus">  <span tabIndex="0" className="card-click"></span></Link>
              <img className="card-img-top" src={'https://react-rent.herokuapp.com/'+this.state.img} alt={this.state.name}></img>
              <div className="card-body">
                <h5 className="card-title">{this.state.name}</h5>
                <h5 className="card-title">{this.state.type}</h5>
              </div>
            </div>
          </div>
      </Aux>
    );
  }
};
export default ContentCard;
