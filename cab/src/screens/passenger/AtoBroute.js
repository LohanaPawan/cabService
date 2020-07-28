import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Button, Text, Header, Icon, Left, Right, Body} from 'native-base';
import ApiKey from '../../googleApiKey';
import styles from '../../styles/passenger/AtoBroute';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class AtoBroute extends React.Component {
  constructor(props) {
    super(props);
    this.mapView = null;
    this.state = {
      userId: this.props.navigation.state.params.userId,
      confirmAddress: false,
      pickUp: this.props.navigation.state.params.pickUp,
      dropOff: this.props.navigation.state.params.dropOff,
      from: this.props.navigation.state.params.from,
      destination: this.props.navigation.state.params.destination,
    };
    this.mapView = null;
    this.distance = 0;
    this.duration = 0;
  }
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Icon
              name="arrow-back"
              style={{color: 'white'}}
              onPress={() => this.props.navigation.navigate('passengerHome')}
            />
          </Left>
          <Body>
            <Text style={styles.headerBody}> Share fare</Text>
          </Body>
          <Right />
        </Header>
        <View>
          <MapView
            initialRegion={{
              latitude: this.state.pickUp.lat,
              longitude: this.state.pickUp.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            ref={(c) => (this.mapView = c)}
            style={StyleSheet.absoluteFillObject}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.pickUp.lat,
                longitude: this.state.pickUp.lng,
              }}
            />
            <MapView.Marker
              coordinate={{
                latitude: this.state.dropOff.lat,
                longitude: this.state.dropOff.lng,
              }}
            />
            <MapViewDirections
              origin={{
                latitude: this.state.pickUp.lat,
                longitude: this.state.pickUp.lng,
              }}
              destination={{
                latitude: this.state.dropOff.lat,
                longitude: this.state.dropOff.lng,
              }}
              apikey={ApiKey}
              strokeWidth={4}
              strokeColor="hotpink"
              mode="DRIVING"
              onReady={(result) => {
                (this.distance = result.distance),
                  (this.duration = result.duration);
                console.log(result.coordinates.origin);
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
          <Button
            rounded
            style={styles.button}
            onPress={() => this.submitAddress()}>
            <Text style={styles.buttonText}>Confirm Addresses </Text>
          </Button>
        </View>
      </View>
    );
  }

  submitAddress() {
    this.props.navigation.navigate('cabFare', {
      distance: this.distance,
      time: this.duration,
      pickUpAddress: this.state.pickUp,
      dropOffAddress: this.state.dropOff,
      origin: this.state.from,
      userId: this.state.userId,
    });
  }
}

export default AtoBroute;
