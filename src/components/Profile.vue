<template>
  <div>
    <div>
      <div>
        <img :src="$root.state.url+profiles.avatar" class="pictwit">
      </div>
      <div>
        <button @click="piopenForm()">เปลี่ยนรูป</button>
        <div class="modal" :style="{ display: $root.state.ispiopenForm ? 'block' : 'none' }">
          <div class="modal-content">
            <span class="close" @click="picloseForm()">&times;</span>
            <input type="file" @change="onSelectFile">
            <button @click="upload()">เปลี่ยนรูป</button>
            <button @click="picloseForm()">ยกเลิก</button>
          </div>
      </div>
      </div>
      <div>
      <p>Username : {{profiles.username}}</p>
      <p>Firstname : {{profiles.firstname}}</p>
      <p>Lastname : {{profiles.lastname}}</p>
      <p>PhoneNumber : {{profiles.phoneNumber}}</p>
      <p>E-Mail : {{profiles.email}}</p>
      <div>
        <button @click="propenForm()">แก้ไข Profile</button>
        <div class="modal" :style="{ display: $root.state.ispropenForm ? 'block' : 'none' }">
          <div class="modal-content">
            <span class="close" @click="prcloseForm()">&times;</span>
        <form @submit.prevent="editprofile()">
                    <div>
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username" name="username" v-model="profiles.username" />
          </div>
          <div>
            <label for="firstname">Firstname</label>
            <input type="text" placeholder="Enter Firstname" name="firstname" v-model="profiles.firstname" />
          </div>
          <div>
            <label for="lastname">Lastname</label>
            <input type="text" placeholder="Enter Lastname" name="lastname" v-model="profiles.lastname" />
          </div>
          <div>
            <label for="phoneNumber">PhoneNumber</label>
            <input type="tel" placeholder="Enter PhoneNumber" name="phoneNumber" v-model="profiles.phoneNumber" />
          </div>
          <div>
            <label for="email">E-Mail</label>
            <input type="email" placeholder="Enter E-Mail" name="email" v-model="profiles.email" />
          </div>

          <div>
            <button type="submit">แก้ไขข้อมูล</button>
            <button type="button" @click="prcloseForm()">ยกเลิก</button>
          </div>
        </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store"
const host ='https://camt-twitterapi.pair-co.com'
export default {
  data(){
    return{
      profiles:[],
      file:null,
    }
  },
  mounted(){
    this.getprofile()
  },
  methods:{
    getprofile(){
      const getprofileURL = `${host}/me`
      fetch(getprofileURL,{method:'GET',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`}})
      .then(response=>response.json())
      .then(data=>{this.profiles=data})
    },
    onSelectFile(event){
        this.file= event.target.files[0]
      },
      upload(){
        const formData = new FormData()
        formData.append('avatar',this.file)
        const uploadURL = `${host}/me/avatar`
        fetch(uploadURL,{method:'PUT',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`},body:formData})
        .then(response=>{if(response.status === 204){alert('แก้ไขรูปเรียบร้อย'),this.getprofile(),store.state.ispiopenForm=false}})
      },
          piopenForm() {
      store.piopenForm()
    },
    picloseForm() {
      store.picloseForm()
    },
              propenForm() {
      store.propenForm()
    },
    prcloseForm() {
      store.prcloseForm()
    },
  }
}
</script>

<style>
</style>