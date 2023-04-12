<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a  v-if ="!login" class="navbar-brand" href="/">Blog</a>
      <a v-if="login" class="navbar-brand" href="/dashboard">Blog</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        <router-link v-if="!login" class="  nav-link"  to="/"> Home  <i class="bi bi-house-door"></i></router-link>
        <router-link  v-if="!login" class=" nav-link" to="/login">   Login  <i class="bi bi-box-arrow-in-right"></i></router-link>
        <router-link v-if="login" class=" nav-link" to="/dashboard">   Dashboard  <i class="bi bi-gear"></i></router-link>
        <router-link  v-if="login" class=" nav-link" to="/registerAndUsers">   User Management <i class="bi bi-file-person"></i></router-link>
      </div>
       
      </div>
    </div>
  </nav>
  
      <router-view />
    </div>
  </template>
  <script>
  import index from "../../router/index.js"
  
  export default{
    
    data(){
      return{
        login:""
      }
    },
    mounted(){

      const lg=localStorage.getItem('session_token');

      if(lg){
      this.login=true
      }
      else {
      this.login=false
      }

    },
   
   
  //   components:{
  //   index
  // }
  }
  
  </script>