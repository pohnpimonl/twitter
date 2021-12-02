<template>
  <div>
    <button onclick="document.getElementById('id02').style.display='block'" style="width: auto">เข้าสู่ระบบ</button>
    <div id="id02" class="modal_">
      <span onclick="document.getElementById('id02').style.display='none'" class="close_" title="Close Modal" >&times;</span>
      <form @submit.prevent="login()" class="modal-content_">
        <div class="container_">
          <h1>Log-In</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label for="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" v-model="username" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" v-model="password" required />

          <div class="clearfix_">
            <!-- <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn">Cancel</button> -->
            <button type="submit" class="signinbtn">เข้าสู่ระบบ</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '../store'
const host ='https://camt-twitterapi.pair-co.com'
export default {
  data(){
    return{
      username:'aweqaweq',
      password:'123456',
    }
  },
  methods:{
    login(){
      const data ={
        username:this.username,
        password:this.password
      }
      const loginURL = `${host}/login`
      fetch(loginURL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(response=>{if(response.status===401){alert('Username หรือ Password ไม่ถูกต้อง')}else{return response.json()}})
      .then(data=>{store.setLoginToken(data.token)
      store.state.isMainpage=false})
      .catch(error => {console.error(error)})
    }
  }
}
var modal = document.getElementById("id02")
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}
</script>

<style>
input[type="text"],
input[type="password"],
input[type="tel"],
input[type="email"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus {
  background-color: #ddd;
  outline: none;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

.cancelbtn,
.signinbtn {
  float: left;
  width: 50%;
}

.container_ {
  padding: 16px;
}

.modal_ {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #474e5d;
  padding-top: 50px;
}

.modal-content_ {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 80%;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.close_ {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close_:hover,
.close_:focus {
  color: #f44336;
  cursor: pointer;
}

.clearfix_::after {
  content: "";
  clear: both;
  display: table;
}

@media screen and (max-width: 300px) {
  .cancelbtn,
  .signinbtn {
    width: 100%;
  }
}
</style>