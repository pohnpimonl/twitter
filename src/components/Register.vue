<template>
  <div>
    <button onclick="document.getElementById('id01').style.display='block'" style="width: auto">ลงทะเบียนบัญชีผู้ใช้ใหม่</button>
    <div id="id01" class="modal">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal" >&times;</span>
      <form @submit.prevent="register()" class="modal-content">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="avatar"><b>Picture</b></label>
          <input type="file" placeholder="Select Picture" name="avatar" @change="addAvatar"/>

          <label for="firstname"><b>Firstname</b></label>
          <input type="text" placeholder="Enter Firstname" name="firstname" v-model="form.firstname" required />

          <label for="lastname"><b>Lastname</b></label>
          <input type="text" placeholder="Enter Lastname" name="lastname" v-model="form.lastname" required />

          <label for="phonenumber"><b>Phone-Number</b></label>
          <input type="tel" placeholder="Enter Phone-Number" name="phonenumber" v-model="form.phoneNumber" required />

          <label for="email"><b>E-Mail</b></label>
          <input type="email" placeholder="Enter E-Mail" name="email" v-model="form.email" required />

          <label for="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" v-model="form.username" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" v-model="form.password_" required />

          <label for="psw-repeat"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" name="psw-repeat" v-model="form.password" required />

          <div class="clearfix">
            <!-- <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button> -->
            <button type="submit" onclick="document.getElementById('id01').style.display='none'" class="signupbtn">ลงทะเบียน</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const host ='https://camt-twitterapi.pair-co.com'
export default {
  data(){
    return{
      form:{
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        password:'',
        password_:'',
        phoneNumber:'',
        avatar:null,
      }
    }
  },
  methods:{
    register(){
      if(this.form.password===this.form.password_){
      const formData = new FormData()
      formData.append('firstname',this.form.firstname)
      formData.append('lastname', this.form.lastname)
      formData.append('email', this.form.email)
      formData.append('username', this.form.username)
      formData.append('password', this.form.password)
      formData.append('phoneNumber', this.form.phoneNumber)
      const registerURL=`${host}/register`
      fetch(registerURL,{method:'POST',body:formData})
      .then(response => {if (response.status >= 200 && response.status < 300) {alert('ลงทะเบียนเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ')} else {alert('fail')}
      })
      .catch(error => {console.error(error)})
      }else{
        alert('กรูณากรอก Password ให้ตรงกัน')
      }
    },
    addAvatar(event) {
      this.form.avatar = event.target.files[0]
    },
  }
}
var modal = document.getElementById("id01")
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
input[type="email"],
input[type="file"] {
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
input[type="email"]:focus,
input[type="file"]:focus {
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
.signupbtn {
  float: left;
  width: 50%;
}

.container {
  padding: 16px;
}

.modal {
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

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 80%;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
* {box-sizing: border-box}
</style>