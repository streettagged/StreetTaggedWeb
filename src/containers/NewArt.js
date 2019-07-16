import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewArt.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";


export default class NewArt extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      latitude: '',
      longitude: '',
    };

    this.getMyLocation = this.getMyLocation.bind(this)
  }

  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  validateForm() {
    return this.state.latitude !== '';
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
    let coordinates = {latitude: this.state.latitude,
                       longitude: this.state.longitude};

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      console.log(config.s3)

      const picture = this.file
      ? await s3Upload(this.file)
      : null;

     console.log(picture)
      await this.createArt({
        picture,
        coordinates
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createArt(body) {
    let myInit = {
      body: body, // replace this with attributes you need
      headers: {"Content-Type": "application/json"}
    }
    console.log(myInit)
    return API.post("street-art", "/art", myInit)
  }

  render() {
    console.log(config.s3)
    return (
      <div className="NewArt">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="file">
              <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
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
