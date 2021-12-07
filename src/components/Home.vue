<template>
    <div>
        <div class="home">
            <div class="home1">Home</div>
            <div class="home2">
                <div class="h2item1"><img :src="$root.state.url+me.avatar"></div>
                <div class="h2item2"><input type="text" placeholder="What's happening?" v-model="texttwit"></div>
                <div class="h2item3"><button @click="twit()">Tweet</button></div>
            </div>
            <div v-for="twit in twitters" :key="twit._id" class="home3">
                <div class="titem1"><img :src="$root.state.url+twit.author.avatar" class="pictwit"></div>
                <div class="titem2"><p>Post by :@{{twit.author.username}} Date :{{twit.createdAt}}</p></div>
                <div class="titem2"><p>{{twit.text}}{{twit._id}}</p></div>
                <div class="titem2"><p>จำนวน Like :{{twit.likes.length}} <button @click="like(twit._id)">Like</button></p></div>
            </div>            
        </div>
    </div>
</template>

<script>
const host ='https://camt-twitterapi.pair-co.com'
export default {
    data(){
        return{
            texttwit:'',
            twitters:[],
            me:[],
            mylikeid:'',
        }
    },
    mounted(){
        this.getme(),
        this.gettwit()
    },
    methods:{
        twit(){
            const twitURL = `${host}/tweets`
            fetch(twitURL,{method:'POST',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`,'Content-Type':'application/json'},body:JSON.stringify({text:this.texttwit})})
            .then(response=>{if(response.status>=200 && response.status<300){alert('Twit เรียบร้อย'),this.gettwit(),this.texttwit=''}})
            .catch(error => {console.error(error)})
        },
        gettwit(){
            const gettwitURL = `${host}/tweets`
            fetch(gettwitURL,{method:'GET'})
            .then(response=>response.json())
            .then(data=>{this.twitters=data.data})
        },
        getme(){
            const compareIdURL = `${host}/me`
            fetch(compareIdURL,{method:'GET',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`}})
            .then(response=>response.json())
            .then(data=>{this.me=data})
        },
        like(likeid){
            this.mylikeid=likeid
            const likeURL = `${host}/tweets/${this.mylikeid}/likes`
            fetch(likeURL,{method:'POST',headers:{Authorization:`Bearer ${this.$root.state.loginToken}`},})
            // .then(response=>{if(response.status>=200 && response.status<300){alert('Like เรียบร้อย'),this.gettwit()}})
            // .then(response=>response.json())
        },
        test(){
            alert(Math.ceil(10/3))
        }

    }
}
</script>

<style>
.home{
    width: 600px;
    border-right: 1px solid #e7e7e9;
}
.home1{
    height: 54px;
    border-bottom: 1px solid #e7e7e9;
    padding: 15px 0 0 10px;
}
.home2{
    height: 140px;
    border-bottom: 1px solid #e7e7e9;
    display: grid;
    grid-template-columns: 15% 85%;
}
.h2item1{
  grid-row: 1 / span 3;
  padding: 10px 0 0 20px;
}
.h2item1 img{
  height: 49px;
  width: 49px;
  border-radius: 50%;
  background-color: black;
}
.h2item2{
    grid-row: 1 / span 2;
  border-bottom: 1px solid #e7e7e9;
}
.h2item2 input{
    font-size: 24px;
    width: 508px;
    height: 80px;
    border: none;
}
.h2item2 input:focus{
    outline: none;
}
.h2item3{
    padding: 6px 0 0 420px;
}
.h2item3 button{
    color: #ffffff;
    background-color: #1d9bf0;
    border: none;
    font-size: 14px;
    padding: 5px 18px;
    border-radius: 24px;
    cursor: pointer;
}
.home3{
    width: 100%;
    display: grid;
    grid-template-columns: 30% 70%;
    border-bottom: 1px solid #e7e7e9;
}
.titem1{
    grid-row: 1 / span 3;
    padding: 10px 0 0 20px;
}
.pictwit{
  height: 49px;
  width: 49px;
  border-radius: 50%;
  background-color: black;
}
.titem2{
    padding: 10px 0;
}
</style>