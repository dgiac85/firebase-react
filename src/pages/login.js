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

import Signup from './signup';
import Account from './account';

import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);
    console.log("entra qui");
    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <MyHeader text="Login" loaded={this.state.loaded} />
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
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <MyButton
            text="New here?"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login(){
 console.log("entra qui in login");
    this.setState({
      loaded: false
    });



  firebaseApp.auth().signInWithEmailAndPassword(this.state.email.toLowerCase(),this.state.password).then(
    (result) => {

        this.setState({
             loaded: true
          });

        AsyncStorage.setItem('user_data', JSON.stringify(result.uid));
        console.log(JSON.stringify(result));
        result.getToken().then((token)=>{
          console.log("IL TOKEN è IL: "+token);
          AsyncStorage.setItem('tokenUser', JSON.stringify(token));
        });


        this.props.navigator.push({
          component: Account //dovrebbe andare alla pagina account
        });

        },(error) => {
        this.setState({
             loaded: true
        });

        alert('Login Failed. Please try again');
        var errorCode = error.code;
        var errorMessage = error.message;

    });


  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

}

AppRegistry.registerComponent('login', () => login);
