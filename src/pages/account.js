'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';

const {AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  AsyncStorage} = ReactNative;

import MyButton from '../components/button';
import MyHeader from '../components/header';
GLOBAL = require('../config/Globals');

import Login from './login';

import styles from '../styles/common-styles.js';

export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);

      this.setState({
        user: user_data,
        loaded: true
      });
    });

  }

  render(){

    return (
      <View style={styles.container}>
        <MyHeader text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user}</Text>
              </View>

              <MyButton
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View>
      </View>
    );
  }

  logout(){

    firebaseApp.auth().signOut().then((result) => {
      // Sign-out successful.
      console.log("sloggato");
      this.props.navigator.push({
       component: Login
      });

    }, (error) => {
        // An error happened.
        console.log("non sloggato");
    });

  }

}

const page_styles = StyleSheet.create({  //stile personalizzato per la pagina
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
