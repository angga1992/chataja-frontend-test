<template>
  <div class="container">
    <nav
      style="background-color: #ED3F47;" 
      class="navbar navbar-light">
      <a class="navbar-brand"
         href="#">
        <img src="https://chataja.co.id/images/logo_chat_aja_110.png"
             width="45"
             height="45"
             class="d-inline-block align-top"
             alt="ChatAja">
      </a>
    <div style="text-align: right; color: white"><span style="cursor: pointer"
            @click="logout()">Logout</span></div>
    </nav>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text"
                       class="search-bar"
                       placeholder="Search">
                <span class="input-group-addon">
                  <button type="button"> <i class="fa fa-search"
                       aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div v-for="(aut, index) in messages"
               :key="index"
               v-show="index == messages.length - 1"
               class="inbox_chat">
            <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"><img :src="getGuest.image"
                       :alt="getGuest.author"> </div>
                <div class="chat_ib">
                  <h5 style="text-align: left">{{getGuest.author}} <span class="chat_date">{{aut.createdAt.seconds | dateTime}}</span></h5>
                  <p style="text-align: left">{{aut.message}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav @click="viewImage(getGuest.image)"
             style="cursor: pointer"
             data-toggle="modal"
             data-target="#myModal"
             class="navbar navbar-light bg-light">
          <a class="navbar-brand"
             href="#">
            <img :src="getGuest.image"
                 width="30"
                 height="30"
                 class="d-inline-block align-top"
                 alt="">
            {{getGuest.author}}
          </a>
        </nav>
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="(message, index) in messages"
                 :key="index"
                 class="incoming_msg">
              <div style="width:100%; display: flow-root">
                <div @click="viewImage(getGuest.image)"
                     v-if="message.author != authUser.displayName"
                     class="incoming_msg_img"
                     data-toggle="modal"
                     data-target="#myModal">
                  <img :src="getGuest.image"
                       :alt="getGuest.author">
                </div>
                <div :class="[message.author == authUser.displayName ? 'sent_msg' : 'received_msg']">
                  <div :style="`${message.author == authUser.displayName ? 'width : 100%' : ''}`"
                       class="received_withd_msg">
                    <p>{{ message.message }}</p>
                    <span class="time_date"> {{message.author}} | {{message.createdAt.seconds | dateTime}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input @keyup.enter="saveMessages"
                     v-model="message"
                     type="text"
                     style="padding: 3px"
                     class="write_msg"
                     placeholder="Type a message..." />
              <button @click="saveMessages()"
                      class="msg_send_btn"
                      type="button"><i class="fa fa-paper-plane-o"
                   aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      <!-- <router-link to="/Addingdata">
        <p class="text-center top_spac"> Design by Sunil Rajput</p>
      </router-link> -->
    </div>
    <div class="modal"
         id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <img :src="photoProfile"
                 alt="">
            <div>
              <span>
                {{nameProfile}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default {
  name: 'Chatroom',
  components: {
  },
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
      photoProfile: '',
      nameProfile: ''
    }
  },
  methods: {
    viewImage(params) {
      this.photoProfile = params
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/Login')
      })
    },
    fetchMessages() {
      db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
        let allMessages = []
        querySnapshot.forEach(doc => {
          allMessages.push(doc.data())
        })
        this.messages = allMessages
      })
    },
    saveMessages() {
      // save to firebase
      db.collection('chat').add({
        message: this.message,
        author: this.authUser.displayName,
        createdAt: new Date(),
        image: this.authUser.photoURL
      })
      this.message = null
    }
  },
  computed: {
    getGuest() {
      let temp = ''
      for (let i in this.messages) {
        if (this.messages[i].author !== this.authUser.displayName) {
          temp = {
            author: this.messages[i].author,
            image: this.messages[i].image,
          }
        }
      }
      return temp
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {}
      }
    })
    this.fetchMessages()
  },
  filters: {
    dateTime: function (value) {
      console.log('value', value)
      const HARI = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
      ]

      const BULAN = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agust', 'Sept', 'Okt', 'Nov', 'Des'
      ]
      if (['number', 'string'].includes(typeof value)) {
        const date = new Date(value * 1000)
        const year = date.getFullYear()
        const month = BULAN[date.getMonth()]
        const dateInMonth = date.getDate()
        const day = HARI[date.getDay()]
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        console.log(date, year, month)
        return `${dateInMonth} ${month} ${year} ${hour}:${minute}`
      }
    }
  }
}
</script>

<style scoped>
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding:
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  /* width: 46%; */
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>