import React from 'react'
import {
    YellowBox, View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, ActivityIndicator
} from 'react-native'
import { Container, Header, Icon, Left, Body, Right, Content, Button } from 'native-base'
import MapView, { Marker } from 'react-native-maps';
import styles from '../../styles/captain/CaptainHome'
import socketIO from "socket.io-client";
import socketUrl from '../../SocketUrl';
export default class CaptainHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carId: this.props.navigation.state.params.carId,
            userId: this.props.navigation.state.params.userId,
            latitude: 24.697274,
            longitude: 70.178344,
            isRide: true,
            isLooking: false,
            passengerFound: true,
        }
    }
    componentDidMount() {
        this.get();
    }
    async get() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
            },
        );
        console.log("here " + PermissionsAndroid.RESULTS.GRANTED)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            Alert.alert("Location Permission", "Denied")
        }
    }

    findPassengers() {
        var socket = socketIO.connect(socketUrl);
        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ])
        socket.on("connect", () => {
            socket.emit("passengerRequest", {
                userId: this.state.userId
            });
            socket.on("taxiRequest", routeResponse => {
                this.setState({
                    passengerFound: true,
                });
                this.props.navigation.navigate('passengerRequest',
                    {
                        rideDetails: routeResponse,
                        carId: this.state.carId,
                        userId: this.state.userId,
                        captainLocation: { lat: this.state.latitude, lng: this.state.longitude }
                    })
            })
        });
        this.setState({
            isLooking: true
        })
    }
    signOut() {
        this.props.navigation.navigate('login')
    }
    leave() {
        this.setState({ isLooking: false })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Left>
                        <Icon name='menu' style={styles.headerLeft} />
                    </Left>
                    <Body>
                        <Text style={styles.headerBody}>Captain</Text>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('login')}>
                            <Text style={styles.headerRight}
                                onPress={() => this.signOut()}>Sign out</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 24.697274,
                            longitude: 70.178344,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 24.697274,
                                longitude: 70.178344,
                            }}
                            title={""}
                            description={""}
                        />
                    </MapView>
                    {this.state.isLooking ?
                        <View style={styles.activityIndicatorView}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.activityText}> Looking for passenger </Text>
                            <Button rounded
                                style={{ marginTop: 50, width: 200 }}
                                onPress={() => this.leave()}
                            >
                                <Text style={{ color: 'white', fontSize: 20, marginLeft: 70 }}>Leave</Text>
                            </Button>
                        </View>
                        : null
                    }
                    <Button rounded
                        style={{ marginTop: 600 }}
                        onPress={() => this.findPassengers()}
                    >
                        <Text
                            style={styles.joinButton}>
                            Join
                            </Text>
                    </Button>
                </Content>
            </View>
        )
    }
}

