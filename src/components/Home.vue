<template>
    <div>
        <div>
            <input type="text" placeholder="ทวิตอะไรหน่อยสิ" v-model="texttwit">
            <button @click="twit()">ทวิตอะไรหน่อยสิ</button>
        </div>
        <div>
            <div v-for="twit in twitters" :key="twit.id">
                <p>{{twit.text}}</p>
                <p>{{twit.author.username}}</p>
                <img :src="$root.state.url+twit.author.avatar" class="pictwit">
                <p>{{twit.createdAt}}</p>
                <p>{{twit.likes.length}}</p>
                <p>_______________________</p>
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
        },
        test(){
            alert(Math.ceil(10/3))
        }

    }
}
</script>

<style>
.pictwit{
    width: 200px;
}
</style>