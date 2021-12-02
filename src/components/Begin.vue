<template>
  <div>
    <div class="row">
      <div class="column">
        <img :src="$root.state.bgbegin" style="width: 10%" />
      </div>
      <div class="column">
        <div><register/></div>
        <div><loginn/></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loginn from './Loginn.vue'
import Register from './Register.vue'
export default {
  components: { Register, Loginn, },

}
</script>

<style>
</style>