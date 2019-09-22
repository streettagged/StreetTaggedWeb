import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./StreetArt.css";

export default class StreetArt extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      artWork: null,
      name: "",
      picture: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await this.getArt();
      const artWork = response.artWork
      const { name, picture } = artWork;
      this.setState({
        artWork,
        name,
        picture
      });
    } catch (e) {
      alert(e);
    }
  }

  getArt() {
    return API.get("street-art", `/items/${this.props.match.params.id}`);
  }

/*   validateForm() {
    return this.state.name.length > 0;
  } */

  render() {
    return (

      <div className="StreetArt">
        {this.state.artWork &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name">
            <ControlLabel>{this.state.name}</ControlLabel>
            <img src ={this.state.picture} alt="Street Art" width="100%" />
            </FormGroup>
         
            <Link to="/login" className="btn btn-info btn-block">
          Back
        </Link>
          </form>}
      </div>
    );
  }
}
