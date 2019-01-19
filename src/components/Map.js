import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import {key} from '../config'
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    bounds: []
  };

  renderMarkers = () =>{
    return 
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onClose = () =>{
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }


  render() {
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.props.bounds.length; i++) {
      bounds.extend(this.props.bounds[i]);
    }
    console.log(bounds)
    return (
      <Map google={this.props.google}
        ref="map"
          onClick={this.onMapClicked}
          zoom={6}
          initialCenter = {this.props.initialCenter}
          bounds={bounds}
          >
        {this.props.markers.map((marker, index) => {
      
        return <Marker key={index} onClick={this.onMarkerClick}
          name={marker.name} position={marker.position}/>
       })}
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
            <div>
              <h6>{this.state.selectedPlace.name}</h6>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: key
})(MapContainer)
