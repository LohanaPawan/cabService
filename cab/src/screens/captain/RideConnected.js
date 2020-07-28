import React, {Component} from 'react';
import {View, Text, YellowBox, StyleSheet, Dimensions} from 'react-native';
import {
  Header,
  Body,
  Right,
  Container,
  Content,
  Button,
  Card,
  CardItem,
} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import ApiKey from '../../googleApiKey';
import MapViewDirections from 'react-native-maps-directions';
import socketIO from 'socket.io-client';
import socketUrl from '../../SocketUrl';
import axios from 'axios';
import baseURL from '../../baseUrl';
axios.defaults.baseURL = baseURL;
import styles from '../../styles/captain/RideConnected';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class RideConnected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passName: '',
      passMobile: '',
      person: this.props.navigation.state.params.person,
      userId: this.props.navigation.state.params.userId,
      passengerLocation: this.props.navigation.state.params.passengerLoc,
      passengerDropOff: this.props.navigation.state.params.passengerDropOff,
      captainLocation: this.props.navigation.state.params.captainLoc,
      passengerId: this.props.navigation.state.params.passengerId,
      fare: this.props.navigation.state.params.fare,
    };
    this.mapView = null;
  }
  async componentDidMount() {
    const {passengerId} = this.state;
    if (passengerId != null) {
      axios
        .post('/users/getUser', {
          userId: passengerId,
        })
        .then((res) => {
          this.setState({
            passName: res.data.name,
            passMobile: res.data.mobile,
          });
        })
        .catch((err) => {
          console.log('db error user nahi mila', err);
        });
    } else console.log('else ');
  }
  // start ride
  startRide() {
    var socket = socketIO.connect(socketUrl);
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    socket.on('connect', () => {
      socket.emit('startRide');
      this.props.navigation.navigate('startedRide', {
        passPickUp: this.state.passengerLocation,
        passDropOff: this.state.passengerDropOff,
        fare: this.state.fare,
        passName: this.state.passName,
        passMobile: this.state.passMobile,
        userId: this.state.userId,
        person: this.state.person,
      });
    });
  }
  render() {
    return (
      <View>
        <Header>
          <Body>
            <Text style={styles.headerBody}> Connected</Text>
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
        <MapView
          style={styles.map}
          ref={(c) => (this.mapView = c)}
          initialRegion={{
            latitude: 24.697274,
            longitude: 70.178344,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.captainLocation.latitude,
              longitude: this.state.captainLocation.longitude,
            }}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.state.passengerLocation.latitude,
              longitude: this.state.passengerLocation.longitude,
            }}
          />
          <MapViewDirections
            origin={{
              latitude: this.state.captainLocation.latitude,
              longitude: this.state.captainLocation.longitude,
            }}
            destination={{
              latitude: this.state.passengerLocation.latitude,
              longitude: this.state.passengerLocation.longitude,
            }}
            apikey={ApiKey}
            strokeWidth={4}
            strokeColor="hotpink"
            mode="DRIVING"
            onReady={(result) => {
              (this.distance = result.distance),
                (this.duration = result.duration);
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
        <Card style={{backgroundColor: 'black'}}>
          <CardItem>
            <Text style={{color: 'red', fontSize: 20, marginLeft: '39%'}}>
              {this.state.passName}
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{color: 'red', fontSize: 20, marginLeft: '39%'}}>
              {this.state.passMobile}
            </Text>
          </CardItem>
        </Card>
        <Button rounded style={{marginTop: 5}} onPress={() => this.startRide()}>
          <Text style={{color: 'white', fontSize: 20, paddingLeft: '39%'}}>
            Start ride
          </Text>
        </Button>
      </View>
    );
  }
}
