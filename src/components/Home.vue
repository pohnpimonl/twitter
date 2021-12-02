<template>
  <div>
      <div>
          <input type="text" v-model="texttwit">
          <button @click="twit()">Tweet</button>
      </div>
      <div>
          <div>
              <div v-for="twitter in twitters" :key="twitter.id">
                  <p>{{twitter.text}}</p>
                  <p>{{twitter.author}}</p>
                  <p>{{twitter.likes}}</p>
                  <p>{{twitter.createdAt}}</p>
              </div>
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
            twitters:{},
        }
    },
    mounted(){
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
        }

    }
}
</script>

<style>

</style>