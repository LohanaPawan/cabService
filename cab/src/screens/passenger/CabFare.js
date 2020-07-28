import React from 'react';
import {YellowBox, Image, ActivityIndicator, View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Right,
  Left,
  Body,
  Button,
  Text,
  Icon,
  Card,
  CardItem,
} from 'native-base';
import axios from 'axios';
import baseURL from '../../baseUrl';
import socketIO from 'socket.io-client';
import socketUrl from '../../SocketUrl';
import {fare} from '../../fare';
import styles from '../../styles/passenger/CabFare';
axios.defaults.baseURL = baseURL;
export default class CabFare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBooked: false,
      userId: this.props.navigation.state.params.userId,
      pickUp: this.props.navigation.state.params.pickUpAddress,
      dropOff: this.props.navigation.state.params.dropOffAddress,
      origin: this.props.navigation.state.params.origin,
      distance: this.props.navigation.state.params.distance,
      duration: this.props.navigation.state.params.time,
      fare: 0,
      min: 0,
      max: 0,
    };
    this.total = 0;
  }
  componentDidMount() {
    this.total = fare(this.state.distance, this.state.duration);
    this.setState({
      fare: this.total,
      min: this.total - 30,
      max: this.total + 30,
    });
  }
  signOut() {
    this.props.navigation.navigate('login');
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Text
              onPress={() => this.props.navigation.navigate('passengerHome')}
              style={styles.headerLeft}>
              Cancel
            </Text>
          </Left>
          <Body>
            <Text style={styles.headerBody}>Estimated fare</Text>
          </Body>
          <Right>
            <Text style={styles.headerRight} onPress={() => this.signOut()}>
              Sign out
            </Text>
          </Right>
        </Header>
        <Content>
          <Card style={{marginTop: 100}}>
            <CardItem style={{marginLeft: 60}}>
              {/* {console.log('fare ', this.state.fare)} */}
              <Image
                source={require('../../images/carFront.jpg')}
                style={{width: 250, height: 250}}
              />
            </CardItem>
            <CardItem style={{marginLeft: 100}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {' '}
                Rs. {this.state.min} - {this.state.max}
              </Text>
            </CardItem>
            <CardItem style={{marginLeft: 120}}>
              <Button onPress={() => this.requestDriver()}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  {' '}
                  Book Ride{' '}
                </Text>
              </Button>
            </CardItem>
          </Card>
          {this.state.isBooked ? (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Looking for captain </Text>
              <Text style={styles.text}>Please wait... </Text>
            </View>
          ) : null}
        </Content>
      </Container>
    );
  }

  async requestDriver() {
    console.log('1');
    this.setState({
      isBooked: true,
    });
    console.log('2');
    var num = 1;
    var socket = socketIO.connect(socketUrl);
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    socket.on('connect', () => {
      if (num == 1) {
        socket.emit('taxiRequest', {
          pickUp: this.state.pickUp,
          dropOff: this.state.dropOff,
          origin: this.state.origin,
          fare: this.state.fare,
          passengerId: this.state.userId,
        });
        num++;
      }

      socket.on('accepted', (captain) => {
        this.setState({
          isBooked: false,
        });

        this.props.navigation.navigate('rideTracking', {
          captainId: captain.captainId,
          captainLocation: captain.captainLocation,
          passPickUp: this.state.pickUp,
          passDropOff: this.state.dropOff,
          userId: this.state.userId,
        });
      });
    });
  }
}
