import React, {Component} from 'react';
import {View, Text, Linking, Dimensions, YellowBox, Alert} from 'react-native';
import {
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Button,
  Left,
  Right,
  Body,
} from 'native-base';
import axios from 'axios';
import baseURL from '../../baseUrl';
axios.defaults.baseURL = baseURL;
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import ApiKey from '../../googleApiKey';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Modal from 'react-native-modal';
import socketIO from 'socket.io-client';
import socketUrl from '../../SocketUrl';
import styles from '../../styles/passenger/RideInProgress';
export default class RideInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalFare: 0,
      isModalVisible: false,
      isRideEnded: false,
      name: this.props.navigation.state.params.name,
      mobile: this.props.navigation.state.params.mobile,
      carType: this.props.navigation.state.params.carType,
      carNumber: this.props.navigation.state.params.carNumber,
      captainId: this.props.navigation.state.params.captainId,
      passPickUp: this.props.navigation.state.params.passPickUp,
      passDropOff: this.props.navigation.state.params.passDropOff,
      captainLocation: this.props.navigation.state.params.captainLocation,
    };
    this.mapView = null;
  }

  componentDidMount() {
    var socket = socketIO.connect(socketUrl);
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    socket.on('connect', () => {
      socket.emit('rideInProgressSocket');
      socket.on('endRide', (fare) => {
        this.setState({
          isRideEnded: true,
          totalFare: fare.fare,
        });
      });
      socket.on('endSession', () => {
        this.props.navigation.navigate('reviews');
      });
    });
  }
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Icon name="menu" style={{color: 'white'}} />
          </Left>
          <Body>
            <Text style={styles.headerBody}>Ride started</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('home', {
                  userId: this.state.userId,
                })
              }>
              <Text style={{color: 'white', fontSize: 20}}>Main menu</Text>
            </Button>
          </Right>
        </Header>
        <MapView
          initialRegion={{
            latitude: this.state.passPickUp.lat,
            longitude: this.state.passPickUp.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          ref={(c) => (this.mapView = c)}
          style={styles.map}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.passPickUp.lat,
              longitude: this.state.passPickUp.lng,
            }}
            // image={require("../../../images/Taxi")}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.state.passDropOff.lat,
              longitude: this.state.passDropOff.lng,
            }}
          />
          <MapViewDirections
            origin={{
              latitude: this.state.passPickUp.lat,
              longitude: this.state.passPickUp.lng,
            }}
            destination={{
              latitude: this.state.passDropOff.lat,
              longitude: this.state.passDropOff.lng,
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
            <Text style={{color: 'red', fontSize: 20}}>{this.state.name} </Text>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={{color: 'blue', fontSize: 20}}>
                Vahicle: {this.state.carNumber}{' '}
              </Text>
            </Left>
            <Body />
            <Right>
              <Text style={{color: 'blue', marginLeft: '10%', fontSize: 20}}>
                {this.state.carNumber}
              </Text>
            </Right>
          </CardItem>
        </Card>
        {this.state.isRideEnded ? (
          <Modal isVisible={this.state.isRideEnded}>
            <View style={{marginTop: 100}}>
              <Text style={{color: 'white', fontSize: 20, marginLeft: '40%'}}>
                Your fare
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                  marginBottom: 40,
                  fontWeight: 'bold',
                  marginLeft: '40%',
                }}>
                {this.state.totalFare}
              </Text>
              <Button
                rounded
                onPress={() => {
                  this.setState({
                    isRideEnded: false,
                  });
                  this.props.navigation.navigate('reviews');
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: '40%',
                  }}>
                  Ok
                </Text>
              </Button>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
  endRide() {
    // code here
  }
}
