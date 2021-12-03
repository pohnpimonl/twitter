<template>
  <div>
    <div class="sidenav">
      <router-link to="/"><button>Home</button></router-link>
      <router-link to="/profile"><button>Profile</button></router-link>
      <button>More</button>
      <button>Logout</button>
      {{ceilt}}
      
      <div class="usermain">
        <div v-for="(user,i) in listUser" :key="i" class="user">
          <img @click="getUser(user._id)" :src="$root.state.url+user.avatar">
          <p>{{user.firstname}}</p>
          <p>@{{user.username}}</p>
          {{user.followers.length}}
            <button @click="follow(user.firstname,user._id)">Follow</button>
            <button @click="unfollow(user.firstname,user._id)" >Unfollow</button>
        </div>
        <div class="modal" :style="{ display: $root.state.isgeopenForm ? 'block' : 'none' }">
          <div class="modal-content">
            <span class="close" @click="gecloseForm()">&times;</span>
            <img :src="$root.state.url+users.avatar" class="picuser">
            <p>firstname : {{users.firstname}}</p>
            <p>lastname : {{users.lastname}}</p>
            <p>phoneNumber : {{users.phoneNumber}}</p>
            <p>email : {{users.email}}</p>
            <p>followings : </p>{{users.followings}}
            <p>followers : </p>{{users.followers}}
            <button @click="getusertwit(users._id)">เรียกดูทวิต</button>
            <button @click="gecloseForm()">Close</button>
          </div>
        </div>
        <div class="modal" :style="{ display: $root.state.istwopenForm ? 'block' : 'none' }">
          <div class="modal-content">
            <span class="close" @click="twcloseForm()">&times;</span>
            <div v-for="texttw in texttwit" :key="texttw.id">
              <p>{{texttw.text}}</p>
              {{texttw.likes.length}}
              <p>{{texttw.createdAt}}</p>
              <p>--------------</p>
            </div>
            <button v-for="index in ceilt" :key="index" @click="onChangePage(index)" class="butpage">{{index}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import store from "../store"
const host = "https://camt-twitterapi.pair-co.com"
export default {
  data(){
    return{
      listUser:[],
      users:[],
      userfirstname:'', 
      userId:'',
      myId:'',
      texttwit:[],
      limit:5,
      total:0,
      pageNumber:1,
      ceilt:0
    }
  },
  mounted(){
    this.getListUser(),
    this.getMyid()
  },
  methods:{
    getListUser(){
      const getListUserURL = `${host}/users`
      fetch(getListUserURL,{method:'GET'})
      .then(respone=>respone.json())
      .then(data=>{this.listUser=data})
    },
    getUser(id){
      store.state.isgeopenForm=true
      this.userId=id
      const getUserURL = `${host}/users/${this.userId}`
      fetch(getUserURL,{method:'GET'})
      .then(respone=>respone.json())
      .then(data=>{this.users=data})
    },
    getMyid(){
      const compareIdURL = `${host}/me`
      fetch(compareIdURL,{method:'GET',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`}})
      .then(response=>response.json())
      .then(data=>{this.myId=data._id})
    },
    follow(user,id){
      this.userId=id
      this.userfirstname=user
      const followURL = `${host}/users/${this.userId}/follows`
      fetch(followURL,{method:'POST',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`}})
      .then(response=>{if (response.status >= 200 && response.status < 300){
        alert('Follow'+this.userfirstname+'เรียบร้อยแล้ว')
        this.getListUser()
      }})
    },
    unfollow(user,id){
      this.userId=id
      this.userfirstname=user
      const unfollowURL = `${host}/users/${this.userId}/unfollows`
      fetch(unfollowURL,{method:'POST',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`}})
      .then(response=>{if (response.status >= 200 && response.status < 300){
        alert('Unfollow'+this.userfirstname+'เรียบร้อยแล้ว')
        this.getListUser()
      }})
    },
    getusertwit(id){
      store.state.istwopenForm=true
      this.userId=id
      const getusertwitURL = `${host}/tweets/${this.userId}?limit=${this.limit}&offset=${this.pageNumber-1}`
      fetch(getusertwitURL,{method:'GET'})
      .then(respone=>respone.json())
      .then(data=>{
        this.texttwit=data.data
        this.total = data.total
        this.ceilt = Math.ceil(this.total/this.limit)
      })
    },
      onChangePage(pageNumber){
      this.pageNumber=pageNumber
      
    },
    gecloseForm(){
      store.gecloseForm()
    },
        twcloseForm(){
      store.twcloseForm()
    }
  }
}
</script>

<style>
.sidenav {
  height: 100%;
  width: 25%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: gray;
  overflow-x: hidden;
  padding-top: 20px;
}
.sidenav button {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  color: #818181;
  display: block;
}
.sidenav button:hover {
  color: #f1f1f1;
}
.main {
  margin-left: 25%;
  font-size: 28px;
  padding: 0px 10px;
}
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav button {
    font-size: 18px;
  }
}
.usermain{
  display: grid;
  grid-template-columns: 19% 19% 19% 19% 19%;
  grid-gap: 1%;
}
.user img,.picuser{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>