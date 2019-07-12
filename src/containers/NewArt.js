import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewArt.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

import { uploadFile } from 'react-s3';

export default class NewArt extends Component {
  constructor(props) {
    super(props);

    this.file = 'test';

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return true
   // return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      const data = await uploadFile(this.file, config.s3public);
      const picture = data.location;

      await this.createArt({
        picture
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createArt(picture) {
    let myInit = {
      body: picture, // replace this with attributes you need
      headers: {"Content-Type": "application/json"}
    }
    console.log(myInit)
    return API.post("street-art", "/art", myInit)
  }

  render() {
    return (
      <div className="NewArt">
        <form onSubmit={this.handleSubmit}>
        {/*   <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup> */}
          <FormGroup controlId="file">
            <ControlLabel>Contribute Art</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            //disabled={!this.file}
            type="submit"
            isLoading={this.state.isLoading}
            text="Upload"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
