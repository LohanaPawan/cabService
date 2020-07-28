import {
  Text,
  StyleSheet,
  View,
  Alert,
  ImageBackground,
  Button,
} from 'react-native';
import React from 'react';
import {
  Icon,
  Form,
  Item,
  Input,
  Label,
  Header,
  Body,
  Picker,
} from 'native-base';
import styles from '../../styles/profile/login';
import axios from 'axios';
import baseURL from '../../baseUrl';
axios.defaults.baseURL = baseURL;
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      mobile: '',
      password: '',
      mobileError: '',
      passwordError: '',
      loginAs: '',
    };
  }

  // Method to set input values to the states
  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  // Sign in logic
  async handleSignIn() {
    try {
      const {mobile, password} = this.state;
      if (mobile == '') {
        this.setState({
          mobileError: 'Required',
        });
        return 0;
      }
      if (password == '') {
        this.setState({
          passwordError: 'Required',
        });
        return 0;
      }
      const result = await axios.post('/auth/login', {mobile, password});
      if (result.status == 201) {
        this.setState({
          userId: result.data.user._id,
          name: result.data.user.name,
          mobile: '',
          password: '',
        });
        if (this.state.loginAs == 'captain') {
          this.props.navigation.navigate('addCarCaptain', {
            userId: this.state.userId,
            name: this.state.name,
          });
        } else if (this.state.loginAs == 'passenger') {
          this.props.navigation.navigate('passengerHome', {
            userId: this.state.userId,
            name: this.state.name,
          });
        }
      } else {
        Alert.alert('cab service', 'Invalid mobile or password');
      }
    } catch (err) {
      Alert.alert('cab service', 'Invalid mobile or password!');
      console.log('Network error');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{width: 400, height: '100%'}}
          source={require('../../images/homeBackground.jpg')}>
          <Header>
            <Body style={styles.headerBody}>
              <Text style={styles.headerBodyText}>Cab service</Text>
            </Body>
          </Header>
          <Form style={styles.form}>
            <View style={styles.pickerView}>
              <Picker
                placeholder="Login As"
                mode="dropdown"
                style={styles.loginAsPicker}
                selectedValue={this.state.loginAs}
                onValueChange={(value) => this.setState({loginAs: value})}>
                <Picker.Item label="Login as" value="none" />
                <Picker.Item label="Passenger" value="passenger" />
                <Picker.Item label="Captain" value="captain" />
              </Picker>
            </View>

            <Item style={styles.inputBox}>
              <Input
                placeholder="11 digit mobile number"
                maxLength={11}
                autoCapitalize="none"
                style={styles.inputText}
                autoCorrect={false}
                keyboardType="number-pad"
                placeholderTextColor="rgb(224,224,224)"
                underlineColorAndroid="rgba(77, 5, 232, 1)"
                onChangeText={(mobile) => this.handleChange('mobile', mobile)}
              />
              <Icon name="call" />
            </Item>
            <Text style={styles.errorText}> {this.state.mobileError}</Text>
            <Item style={styles.inputBox}>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                style={styles.inputText}
                autoCorrect={false}
                secureTextEntry={true}
                placeholderTextColor="rgb(224,224,224)"
                underlineColorAndroid="rgba(77, 5, 232, 1)"
                onChangeText={(pw) => this.handleChange('password', pw)}
              />
              <Icon name="eye" />
            </Item>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
            <Text
              style={styles.errorText}
              onPress={() => alert('forgot password')}>
              {' '}
              {this.state.passwordError}
            </Text>
            <Item
              onPress={() => this.handleSignIn()}
              style={styles.buttonStyle}>
              <Label style={styles.loginText}>Login</Label>
            </Item>
            <Item
              onPress={() => this.props.navigation.navigate('signup')}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>No account? Sign Up</Text>
            </Item>
          </Form>
        </ImageBackground>
      </View>
    );
  }
}
