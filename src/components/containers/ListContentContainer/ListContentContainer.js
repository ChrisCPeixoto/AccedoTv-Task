import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../../hoc/Aux'
import ContentCard from '../../items/ContentCard/ContentCard'
import './ListContentContainer.css';

class ListContentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listmovies:[],
      listseries:[]
    }

  }

  componentDidMount(){
    let token = sessionStorage.getItem('Token');
    if(!token || token === '') {//if there is no token, back to the login page
      this.props.history.push('/');
    }
    else{
          const headers = {'X-SimpleOvpApi':token}
          axios.get('https://react-rent.herokuapp.com/api/movie/', {headers: headers})
          .then(response =>{
            if (response.status=="200"){
                 this.setState({listmovies:response.data.items});
            }
          })
          .catch((error) => {
                      alert("Error loading movies");
                  });
          axios.get('https://react-rent.herokuapp.com/api/serie/', {headers: headers})
          .then(response =>{
                    if (response.status=="200"){
                         this.setState({listseries:response.data.items});
                    }
                  })
          .catch((error) => {
                              alert("Error loading series");
                          });
    }
  }

  render() {
    return (
      <Aux>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-auto col-sm-12">
              <span className="contactHeader">Movies</span>
              <hr/>
            </div>
          </div>
          <div className="row">
            {this.state.listmovies.map(c=>{
              return <ContentCard name={c.title} img={c.logoSrc} type={"Movie"} id={c.id} key={c.id}/>
            })}
          </div>
          <div className="row justify-content-md-center">
            <div className="col-md-auto col-sm-12">
              <span className="contactHeader">Series</span>
              <hr/>
            </div>
          </div>
          <div className="row">
            {this.state.listseries.map(c=>{
              return <ContentCard name={c.title} img={c.logoSrc} type={"Serie"} id={c.id} key={c.id}/>
            })}
          </div>
        </div>
      </Aux>
    );
  }

}
export default ListContentContainer;
