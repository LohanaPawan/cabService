import React from 'react'
import {
    Platform, KeyboardAvoidingView, View, StyleSheet, TextInput, Text, TouchableOpacity, StatusBar, Alert, ImageBackground, Image
,YellowBox} from 'react-native'
import ImageSource from '../../images/homeBackground.jpg'
import logo from '../../images/carRegister.jpg'
import axios from "axios"
import baseURL from "../../baseUrl"
import styles from '../../styles/captain/AddCar'
import socketIO from "socket.io-client";
import socketUrl from '../../SocketUrl';

axios.defaults.baseURL = baseURL
import {Header, Icon, Left, Right, Body} from 'native-base'
export default class AddCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carType: '',
            carNumber: '',
            carOwner: '',
            license: '',
            userId: this.props.navigation.state.params.userId,
            name: this.props.navigation.state.params.name,
            carId: '',
            change: true,
            check : true

        }
        this.addCar = this.addCar.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(name, val) {
        this.setState({
            [name]: val
        })
    }
    async addCar() {
        console.log("method addcar")
        const { userId, carType, carOwner, carNumber, license } = this.state
        if (carType != '' && carOwner != '' && carNumber != '' && license != '') {
            const result = await axios.post("/cars/addCar", { userId, carType, carOwner, carNumber, license })
            if (result.status == 201) {
                var socket = socketIO.connect(socketUrl);
                YellowBox.ignoreWarnings([
                    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
                ])
                this.setState({
                    carId: result.data._id,
                    check : false
                })
                socket.on("connect", () => {
                    console.log('add car socket')
                    socket.emit('addCar', {car: result.data, id:result.data._id })
                        socket.on('carApproved', () => { 
                            this.props.navigation.navigate('captainHome', 
                            {carId: this.state.carId, userId: this.state.userId})             
                        })
                        socket.on('carDeny', () => { 
                                    alert('Sorry! Vehicle registeration cancelled.')
                                    this.setState({
                                        change: false
                                    })
                        })
                })
                Alert.alert("Add Car", "Submitted to admin for verification")
            } else {
                Alert.alert("Add Car", "A network problem occured! Try again.")
            }
        } else {
            Alert.alert("Incomplete form can't be submitted!")
        }
    }

    render() {
        return (              
                <ImageBackground source={ImageSource} style={{ flex: 1,width: 395, height: 720 }}>
               <Header>
                   <Left>
                       <Icon name="menu" style={styles.headerLeft}/>
                   </Left>
                   <Body>
        <Text style={styles.headerBody}>{this.state.name}</Text>
                   </Body>
                   <Right>
                   <Text style={styles.headerRight}
                                onPress={() => this.props.navigation.navigate('login')}
                                >Sign out</Text>
                   </Right>
               </Header>
               <Text style={styles.heading}>Car Registeration</Text>
               <Image source={logo} style={styles.addCarLogo}/>
               {this.state.check ? 
                <View style={styles.form}>
                        <TextInput placeholder="Car Type (Mehran, Cultus)"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="rgb(224,224,224)"
                            style={styles.inputBox} underlineColorAndroid='white'
                            onChangeText={(carType) => this.handleChange("carType", carType)}
                        />
                        <TextInput placeholder="Car Registeration Number"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="rgb(224,224,224)"
                            style={styles.inputBox} underlineColorAndroid='white'
                            onChangeText={(carNumber) => this.handleChange("carNumber", carNumber)}
                        />
                        <TextInput placeholder="Car owner name"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="rgb(224,224,224)"
                            style={styles.inputBox} underlineColorAndroid='white'
                            onChangeText={(carOwner) => this.handleChange("carOwner", carOwner)}
                        />
                        <TextInput placeholder="Driving License"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="rgb(224,224,224)"
                            style={styles.inputBox} underlineColorAndroid='white'
                            onChangeText={(license) => this.handleChange("license", license)}
                        />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('login')}
                            style={[styles.buttonStyle, { justifyContent: 'flex-start' }]}>
                            <Text style={styles.buttonText}>
                                Cancel
                  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.addCar()
                            }}
                            style={[styles.buttonStyle, { justifyContent: 'flex-end' }]}>
                            <Text style={styles.buttonText}>
                                Submit
                               </Text>
                        </TouchableOpacity>       
                    </View>     
                </View>
                : 
                <Text style={styles.pleaseWaitText}> 
                Please wait for the admin approval of the vahicle
                </Text>
                }
                </ImageBackground>
        )
    }
}

