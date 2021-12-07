<template>
  <div>
    <div>
      <button class="relobuttonmain" @click="openForm()">เข้าสู่ระบบ</button>
    </div>
    <div class="modal" :style="{ display: $root.state.isloopenForm ? 'block' : 'none' }">
      <div class="modal-content">
        <span class="close" @click="closeForm()">&times;</span>
        <p class="relop">เข้าสู่ระบบ</p>
        <form @submit.prevent="login()">
          <div class="formrelo">
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username" class="inputrelo" v-model="username" required />

            <label for="password">Password</label>
            <input type="password" placeholder="Enter Password" class="inputrelo" v-model="password" required />
          </div>
          <div class="relobuttondiv">
            <button class="relobutton" type="submit">เข้าสู่ระบบ</button>
            <button  class="relobutton" type="button" @click="closeForm()">ยกเลิก</button>
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
      username: "joyuser01",
      password: "123456",
    };
  },
  methods: {
    login() {
      const data = {
        username: this.username,
        password: this.password,
      }
      const loginURL = `${host}/login`
      fetch(loginURL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then((response) => {
          if (response.status === 401) {
            alert("Username หรือ Password ไม่ถูกต้อง")
          } else {
            return response.json()
          }
        })
        .then((data) => {
          store.setLoginToken(data.token)
          store.state.isMainpage = false
        })
        .catch((error) => { console.error(error) })
    },
    openForm() {
      store.loopenForm()
    },
    closeForm() {
      store.locloseForm()
    },
  },
}
</script>

<style>
</style>