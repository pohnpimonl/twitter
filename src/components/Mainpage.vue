<template>
  <div>
    <div class="row">
      <div class="column left">
        <router-link to="/"><button>Home</button></router-link>
        <router-link to="/profile"><button>Profile</button></router-link>
        <button>Logout</button>
        <div class="dropdown">
        <button @click="myFunction()" class="dropbtn">More</button>
        <div id="myDropdown" class="dropdown-content">
          <a href="#">ลบบัญชีผู้ใช้</a>
        </div>
      </div>
      </div>
      <div class="column middle">
        <router-view />
      </div>
      <div class="column right">
        <h2>Column 3</h2>
        <p>Some text..</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
  },
};
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.column {
  float: left;
  padding: 10px;
  height: 3000px;
  overflow: auto;
}
.left,
.right {
  width: 25%;
  background-color: #f1f1f1;
}
.middle {
  width: 50%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
p {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
.sidebar p.active {
  background-color: #04aa6d;
  color: white;
}
.sidebar p:hover:not(.active) {
  background-color: #555;
  color: white;
}
.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.dropbtn:hover,
.dropbtn:focus {
  background-color: #2980b9;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
.show {
  display: block;
}
</style>