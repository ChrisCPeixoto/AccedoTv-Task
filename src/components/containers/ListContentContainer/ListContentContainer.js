import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import Aux from '../../../hoc/Aux';
import ContentCard from '../../items/ContentCard/ContentCard';
import './ListContentContainer.css';

class ListContentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listmovies:[],
      listmedia:[]
    }
    this.startFocus = this.startFocus.bind(this);
    this.ref = React.createRef();
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
            axios.get('https://react-rent.herokuapp.com/api/serie/', {headers: headers})
            .then(response =>{
                      if (response.status=="200"){
                           const newmovies=[...this.state.listmovies,...response.data.items]
                           newmovies.sort(function(a,b) {return (a.id> b.id) ? 1 : ((b.id> a.id) ? -1 : 0);} );
                           this.setState({listmedia:newmovies});
                           this.startFocus();
                      }
                    })
          })
          .catch((error) => {
                      Alert.error('Eror loading movies', {
                        position: 'top',
                        effect: 'slide',
                        timeout: 'none'
                      });
                  });
    }
  }
  startFocus= () =>  {
        this.ref.current.children[0].children[0].children[0].children[0].focus();
        console.log(document.activeElement.id);
    }

  handleFocus= (id) =>  {
        this.ref.current.children[id-1].children[0].children[0].children[0].focus();
    }

  render() {
    return (
      <Aux>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-auto col-sm-12">
              <span className="contactHeader">Movies & Series</span>
              <hr/>
            </div>
          </div>
          <div className="row" ref={this.ref}>
            {this.state.listmedia.map(c=>{
              return <ContentCard name={c.title} img={c.logoSrc} type={c.type} id={c.id} key={c.id} handleFocus={this.handleFocus} />
            })}
          </div>
        </div>
      </Aux>
    );
  }

}
export default ListContentContainer;
