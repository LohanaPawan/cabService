import {  AirbnbRating } from 'react-native-ratings';
import React from 'react'

import { Text, View } from 'react-native'
export default class Rating extends React.Component{
    render(){   
        return(
            <View>           
<AirbnbRating
  count={5}
  reviews={this.props.arr}
  defaultRating={3}
  size={50}
  onFinishRating={this.props.onRatingCompleted}
/>
            </View>      
        )
    }
   
}