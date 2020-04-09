<template>
  <div>
    <input v-model="name"
           type="text"
           placeholder="isi nama">
    <input v-model="link"
           type="text"
           placeholder="link poto">
    <button @click="save()">simpan</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      name: '',
      link: '',
      userss: null
    }
  },
  mounted() {
      this.userss = firebase.auth().currentUser;
      console.log(this.userss)
  },
  methods: {
    async save() {
      await this.userss.updateProfile({
        displayName: this.name,
        photoURL: this.link
      }).then(function () {
        console.log('sukses', this.userss)
        alert('sukses')
      }).catch(function (error) {
        console.log('sorry gagal')
      });
    }
  }
}
</script>
