import React, {Component} from 'react';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import config from "../config";
import Pin from '../components/Pin';
import ControlPanel from '../components/ControlPanel';

import { API, Auth } from "aws-amplify";

const TOKEN = config.mapbox.TOKEN;

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};


export default class MapView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
      marker: {
        latitude: 37.785164,
        longitude: -100
      },
      events: {},
      artWorks: [],
    };
  }

  async componentDidMount() {
    try {
      const artWorks = await this.streetart();
      this.setState({ artWorks });
    } catch (e) {
      alert(e);
    }
  }

  streetart = async () => {
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

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragStart = event => {
    this._logDragEvent('onDragStart', event);
  };

  _onMarkerDrag = event => {
    this._logDragEvent('onDrag', event);
  };

  _onMarkerDragEnd = event => {
    this._logDragEvent('onDragEnd', event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
  };

  _onMarkerClick = (artId) => {
    this.props.history.push('/art/'+artId);
  };


  render() {
    const {viewport, marker, artWorks} = this.state;

    let markers = [];

    for (let art of artWorks) {
      const { location: { coordinates }, artId } = art;
      const longitude = coordinates[0];
      const latitude = coordinates[1];

      markers.push(
        <Marker key={artId}
          longitude={longitude}
          latitude={latitude}

        >
          <div onClick={() => {
            this._onMarkerClick(artId);
          }}>
            <Pin size={20}/>
          </div>  
        </Marker>
      );
    }

    return (
      <MapGL
        {...viewport}
        width="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => this.setState({viewport})}>

        {markers}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

      </MapGL>
      

    );
  }
}
