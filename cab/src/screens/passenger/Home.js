import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  Button,
  Item,
  Header,
  Icon,
  Left,
  Right,
  Body,
  Container,
  Content,
} from 'native-base';
import ApiKey from '../../googleApiKey';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import styles from '../../styles/passenger/Home';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      destination: '',
      latitude: 24.716175,
      longitude: 70.127568,
      pickUp: '',
      dropOff: '',
      isFrom: false,
      isDestination: false,
      userId: this.props.navigation.state.params.userId,
    };
    this.mapView = null;
  }
  componentDidMount() {
    this.get();
  }
  async get() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {},
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {},
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      alert('Location permission denied');
    }
  }
  clearList() {
    console.log('clear list');
  }

  render() {
    return (
      <Container>
        <Header>
          <Body />
          <Right>
            <Text
              style={styles.headerRight}
              onPress={() => this.props.navigation.navigate('login')}>
              Sign out
            </Text>
          </Right>
        </Header>
        <Item>
          <GooglePlacesAutocomplete
            placeholder="Pick up"
            minLength={3}
            debounce={50}
            fetchDetails={true}
            listViewDisplayed="auto"
            renderDescription={(row) => row.description}
            onPress={(data, details = null) => {
              this.setState({
                from: data.description,
                pickUp: details.geometry.location,
                isFrom: true,
              });
            }}
            query={{
              key: ApiKey,
              language: 'en',
              sessiontoken: Math.floor(Math.random() * 100) + 1,
            }}
            styles={{
              textInputContainer: {
                width: '100%',
              },
              description: {
                fontWeight: 'bold',
              },
            }}
          />
        </Item>
        <Item>
          <GooglePlacesAutocomplete
            placeholder="Drop off"
            minLength={3}
            fetchDetails={true}
            listViewDisplayed="auto"
            renderDescription={(row) => row.description}
            onFail={(res) => console.log('on fail ', res)}
            onNotFound={(res) => console.log('not found', res)}
            onTimeout={(res) => console.warn('timeout')}
            onSubmitEditing={() => console.log('submit editing')}
            onPress={(data, details = null) => {
              this.setState({
                destination: data.description,
                dropOff: details.geometry.location,
                isDestination: true,
              });
              if (this.state.isDestination) {
                this.props.navigation.navigate('aToBroute', {
                  pickUp: this.state.pickUp,
                  dropOff: this.state.dropOff,
                  from: this.state.from,
                  destination: this.state.destination,
                  userId: this.state.userId,
                });
              }
            }}
            query={{
              key: ApiKey,
              language: 'en',
              sessiontoken: Math.floor(Math.random() * 100) + 1,
            }}
            styles={{
              textInputContainer: {
                width: '100%',
                height: 40,
              },
              description: {
                fontWeight: 'bold',
              },
            }}
          />
        </Item>
        <MapView
          ref={(ref) => (this.mapView = ref)}
          zoomEnabled={true}
          style={{width: '100%', height: '80%'}}
          provider="google"
          scrollEnabled={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            coordinate={{
              latitude: 24.716175,
              longitude: 70.127568,
            }}
            title="Purani bazar, Islamkot"
            description="Purani bazar, Islamkot, Tharparkar, Sindh."
            pinColor="green"
          />
        </MapView>
      </Container>
    );
  }
}
