
import 'react-native-gesture-handler';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import LoginScreen from './src/screens/profile/LoginScreen';
import SignUp from './src/screens/profile/SignUp';
import AddCar from './src/screens/captain/AddCar'
import PassengerHome from './src/screens/passenger/Home';
import CaptainHome from './src/screens/captain/CaptainHome';
import AtoBroute from './src/screens/passenger/AtoBroute';
import CabFare from './src/screens/passenger/CabFare';
import PassengerRequest from './src/screens/captain/PassengerRequest';
import RideConnected from './src/screens/captain/RideConnected';
import RideTracking from './src/screens/passenger/RideTracking';
import StartedRide from './src/screens/captain/StartedRide';
import RideInProgress from './src/screens/passenger/RideInProgress';
import EndSession from './src/screens/captain/EndSession';
import  Reviews from './src/screens/passenger/Reviews';


const CaptainStack = createStackNavigator({
  addCarCaptain : {
    screen: AddCar,
    navigationOptions: {
      headerShown: null
    }
  },
  captainHome: {
    screen: CaptainHome,
    navigationOptions: {
      headerShown: null
    }
  },
  passengerRequest: {
    screen : PassengerRequest,
    navigationOptions: {
      headerShown: null
    }
  },
  rideConnected : {
    screen: RideConnected,
    navigationOptions: {
      headerShown: null
    }
  },
  
  startedRide : {
    screen: StartedRide,
    navigationOptions: {
      headerShown: null
    }
  },
  rating: {
    screen: EndSession,
    navigationOptions: {
      headerShown: null
    }
  }
})

const PassengerStack = createStackNavigator({
  passengerHome: {
    screen : PassengerHome,
    navigationOptions: {
      headerShown: null
    }
  },
  aToBroute: {
    screen : AtoBroute,
    navigationOptions: {
      headerShown: null
    }
  },
  cabFare: {
    screen: CabFare,
    navigationOptions: {
      headerShown: null
    }
  },
  
  rideTracking: {
    screen: RideTracking,
    navigationOptions: {
      headerShown: null
    }
  },

  rideInProgress: {
    screen: RideInProgress,
    navigationOptions: {
      headerShown: null
    }
  },

  reviews: {
    screen: Reviews,
    navigationOptions: {
      headerShown: null
    }
  }


})
const AuthStack = createStackNavigator({
  login: {
    screen : LoginScreen,
    navigationOptions: {
      headerShown: null
    }
  },
  signup:  {
    screen : SignUp,
    navigationOptions: {
      headerShown: null
    }
  },
})
const switchNavigator = createSwitchNavigator({
       Auth: AuthStack,
       Captain: CaptainStack,
       Passenger: PassengerStack
})

 export default createAppContainer(switchNavigator);




