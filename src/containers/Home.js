import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem, ControlLabel } from "react-bootstrap";
import "./Home.css";

import UnFavoriteIcon from '../components/UnFavorite';
import FavoriteIcon from '../components/Favorite';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faComments, faShareAlt, faCamera, faPalette, faShoePrints, faMapMarked, faCameraRetro } from '@fortawesome/pro-regular-svg-icons';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      streetart: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const streetart = await this.streetart();
      this.setState({ streetart });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  async streetart() {
   const { accessToken: { jwtToken } } = Auth.user.signInUserSession;

   let body = {
       body: {
         "token":jwtToken
       },
       headers: {"Content-Type": "application/json"}
   }

   const data = await API.post("street-art", "/search/art", body);
   return data.artWorks;
  }

  handleStreetArtClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

onClickFavorite = async (i, e) => {
  const { accessToken: { jwtToken } } = Auth.user.signInUserSession;
  const { streetart } = this.state;
  const list = streetart;

  const item = list[i - 1];

  if (item.isFavorited) {
    let body = {
        body: {
          "token":jwtToken,
          "artId": item.artId
        },
        headers: {"Content-Type": "application/json"}
    }
    await API.del("street-art", "/favorite", body);
  } else {
    let body = {
        body: {
          "token":jwtToken,
          "artId": item.artId
        },
        headers: {"Content-Type": "application/json"}
    }
    await API.post("street-art", "/favorite", body);
  }

  list[i - 1].isFavorited = !list[i - 1].isFavorited;
  this.setState({ streetart: list });
}

onOpenArt = async (id) => {
  this.props.history.push('/art/'+id);
}

renderStreetArtList(streetart) {
  return ([{}].concat(streetart).map(
    (streetart, i) =>
      i !== 0
        ?
         <div key={streetart.artId + ':' + i} style={{
            marginBottom: '10px',
            borderRadius: 0,
            boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
         }}>
          <img onClick={this.onOpenArt.bind(this, streetart.artId)} src={streetart.picture} alt="street art"  width="100%" />
          
          <div style={{
            paddingTop: '14px',
            paddingLeft: '10px',
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <a onClick={this.onClickFavorite.bind(this, i)}>{streetart.isFavorited ? (<FavoriteIcon/>) : (<UnFavoriteIcon/>)}</a>
            <a style={{
              marginLeft: '10px'
            }} onClick={this.onClickFavorite.bind(this, i)}><FontAwesomeIcon size="2x" icon={faComments} /></a>
            <a style={{
              marginLeft: '10px'
            }} onClick={this.onClickFavorite.bind(this, i)}><FontAwesomeIcon size="2x" icon={faShareAlt} /></a>
          </div>
          <div className="user-meta">
            <div>
             <a onClick={this.onOpenArt.bind(this, streetart.artId)}><FontAwesomeIcon  icon={faCamera} /> {streetart.username}</a>
             </div>
          </div>

          <div className="art-meta">

          <div><a onClick={this.onOpenArt.bind(this, streetart.artId)}><FontAwesomeIcon  icon={faPalette} /> Artist Name</a></div>  
          <div><a onClick={this.onOpenArt.bind(this, streetart.artId)}><FontAwesomeIcon  icon={faMapMarked} /> 600 ft</a></div>  
          <div><a onClick={this.onOpenArt.bind(this, streetart.artId)}><FontAwesomeIcon  icon={faShoePrints} /> 1 minute</a></div>  
          </div>
          </div>
      
        : 
          <div key="0" style={{
            marginBottom: '20px'
          }}>
          <ListGroupItem
            key="new"
            href="/art/new"
            onClick={this.handleStreetArtClick}
          >
            <h4>
              <FontAwesomeIcon size="2x" icon={faCameraRetro} />
            </h4>
          </ListGroupItem>
          </div>
  )
  );
}

renderLander() {
  return (
    <div className="lander">
      <h1>StreetTagged.com</h1>
      <p>A simple street art sharing app.</p>
      <div>
        <Link to="/login" className="btn btn-info btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-success btn-lg">
          Signup
        </Link>
      </div>
    </div>
  );
}

/*
<ListGroup>
  {!this.state.isLoading && this.renderStreetArtList(this.state.streetart)}
</ListGroup>
*/

renderArt() {
  return (
    <div className="streetart"> 
      <ListGroup>
        {!this.state.isLoading && this.renderStreetArtList(this.state.streetart)}
      </ListGroup>
    </div>
  );
}

render() {
  return (
    <div className="Home">
      {this.props.isAuthenticated ? this.renderArt() : this.renderLander()}
    </div>
  );
}
}
