import React, {Component} from 'react';
import {
  Text,
  YellowBox,
  StyleSheet,
  Dimensions,
  View,
  Alert,
} from 'react-native';
import {Header, Container, Content, Button, Right} from 'native-base';
import styles from '../../styles/captain/PassengerRequest';
import MapViewDirections from 'react-native-maps-directions';
import socketIO from 'socket.io-client';
import socketUrl from '../../SocketUrl';
import MapView, {Marker} from 'react-native-maps';
import ApiKey from '../../googleApiKey';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class PassengerRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.navigation.state.params.userId,
      userId: this.props.navigation.state.params.carId,
      captainLocation: this.props.navigation.state.params.captainLocation,
      rideDetails: this.props.navigation.state.params.rideDetails,
    };
    this.distance = 0;
    this.duration = 0;
    this.mapView = null;
  }

  deny() {}

  accept() {
    var socket = socketIO.connect(socketUrl);
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    socket.on('connect', () => {
      console.log('accpet page connected');
      socket.emit('accept', {
        captainId: this.state.userId,
        captainLocation: this.state.captainLocation,
      });
      this.props.navigation.navigate('rideConnected', {
        captainLoc: {
          latitude: this.state.captainLocation.lat,
          longitude: this.state.captainLocation.lng,
        },
        passengerLoc: {
          latitude: this.state.rideDetails.pickUp.lat,
          longitude: this.state.rideDetails.pickUp.lng,
        },
        passengerDropOff: {
          latitude: this.state.rideDetails.dropOff.lat,
          longitude: this.state.rideDetails.dropOff.lng,
        },
        passengerId: this.state.rideDetails.passengerId,
        fare: this.state.rideDetails.fare,
        userId: this.state.userId,
        person: this.state.person,
      });
    });
  }
  render() {
    return (
      <View>
        <Header>
          <Right>
            <Text
              style={styles.headerRight}
              onPress={() => this.props.navigation.navigate('captainHome')}>
              Home{' '}
            </Text>
          </Right>
        </Header>
        <MapView
          ref={(c) => (this.mapView = c)}
          style={styles.map}
          initialRegion={{
            latitude: 24.697274,
            longitude: 70.178344,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.captainLocation.lat,
              longitude: this.state.captainLocation.lng,
            }}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.state.rideDetails.pickUp.lat,
              longitude: this.state.rideDetails.pickUp.lng,
            }}
          />
          <MapViewDirections
            origin={{
              latitude: this.state.captainLocation.lat,
              longitude: this.state.captainLocation.lng,
            }}
            destination={{
              latitude: this.state.rideDetails.pickUp.lat,
              longitude: this.state.rideDetails.pickUp.lng,
            }}
            apikey={ApiKey}
            strokeWidth={4}
            strokeColor="hotpink"
            mode="DRIVING"
            onReady={(result) => {
              console.log(result.distance);
              (this.distance = result.distance),
                (this.duration = result.duration);
              Alert.alert('Distance to pick up point', result.distance + ' km');
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
          />
        </MapView>
        <Button rounded style={{marginBottom: 5}} onPress={() => this.accept()}>
          <Text style={{color: 'white', fontSize: 20, paddingLeft: '45%'}}>
            Accept
          </Text>
        </Button>
        <Button rounded onPress={() => this.deny()}>
          <Text style={{color: 'white', fontSize: 20, paddingLeft: '45%'}}>
            Deny
          </Text>
        </Button>
      </View>
    );
  }
}
