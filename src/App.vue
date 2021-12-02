<template>
  <div>
    <div v-if="$root.state.isMainpage">
      <div><begin/></div>
    </div>
    <div v-else>
      <div><mainpage/></div>
    </div>
  </div>
</template>

<script>
import Begin from './components/Begin.vue'
import Mainpage from './components/Mainpage.vue'

export default {
  components: { Begin, Mainpage},

}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: 'Kanit', sans-serif;
}
</style>