<template>
  <div>
    <div class="sidenav">
      <div class="login-main-text">
        <img src="https://chataja.co.id/images/logo_chat_aja_110.png"
             width="200"
             height="200"
             class="d-inline-block align-top"
             alt="ChatAja">
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
            <div class="form-group">
              <label>Email</label>
              <input v-model="email"
                     type="text"
                     class="form-control"
                     placeholder="email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="password"
                     type="password"
                     class="form-control"
                     placeholder="Password">
            </div>
            <button @click="login()"
                    type="submit"
                    class="btn btn-black">Login</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('/')
        },
        (err) => {
          alert('cek kembali email/password anda')
        }
      )
    }
  }
}
</script>

<style scoped>
body {
    font-family: "Lato", sans-serif;
}



.main-head{
    height: 150px;
    background: #FFF;
   
}

.sidenav {
    height: 100%;
    background-color:#ED3F47;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%; 
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 80%;
    }

    .register-form{
        margin-top: 20%;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
}
</style>