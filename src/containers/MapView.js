import React, {Component} from 'react';
import MapGL, {Marker, NavigationControl,GeolocateControl} from 'react-map-gl';
import config from "../config";
import Pin from '../components/Pin';


import { API, Auth } from "aws-amplify";

const TOKEN = config.mapbox.TOKEN;

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
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
      userLocation: {},
      events: {},
      artWorks: [],
    };
  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
       let setUserLocation = {
           lat: position.coords.latitude,
           long: position.coords.longitude
        };
       let newViewport = {
          height: "100vh",
          width: "100vw",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 13
        };
        this.setState({
          viewport: newViewport,
          userLocation: setUserLocation
       });
    });
  };

  async componentDidMount() {
    this.setUserLocation();
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

  _onMarkerClick = (artId) => {
    this.props.history.push('/art/'+artId);
  };


  render() {
    const {viewport, artWorks} = this.state;

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
        <GeolocateControl 
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />

      </MapGL>
      

    );
  }
}
