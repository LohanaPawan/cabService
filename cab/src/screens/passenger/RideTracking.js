import React, {Component} from 'react';
import {View, Text, Linking, Dimensions, YellowBox} from 'react-native';
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
axios.defaults.baseURL = baseURL;
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import ApiKey from '../../googleApiKey';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import styles from '../../styles/passenger/RideTracking';
import socketIO from 'socket.io-client';
import socketUrl from '../../SocketUrl';
export default class RideTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobile: '',
      carType: '',
      carNumber: '',
      userId: this.props.navigation.state.params.userId,
      captainId: this.props.navigation.state.params.captainId,
      passPickUp: this.props.navigation.state.params.passPickUp,
      passDropOff: this.props.navigation.state.params.passDropOff,
      captainLocation: this.props.navigation.state.params.captainLocation,
    };
    this.mapView = null;
  }
  async componentDidMount() {
    const {captainId} = this.state;
    try {
      var socket = socketIO.connect(socketUrl);
      YellowBox.ignoreWarnings([
        'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
      ]);

      socket.on('connect', () => {
        socket.emit('startTaxiSocket');
        socket.on('startRide', () => {
          console.log('ride started');
          this.props.navigation.navigate('rideInProgress', {
            captainId: this.state.captainId,
            captainLocation: this.state.captainLocation,
            passPickUp: this.state.passPickUp,
            passDropOff: this.state.passDropOff,
            name: this.state.name,
            mobile: this.state.mobile,
            carType: this.state.carType,
            carNumber: this.state.carNumber,
          });
        });
      });

      const result = await axios.post('/cars/getCar', {userId: captainId});
      if (result.status === 201) {
        this.setState({
          name: result.data.name,
          mobile: result.data.mobile,
          carType: result.data.carType,
          carNumber: result.data.carNumber,
        });
      } else {
        console.log('204 else');
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Icon name="menu" style={{color: 'white'}} />
          </Left>
          <Body>
            <Text style={styles.headerBody}>Passenger</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('home', {
                  userId: this.state.userId,
                })
              }>
              <Text style={styles.headerRight}>Main menu</Text>
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
              latitude: this.state.captainLocation.lat,
              longitude: this.state.captainLocation.lng,
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
            <Left>
              <Text style={{color: 'blue', fontSize: 20}}>
                {this.state.name}{' '}
              </Text>
              <Body>
                <Text style={{color: 'blue', marginLeft: '20%', fontSize: 20}}>
                  {this.state.carNumber}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Icon
                name="call"
                style={{color: 'blue'}}
                onPress={() => {
                  this.dial();
                }}
              />
              <Body>
                <Text style={styles.cardText}> {this.state.mobile}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('passengerHome')}>
                <Text style={{color: 'red', fontSize: 20}}>Cancel</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
  dial() {}
}
