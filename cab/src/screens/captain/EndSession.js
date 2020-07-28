import React from 'react'
import {  AirbnbRating } from 'react-native-ratings';

const arr = ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
export default class EndSession extends React.Component{
    render(){
        return (
            <AirbnbRating
            count={5}
            reviews={arr}
            defaultRating={0}
            size={50}
            onFinishRating={this.ratingCompleted}
          />
            
        )
    }
    ratingCompleted(rating){
        const index = rating - 1
        const str = arr[index]
        console.log('rating is : ', rating, str)
       
            this.props.navigation.navigate('captainHome')
    }
}