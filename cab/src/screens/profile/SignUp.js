import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import baseURL from '../../baseUrl';
import styles from '../../styles/profile/signup';
axios.defaults.baseURL = baseURL;
import {Header, Icon, Left, Body, Right} from 'native-base';
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      email: '',
      name: '',
      message: '',
      userId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignUp.bind(this);
  }
  // Method to set input values to the states
  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }
  // Sign up logic
  async handleSignUp() {
    try {
      const {name, email, mobile, password} = this.state;
      if ((name != '', email != '', mobile != '', password != '')) {
        const result = await axios.post('/auth/signup', {
          name,
          email,
          mobile,
          password,
        });
        console.log(result.data);
        if (result.status == 201) {
          Alert.alert('Share Fare', 'Account has been created successfully!');
          this.props.navigation.navigate('login');
        } else {
          console.log('else if');
          Alert.alert('Share Fare', 'A network problem occured! Try again.');
        }
      } else {
        Alert.alert('Sign Up', 'All the fields are Required');
      }
    } catch (error) {
      if (result.status == 409) Alert.alert('Account already exists');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{width: 400, height: '100%'}}
          source={require('../../images/homeBackground.jpg')}>
          <Header>
            <Left>
              <Icon
                name="arrow-back"
                style={styles.headerLeft}
                onPress={() => this.props.navigation.navigate('login')}
              />
            </Left>
            <Body>
              <Text style={styles.headerBody}>Sign up</Text>
            </Body>
          </Header>
          <View style={styles.signupHeader}>
            <Text style={styles.signupText}>Register</Text>
          </View>
          <View style={styles.signupForm}>
            <TextInput
              placeholder="Full Name"
              autoCapitalize="none"
              maxLength={14}
              autoCorrect={false}
              placeholderTextColor="rgb(224,224,224)"
              style={styles.inputBox}
              underlineColorAndroid="rgba(77, 5, 232, 1)"
              onChangeText={(name) => this.handleChange('name', name)}
            />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholderTextColor="rgb(224,224,224)"
              style={styles.inputBox}
              underlineColorAndroid="rgba(77, 5, 232, 1)"
              onChangeText={(email) => this.handleChange('email', email)}
            />
            <TextInput
              placeholder="11 digit mobile number"
              autoCapitalize="none"
              maxLength={11}
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={11}
              placeholderTextColor="rgb(224,224,224)"
              style={styles.inputBox}
              underlineColorAndroid="rgba(77, 5, 232, 1)"
              onChangeText={(mobile) => this.handleChange('mobile', mobile)}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholderTextColor="rgb(224,224,224)"
              style={styles.inputBox}
              underlineColorAndroid="rgba(77, 5, 232, 1)"
              onChangeText={(pw) => this.handleChange('password', pw)}
            />
            <TouchableOpacity
              onPress={() => this.handleSignUp()}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
