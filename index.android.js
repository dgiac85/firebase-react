/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 'use strict';
 import React, {Component} from 'react';
 import ReactNative from 'react-native';

 const {   AppRegistry,
   StyleSheet,
   Text,
   TextInput,
   View,
   Navigator,
   AsyncStorage} = ReactNative;

 import Signup from './src/pages/signup';
 import Account from './src/pages/account';


 import MyHeader from './src/components/header';

 GLOBAL = require('./src/config/Globals');

 const firebase = require('firebase');

 //import Firebase from 'firebase';

 global.firebaseApp = firebase.initializeApp(GLOBAL.FIREBASECONFIG);


 import styles from './src/styles/common-styles.js';

 class firebaseauth extends Component {

   constructor(props){
     super(props);
     this.state = {
       component: null,
       loaded: false
     };
   }

   componentWillMount(){

         let component = {component: Signup};

         firebaseApp.auth().onAuthStateChanged((user)=> {
           if (user) {
              // User is signed in.
              console.log("ottiene l'utente");
              this.setState({component:Account});
           }
           else{
             console.log("non ottiene l'utente");
             console.log(component);
             this.setState(component);
           }
         });


   }

   render(){

     if(this.state.component){
       return (
         <Navigator
           initialRoute={{component: this.state.component}}
           configureScene={() => {
             return Navigator.SceneConfigs.FloatFromRight;
           }}
           renderScene={(route, navigator) => {
             if(route.component){
               return React.createElement(route.component, { navigator });
             }
           }}
         />
       );
     }else{
       return (
         <View style={styles.container}>
           <MyHeader text="React Native Firebase Auth Android" loaded={this.state.loaded} />
           <View style={styles.body}></View>
         </View>
       );
     }

   }

 }

 AppRegistry.registerComponent('firebaseauth', () => firebaseauth);
