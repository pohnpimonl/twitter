<template>
  <div>
    <div>
      <button class="relobuttonmain" @click="openForm()"><span>สมัครสมาชิก</span></button>
    </div>
    <div class="modal" :style="{ display: $root.state.isreopenForm ? 'block' : 'none' }" >
      <div class="modal-content">
        <span class="close" @click="closeForm()">&times;</span>
        <p class="relop">ลงทะเบียน</p>
        <form @submit.prevent="register()">
            <div class="formrelo">
              <label for="avatar">Picture</label>
            <input type="file" class="inputrelo" />
          
            <label for="firstname">Firstname</label>
            <input type="text" placeholder="Enter Firstname" class="inputrelo" v-model="form.firstname" required />
         
            <label for="lastname">Lastname</label>
            <input type="text" placeholder="Enter Lastname" class="inputrelo" v-model="form.lastname" required />
         
            <label for="phoneNumber">PhoneNumber</label>
            <input type="tel" placeholder="Enter PhoneNumber" class="inputrelo" v-model="form.phoneNumber" required />
       
            <label for="email">E-Mail</label>
            <input type="email" placeholder="Enter E-Mail" class="inputrelo" v-model="form.email" required />
        
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username" class="inputrelo" v-model="form.username" required />
       
            <label for="password">Password</label>
            <input type="password" placeholder="Enter Password" class="inputrelo" v-model="form.password" required />
      
            <label for="password_">Re-Password</label>
            <input type="password" placeholder="Enter Re-Password" class="inputrelo" v-model="form.password_" required />
            </div>
            <div class="relobuttondiv">
              <button class="relobutton" type="submit">สมัครสมาชิก</button>
              <button class="relobutton" type="button" @click="closeForm()">ยกเลิก</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store"
const host = "https://camt-twitterapi.pair-co.com"
export default {
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        password_: "",
        phoneNumber: "",
        avatar: null,
      },
    }
  },
  methods: {
    register() {
      if (this.form.password === this.form.password_) {
        const formData = new FormData()
        formData.append("firstname", this.form.firstname)
        formData.append("lastname", this.form.lastname)
        formData.append("email", this.form.email)
        formData.append("username", this.form.username)
        formData.append("password", this.form.password)
        formData.append("phoneNumber", this.form.phoneNumber)
        const registerURL = `${host}/register`
        fetch(registerURL, { method: "POST", body: formData })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              alert("ลงทะเบียนเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ")
              store.state.isloopenForm = true
              store.state.isreopenForm = false
            } else {
              alert("ลงทะเบียนไม่สำเสร็จ")
            }
          })
          .catch((error) => {console.error(error)})
      } else {
        alert("กรูณากรอก Password ให้ตรงกัน")
      }
    },
    addAvatar(event) {
      this.form.avatar = event.target.files[0]
    },
    openForm() {
      store.reopenForm()
    },
    closeForm() {
      store.recloseForm()
    },
  },
}
</script>

<style>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  padding: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(255, 255, 255, 0.001);
  margin-top: 10px;
}
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 16px;
}
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.relobuttonmain{
  border: 1px solid #d0d0d4;
  background-color: #ffffff;
  padding: 10px 100px;
  border-radius: 24px;
  color: #1d9bf0;
  font-weight: bold;
  cursor: pointer;
  margin: 10px 180px;
  font-size: 16px;
}
.relobuttonmain:hover{
  border: 1px solid #1d9bf0
}
.formrelo{
  display: grid;
  grid-template-columns: 30% 70%;
}
.relobuttondiv{
  text-align: center;
}
.relobuttondiv{
  display: grid;
  grid-template-columns: 49% 49%;
  grid-gap: 2%;
  margin-top: 10px;
}
.relobutton {
  border: 1px solid #d0d0d4;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 24px;
  color: #1d9bf0;
  font-weight: bold;
  cursor: pointer;
}
.relobutton:hover {
  border: 1px solid #1d9bf0
}
.relop{
    font-size: 24px;
  font-weight: bolder;
  text-align: center;
}
.inputrelo{
  width: 100%;
  padding: 10px;
  margin: 5px 0 22px 0;
  margin: 1px 0 2px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
.inputrelo:focus {
  background-color: #ddd;
  outline: none;
}
</style>