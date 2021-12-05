<template>
  <div>
    <div class="sidenav">
      <div class="logo"> 
        <router-link to="/"><img :src="$root.state.logo"/></router-link>
      </div>
      <div class="homebutton">
        <router-link to="/"><button>Home</button></router-link>
      </div>
      <div class="profilebutton">
        <router-link to="/profile"><button>Profile</button></router-link>
      </div>
      <div class="morebutton">
        <button>More</button>
      </div>
      <div class="logoutbutton">
        <button>Logout</button>
      </div>
      <div class="sidenav2">
        <div class="whotofollow">
          <div class="whotofollow1">
            <p>Who to follow</p>
          </div>
          <div class="whotofollow2">
            <div class="witem1"><img :src="$root.state.url+listUser[0].avatar"></div>
            <div class="witem2">{{listUser[0].firstname}}</div>
            <div class="witem3">@{{listUser[0].username}}</div>
            <div class="witem4"><p>Followings</p>{{listUser[0].followings.length}}</div>
            <div class="witem5"><p>Followers</p>{{listUser[0].followers.length}}</div>
            <div class="witem6"><button>Follow</button></div>
          </div>
          <div class="whotofollow2">
            <div class="witem1"><img :src="$root.state.url+listUser[1].avatar"></div>
            <div class="witem2">{{listUser[1].firstname}}</div>
            <div class="witem3">@{{listUser[1].username}}</div>
            <div class="witem4"><p>Followings</p>{{listUser[1].followings.length}}</div>
            <div class="witem5"><p>Followers</p>{{listUser[1].followers.length}}</div>
            <div class="witem6"><button>Follow</button></div>
          </div>
          <div class="whotofollow2">
            <div class="witem1"><img :src="$root.state.url+listUser[2].avatar"></div>
            <div class="witem2">{{listUser[2].firstname}}</div>
            <div class="witem3">@{{listUser[2].username}}</div>
            <div class="witem4"><p>Followings</p>{{listUser[2].followings.length}}</div>
            <div class="witem5"><p>Followers</p>{{listUser[2].followers.length}}</div>
            <div class="witem6"><button>Follow</button></div>
          </div>
          <div class="whotofollow2">
            <div class="witem1"><img :src="$root.state.url+listUser[3].avatar"></div>
            <div class="witem2">{{listUser[3].firstname}}</div>
            <div class="witem3">@{{listUser[3].username}}</div>
            <div class="witem4"><p>Followings</p>{{listUser[3].followings.length}}</div>
            <div class="witem5"><p>Followers</p>{{listUser[3].followers.length}}</div>
            <div class="witem6"><button>Follow</button></div>
          </div>
          <router-link to="/suggested"><div class="whotofollow3"><p>Show more</p></div></router-link>
        </div>
        <!-- <div class="usermain">
          <div v-for="(user,i) in listUser" :key="i" class="user">
          <img @click="getUser(user._id)" :src="$root.state.url+user.avatar">
          <p>{{user.firstname}}</p>
          <p>@{{user.username}}</p>
          {{user.followers.length}}
            <button @click="follow(user.firstname,user._id)">Follow</button>
            <button @click="unfollow(user.firstname,user._id)" >Unfollow</button>
        </div>
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
        </div> -->
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
  width: 420px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  border-right: 1px solid #e7e7e9;
}
.logo{
  margin: 15px 0 0;
  height: 35px;
  padding: 0 175px;
}
.logo img{
  height: 100%;
}
.homebutton{
  margin: 12px 0 0;
}
.profilebutton,
.morebutton,
.logoutbutton{
  margin: 8px 0 0;
}
.homebutton button,
.profilebutton button,
.morebutton button,
.logoutbutton button{
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  padding: 6px 40px;
  font-size: 24px;
  margin-left: 140px;
  border-radius: 24px;
}
.homebutton button:hover,
.profilebutton button:hover,
.morebutton button:hover,
.logoutbutton button:hover{
  background-color: #e7e7e9;
}
.sidenav2{
  margin: 16px 0 0;
}
.whotofollow{
  background-color: #eff1f0;
  margin: 30px 32px 0;
  border-radius: 16px;
}
.whotofollow1{
  height: 50px;
  font-size: 20px;
  padding: 8px 0 0 16px;
}
.whotofollow2{
  height: 72px;
  display: grid;
  grid-template-columns: 23% 27% 25% 25%;
  border: 1px solid #e7e7e9;
}
.whotofollow2:hover{
  background-color: #e7e7e9;
}
.witem1 {
  grid-row: 1 / span 2;
  text-align: center;
  padding-top: 12px;
}
.witem1 img{
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
}
.witem2 {
  grid-row: 1;
  padding: 10px 0 0 20px;
}
.witem3 {
  grid-row: 2;
}
.witem4 {
  grid-row: 1;
  font-size: 10px;
  text-align: center;
}
.witem5{
  font-size: 10px;
  text-align: center;
}
.witem6 {
  grid-row: 1 / span 2;
  padding: 20px 0 0;
}
.witem6 button{
  color: #ffffff;
  background-color: #000000;
  border: none;
  font-size: 14px;
  padding: 5px 18px;
  border-radius: 24px;
  cursor: pointer;
}
.whotofollow3{
  height: 54px;
  padding: 8px 0 0 16px;
  cursor: pointer;
}
.whotofollow3:hover{
  background-color: #e7e7e9;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}
.usermain{
  margin: 8px 0 0;
  display: grid;
  grid-template-columns: 19% 19% 19% 19% 19%;
  grid-gap: 1%;
}
.user img,.picuser{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.main {
  margin-left: 410px;
  padding: 0px 10px;
}
</style>