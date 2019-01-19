import React, { Component } from 'react';

import './App.css';
import {Container, InputGroup, Input,  Col, Row,  Button} from 'reactstrap'
import Map from './components/Map'


class App extends Component {
  state = {
    placeIds: '',
    places: [
    ],
    initialCenter: {lat: '9.0765', lng: '7.3986'},
    bounds: [{
      lat: 5.593222,
      lng: -0.140138
    },

    {
      lat: 9.0765,
      lng: .3986
    },
  
  ]
  }

  setPlaceIds = (value) =>{

    this.setState({...this.state, placeIds: value})
  }
// ChIJb49qeKiQRhARqP-E6idWjrA;ChIJ8azPeWLTQBARoN9YV8AQqoQ;ChIJtcaxrqlZwokRfwmmibzPsTU
  getPlaces = () =>{
    if(this.state.placeIds === '') return
   
    let geocode = new window.google.maps.Geocoder();
    let {placeIds} = this.state
    
    if(placeIds.indexOf(';') -1){
      this.setState({...this.state, bounds: []});
    placeIds.split(';').forEach(async item => {
       await geocode.geocode({'placeId': item}, (results, status) =>{
          if(status === 'OK'){
           this.setState({...this.state, places: [...this.state.places, {name: results[0].formatted_address, position: results[0].geometry.location} ], bounds: this.state.bounds.concat(results[0].geometry.location)})
          }
        })

       
      })
    }else{
      geocode.geocode({'placeId': placeIds}, (results, status) =>{
        if(status === 'OK'){
          this.setState({...this.state, bounds: []})
         this.setState({...this.state, places: [...this.state.places, {name: results[0].formatted_address, position: results[0].geometry.location} ], bounds: this.state.bounds.concat(results[0].geometry.location)})
        }
      })

     
    }
     
    
  }
  render() {
    return (
     <Container>
     
            <Row className="form">
              <Col xs={12} sm={12} md={12} lg={8}>
              <InputGroup>
                  <Input placeholder="Enter place IDs seperated by ;" onChange={(event)=>this.setPlaceIds(event.target.value) } value={this.state.placeIds}/>
              </InputGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={2}>
              <Button className="col-md-12" color="primary" onClick={() => this.getPlaces()}>Get Places</Button>{' '}
              </Col>
            </Row>
          <Row className="map">
          <Map markers={this.state.places} bounds={this.state.bounds} initialCenter={this.state.initialCenter}/>
        </Row>
       

     </Container>
    );
  }
}

export default App;
