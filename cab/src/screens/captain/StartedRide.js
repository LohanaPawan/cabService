import React, {Component} from 'react';
import {
  View,
  Text,
  Linking,
  Dimensions,
  YellowBox,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';
import axios from 'axios';
import baseURL from '../../baseUrl';
import socketIO from 'socket.io-client';
import socketUrl from '../../SocketUrl';
axios.defaults.baseURL = baseURL;
import styles from '../../styles/captain/StartedRide';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import ApiKey from '../../googleApiKey';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Modal from 'react-native-modal';
export default class StartedRide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.navigation.state.params.person,
      passName: this.props.navigation.state.params.passName,
      passMobile: this.props.navigation.state.params.passMobile,
      isModal: false,
      fare: this.props.navigation.state.params.fare,
      userId: this.props.navigation.state.params.userId,
      passPickUp: this.props.navigation.state.params.passPickUp,
      passDropOff: this.props.navigation.state.params.passDropOff,
      endSession: false,
    };
    this.mapView = null;
  }
  endRide() {
    var socket = socketIO.connect(socketUrl);
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    socket.on('connect', () => {
      socket.emit('endRide', {fare: this.state.fare});
    });
    this.setState({
      isModal: true,
    });
  }
  render() {
    return (
      <View>
        <Header>
          <Left />
          <Body>
            <Text style={styles.headerBody}> Ride in progress</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('captainHome', {
                  userId: this.state.person,
                  carId: this.state.userId,
                })
              }>
              <Text style={styles.headerButton}>Home </Text>
            </Button>
          </Right>
        </Header>
        {this.state.endSession ? (
          <Rating />
        ) : (
          <View>
            <MapView
              initialRegion={{
                latitude: this.state.passPickUp.latitude,
                longitude: this.state.passPickUp.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              ref={(c) => (this.mapView = c)}
              style={styles.map}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.passPickUp.latitude,
                  longitude: this.state.passPickUp.longitude,
                }}
              />
              <MapView.Marker
                coordinate={{
                  latitude: this.state.passDropOff.latitude,
                  longitude: this.state.passDropOff.longitude,
                }}
              />
              <MapViewDirections
                origin={{
                  latitude: this.state.passPickUp.latitude,
                  longitude: this.state.passPickUp.longitude,
                }}
                destination={{
                  latitude: this.state.passDropOff.latitude,
                  longitude: this.state.passDropOff.longitude,
                }}
                apikey={ApiKey}
                strokeWidth={4}
                strokeColor="hotpink"
                mode="DRIVING"
                onReady={(result) => {
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 10,
                      bottom: height / 10,
                      left: width / 10,
                      top: height / 10,
                    },
                  });
                }}
              />
            </MapView>
            <Card>
              <CardItem>
                <Left>
                  <Text style={styles.cardText}> {this.state.passName}</Text>
                </Left>
                <Body>
                  <Text style={styles.cardText}> {this.state.passMobile}</Text>
                </Body>
                <Right>
                  <Icon name="call" style={{color: 'blue'}} />
                </Right>
              </CardItem>
            </Card>
            <Button
              rounded
              onPress={() => {
                this.endRide();
              }}>
              <Text style={styles.endRideButtonText}>End Ride</Text>
            </Button>
          </View>
        )}
        {this.state.isModal ? (
          <Modal isVisible={this.state.isModal}>
            <View style={{marginTop: 100}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 40,
                  marginLeft: '20%',
                  marginBottom: 40,
                }}>
                Collect fare
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                  marginBottom: 40,
                  fontWeight: 'bold',
                  marginLeft: '40%',
                }}>
                {this.state.fare}
              </Text>
              <Button
                rounded
                onPress={() => {
                  this.closeSession();
                }}>
                <Text style={styles.collectedButton}>Collected</Text>
              </Button>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
  closeSession() {
    this.setState({
      isModal: false,
    });
    this.props.navigation.navigate('rating');
  }
}
