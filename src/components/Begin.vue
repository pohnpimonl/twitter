<template>
  <div>
    <div class="firstbegin">
      <div>
        <img :src="$root.state.bgbegin"/>
      </div>
      <div class="secondbegin">
        <div class="secondbegin1">กำลังเกิดขึ้นตอนนี้</div>
        <div class="secondbegin2">เข้าร่วมทวิตเตอร์วันนี้</div>
        <div><register /></div>
        <div class="secondbegin2">มีบัญชีผู้ใช้อยู่แล้วใช่ไหม</div>
        <div><loginn /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loginn from "./Loginn.vue"
import Register from "./Register.vue"
export default {
  components: { Register, Loginn },
}
</script>

<style>
.firstbegin{
  display: grid;
  grid-template-columns: 855px 650px;
}
.firstbegin div img{
  width: 100%;
}
.secondbegin1{
  font-size: 64px;
  font-weight: bolder;
  padding: 96px 0 0;
  text-align: center;
}
.secondbegin2{
  font-size: 40px;
  padding: 80px 0 0;
  text-align: center;
}
</style>