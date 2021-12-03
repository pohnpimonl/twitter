<template>
  <div>
    <button class="relobutton" @click="openForm()"><span>ลงทะเบียน</span></button>
    <div class="modal" :style="{ display: $root.state.isreopenForm ? 'block' : 'none' }" >
      <div class="modal-content">
        <span class="close" @click="closeForm()">&times;</span>
        <p>ลงทะเบียน</p>
        <form @submit.prevent="register()">
          <div>
            <label for="avatar">รูป</label>
            <input type="file" />
          </div>
          <div>
            <label for="firstname">Firstname</label>
            <input type="text" placeholder="Enter Firstname" name="firstname" v-model="form.firstname" required />
          </div>
          <div>
            <label for="lastname">Lastname</label>
            <input type="text" placeholder="Enter Lastname" name="lastname" v-model="form.lastname" required />
          </div>
          <div>
            <label for="phoneNumber">PhoneNumber</label>
            <input type="tel" placeholder="Enter PhoneNumber" name="phoneNumber" v-model="form.phoneNumber" required />
          </div>
          <div>
            <label for="email">E-Mail</label>
            <input type="email" placeholder="Enter E-Mail" name="email" v-model="form.email" required />
          </div>
          <div>
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username" name="username" v-model="form.username" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" v-model="form.password" required />
          </div>
          <div>
            <label for="password_">Re-Password</label>
            <input type="password" placeholder="Enter Re-Password" name="password_" v-model="form.password_" required />
          </div>
          <div>
            <button type="submit">ลงทะเบียน</button>
            <button type="button" @click="closeForm()">ยกเลิก</button>
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
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.relobutton {
  background-color: #2196F3;
    border: none;
    border-radius: 16px;
  color: white;
  padding: 14px 28px;
  font-size: 24px;
  font-weight: bolder;
  cursor: pointer;
}
.relobutton:hover {
  background: #0b7dda;
}
</style>