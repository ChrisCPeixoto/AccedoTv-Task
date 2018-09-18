import React  from 'react';
import Aux from '../../../hoc/Aux';
import './ContentCard.css';
import {Link} from 'react-router-dom';

const ContentCard = (props) => {
    return (
      <Aux>
          <div className="col-md-4 col-sm-12">
            <div className="card" >
              <Link to={'/details/'+props.id}>  <span className="card-click"></span></Link>
              <img className="card-img-top" src={'https://react-rent.herokuapp.com/'+props.img} alt={props.name}></img>
              <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <h5 className="card-title">{props.type}</h5>
              </div>
            </div>
          </div>
      </Aux>
    );
};
export default ContentCard;
