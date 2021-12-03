<template>
  <div>
    <button class="relobutton" @click="openForm()">เข้าสู่ระบบ</button>
    <div class="modal" :style="{ display: $root.state.isloopenForm ? 'block' : 'none' }">
      <div class="modal-content">
        <span class="close" @click="closeForm()">&times;</span>
        <p>เข้าสู่ระบบ</p>
        <form @submit.prevent="login()">
          <div>
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username" name="username" v-model="username" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" v-model="password" required />
          </div>
          <div>
            <button type="submit">เข้าสู่ระบบ</button>
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
      username: "aweqaweq",
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