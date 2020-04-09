import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'



  require("firebase/firestore");

  var firebaseConfig = {
    apiKey: "AIzaSyD_FFnkwaU7jROwIE-aEGyAmrj1IIs_YAs",
    authDomain: "chataja-realtime.firebaseapp.com",
    databaseURL: "https://chataja-realtime.firebaseio.com",
    projectId: "chataja-realtime",
    storageBucket: "chataja-realtime.appspot.com",
    messagingSenderId: "968195748673",
    appId: "1:968195748673:web:3c17a0d4f9df315f73a7c0",
    measurementId: "G-ZRF6XRTFMK"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();

  window.db = db;

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
