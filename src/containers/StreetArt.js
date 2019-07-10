import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./StreetArt.css";

export default class StreetArt extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      art: null,
      name: "",
      picture: null,
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const art = await this.getArt();
      const { name, picture } = art;

      if (picture) {
        attachmentURL = await Storage.vault.get(picture);
      }

      this.setState({
        art,
        name,
        picture
      });
    } catch (e) {
      alert(e);
    }
  }

  getArt() {
    return config.DUMMY_DATA[0]   // return API.get("street-art", `/art/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  render() {
    return (
      <div className="StreetArt">
        {this.state.art &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name">
            <ControlLabel>{this.state.name}</ControlLabel>
            </FormGroup>
            <img src ={this.state.picture} alt="Logo" />
            {this.state.art.attachment &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    {this.formatFilename(this.state.art.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId="file">
              {!this.state.art.attachment &&
                <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
