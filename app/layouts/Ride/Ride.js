import React, { Component } from 'react';
import {
  AppRegistry,
  TextInput,
  TouchableHighlight,
  Linking,
  Text,
  View
} from 'react-native';
import styles from './styles';

//Class which handles the hyperlinks to maps api and phone calls
class ExternalLink extends Component {
  //Opens the link, if possible.
  handleClick = () => {
    Linking.canOpenURL('tel:6312523291').then(supported => {
      if (supported) {
        Linking.openURL('tel:6312523291');
      } else {
        console.log('Don\'t know how to open URI: ');
      }
    });
  };

  render() {
    //Creates a clickable text
    return (
        <TouchableHighlight
        style = {styles.textLink}
        onPress = {this.handleClick}>
          <Text>{this.props.textLink}</Text>
        </TouchableHighlight>
    );
  }
}

class Ride extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:100}}></View>
        <View style={styles.info}>
          {/*Gives all information about the ride*/}
          {/*Name*/}
          <Text>Name: {this.props.all.user.first_name} {this.props.all.user.last_name}</Text>
          {/*Phone number*/}
          <View style={{flexDirection: 'row'}}>
            <Text>Number: </Text>
            <ExternalLink textLink={this.props.all.user.phone_number}/>
          </View>
          {/*Pick up location*/}
          <View style={{flexDirection: 'row'}}>
            <Text>From: </Text>
            <ExternalLink textLink={this.props.all.pickup}/>
          </View>
          {/*Drop off location*/}
          <View style={{flexDirection: 'row'}}>
            <Text>To: </Text>
            <ExternalLink textLink={this.props.all.dropoff}/>
          </View>
          {/*Passenger, queue spot, drive time, and comment*/}
          <Text>Passengers: {this.props.all.num_passengers}</Text>
          <Text>Queue Spot: {Number(this.props.all.index)+1}</Text>
          <Text>Drive time: {(Number(this.props.all.index)+1)*10} minutes</Text>
          <Text>Comment: {this.props.all.comment}</Text>
        </View>
        <View style={styles.buttons}>
          {/*Button to choose to pick up ride*/}
          <TouchableHighlight 
            onPress = {() => this.props.onSubmitClick()}
            style = {styles.pickup}>
            <Text>Pick up</Text>
          </TouchableHighlight>
          {/*Button to choose to deny/cancel the ride*/}
          <TouchableHighlight 
            onPress = {() => this.props.onCancelClick()}
            style = {styles.deny}>
            <Text>Deny :(</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Ride;
