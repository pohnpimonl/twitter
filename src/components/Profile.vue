<template>
  <div>
    <div class="home">
      <div class="home1">Profile</div>
      <div class="profilehome">
      <div class="pitem1">
        <img :src="$root.state.url+profiles.avatar" class="picprofile">
      </div>
      <div class="pitem2">
        <button class="relobutton" @click="piopenForm()">เปลี่ยนรูป</button>
        <div class="modal" :style="{ display: $root.state.ispiopenForm ? 'block' : 'none' }">
          <div class="modal-content">
            <span class="close" @click="picloseForm()">&times;</span>
            <input  class="relobutton" type="file" @change="onSelectFile">
            <button  class="relobutton" @click="upload()">เปลี่ยนรูป</button>
            <!-- <button  class="relobutton" @click="picloseForm()">ยกเลิก</button> -->
          </div>
      </div>
      </div>
      <div class="pitem3"><p>Username :</p></div><div class="pitem4">{{profiles.username}}</div>
      <div class="pitem3"><p>Firstname :</p></div><div class="pitem4">{{profiles.firstname}}</div>
      <div class="pitem3"><p>Lastname :</p></div><div class="pitem4">{{profiles.lastname}}</div>
      <div class="pitem3"><p>PhoneNumber :</p></div><div class="pitem4">{{profiles.phoneNumber}}</div>
      <div class="pitem3"><p>E-Mail :</p></div><div class="pitem4">{{profiles.email}}</div>
      <div class="pitem2">
        <button  class="relobutton" @click="propenForm()">แก้ไข Profile</button>
        <div class="pitem2">
          <button  class="relobutton">ลบ Profile</button>
        </div>
        <div class="modal" :style="{ display: $root.state.ispropenForm ? 'block' : 'none' }">
          <div class="modal-content">
            <span class="close" @click="prcloseForm()">&times;</span>
        <form @submit.prevent="editprofile()">
                    <!-- <div>
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username" name="username" v-model="profiles.username" />
          </div> -->
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
            <button class="relobutton" type="submit">แก้ไขข้อมูล</button>
            <button class="relobutton" type="button" @click="prcloseForm()">ยกเลิก</button>
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
      profiles:{
        firstname:'',
        lastname:'',
        phoneNumber:'',
        email:''
      },
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
      editprofile(){
        const data={
          firstname:this.profiles.firstname,
          lastname:this.profiles.lastname,
          phoneNumber:this.profiles.phoneNumber,
          email:this.profiles.email
        }
        const editprofileURL = `${host}/me`
        fetch(editprofileURL,{method:'PUT',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`,'Content-Type':'application/json'},body:JSON.stringify(data)})
        .then(response=>{if(response.status === 204){alert('แก้ไขข้อมูลเรียบร้อย'),this.getprofile(),store.state.ispropenForm=false}})
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
.profilehome{
  margin-top: 15px;
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: 1px solid #e7e7e9;
  padding-bottom: 10px;
}
.pitem1{
  grid-column: 1 / span 2;
  text-align: center;
}
.picprofile{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000000;
}
.pitem2{
  grid-column: 1 / span 2;
  text-align: center;
  padding: 10px;
}
.pitem3{
  padding: 10px 0 10px 160px;
}
.pitem4{
  padding: 10px 0;
}
</style>