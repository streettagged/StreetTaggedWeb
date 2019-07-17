import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem, ControlLabel } from "react-bootstrap";
import "./Home.css";

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
   const data = await API.get("street-art", "/art");
   return data.artWorks;
  }

  handleStreetArtClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }
//header={streetart.name.trim().split("\n")[0]}
renderStreetArtList(streetart) {
  return ([{}].concat(streetart).map(
    (streetart, i) =>
      i !== 0
        ? 
          <ListGroupItem
            key={streetart.artId}
            href={`/art/${streetart.artId}`}
            onClick={this.handleStreetArtClick}
          > <div className="art-header">
            {streetart.username}
            </div>
            <img src ={streetart.picture} alt="street art"  width="100%" />
          </ListGroupItem>
        : <ListGroupItem
            key="new"
            href="/art/new"
            onClick={this.handleStreetArtClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Upload New Artwork
            </h4>
          </ListGroupItem>
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


renderArt() {
  return (
    <div className="streetart">
      <PageHeader>Latest Street Art</PageHeader>
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
