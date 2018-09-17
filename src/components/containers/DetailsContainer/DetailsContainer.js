import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'

import Aux from '../../../hoc/Aux'
import './DetailsContainer.css';

class DetailsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media:{},
      playing: true
    }

  }

  playPause = () => {
      this.setState({ playing: !this.state.playing })
    }

  componentDidMount(){
    let token = sessionStorage.getItem('Token');
    if(!token || token === '') {//if there is no token, back to the login page
      this.props.history.push('/');
    }
    else {
      let id=this.props.match.params.id;
      const headers = {'X-SimpleOvpApi':token}
      axios.get('https://react-rent.herokuapp.com/api/detail/'+id, {headers: headers})
      .then(response =>{
        if (response.status=="200"){
             this.setState({media:response.data.items[0]});
             const temp=this.state.media;
             temp.imageSrc='https://react-rent.herokuapp.com/'+this.state.media.imageSrc
             this.setState({media:temp})
        }
      })
      .catch((error) => {
                  alert("Error loading Media");
              });
    }
  }

  render() {
    return (
      <Aux>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-sm-12 col-md-auto ">
              <span className="contactHeader">{this.state.media.type=='movie' ? 'Movie' : 'Serie'}</span>
              <hr/>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-sm-12 col-md-8 ">
              <img className="img-details" src={this.state.media.imageSrc}alt="Card image cap"></img>
            </div>
          </div>
          <div className="row justify-content-md-center">
              <div className="contactForm col-sm-8 col-md-8">
                  <div className="row">
                    <span className="label-details" >Title:</span>
                    <span className="content-details">{this.state.media.title}</span>
                  </div>
                  <div className="row">
                    <span className="label-details" >Description:</span>
                    <span className="content-details description">{this.state.media.description}</span>
                  </div>
                  <div className="row">
                    <span className="label-details" >ImDB	rating:</span>
                    <span className="content-details">{this.state.media.rating}</span>
                  </div>
                  <div className="row">
                    <span className="label-details" >Genres:</span>
                    <span className="content-details">{this.state.media.genre}</span>
                  </div>
                  <div className="row">
                    <span className="label-details" >Length:</span>
                    <span className="content-details">{this.state.media.length}</span>
                  </div>
                  <div className="row">
                    <span className="label-details" >Release date:</span>
                    <span className="content-details">{this.state.media.releaseDate}</span>
                  </div>
                  <div className="row justify-content-md-center">
                    <ReactPlayer className="content-video" url={this.state.media.videoSrc} playing={this.state.playing}  />
                    <button className="btn btn-outline-primary btn-video" onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
                    <Link to="/list"><button className="btn btn-outline-primary btn-video">Back to List</button></Link>
                  </div>
              </div>
            </div>
        </div>
      </Aux>
    );
  }

}
export default DetailsContainer;
