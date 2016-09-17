/*
The signup page is the default page of the app and allows the user to create an account.
Create pages/signup.js and add the following:
*/

'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const {   AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage} = ReactNative;

import MyButton from '../components/button';
import MyHeader from '../components/header';
GLOBAL = require('../config/Globals');

import Login from './login';

import styles from '../styles/common-styles.js';

export default class signup extends Component {
  //creazione del componente signup, con le sue relative proprietà e metodi

  constructor(props){
    super(props);


    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });



    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email.toLowerCase(), this.state.password).catch((error, userData) => {
      console.log(error);
      console.log(JSON.stringify(userData));
      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:"+error);
        }

      }else{
        console.log("no error");
        this.props.navigator.push({
          component: Account
        });

      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

    });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MyHeader text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>

            <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
            placeholder={"Email Address"}
            />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <MyButton
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <MyButton
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
