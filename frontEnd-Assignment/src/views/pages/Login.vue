<template>
  <nav1 />
  <h3 class ="d-flex justify-content-center">Login</h3>
    <div class ="d-flex justify-content-center">
      <div class="card2 border border-primary">
        <form @submit.prevent="handleSubmit" >
          <div class="form-group">
            <label for="email">Email: </label>
            <input type="email" name="email"  class="form-control" v-model ="email" />
            <div v-show="submitted && !email"> Email is required</div>
            <br /><br />
          </div>
          <div class="form-group">
            <label for="password">Password: </label>
            <input type="password" name="password"  class="form-control" v-model ="password" />
            <div v-show="submitted && !password"> Password is required</div>
            <br /><br />
          </div> 
          <div class ="d-flex justify-content-center">
          <div  v-if ="error">
          {{error}}
          <br/>
          {{error1}}
          <br/>
          {{error2}}
          </div> 
        </div>
          <br /><br />
          <div class ="d-flex justify-content-center">
            <button class ="btn btn-success"> Login  <i class="bi bi-box-arrow-in-right"></i></button>
            
          </div> 
        </form> 
      </div>
      
      
    </div>
    
</template>

<script>
import * as EmailValidator from "email-validator";
import{userService} from '../../services/user.service';
import nav1 from '../components/nav1.vue';
  export default{
    data(){
      return{
        email: "",
        password:"",
        submitted: false
      }
    },
  methods:{
    handleSubmit(e){
      this.submitted =true
      this.error = ""
      this.error1 =""
      this.error2=""
      const {email , password} = this

      if(!(email && password)){
      return;
      }
      if(!(EmailValidator.validate(email))){
      this.error = "Email must be a valid email"
      this.email ="";
      this.submitted = false;
      return;
      }
      const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+-@$!%*?&])[A-Za-z\d+-s@$!%*?&]{8,12}$/;
      if(!(password_pattern.test(password))){
      this.error = '8 - 12 characters long'
      this.error1=' 1 uppercase & 1 lowercase'  
       this.error2=' 1 number and 1 special'
      this.password ="";
        this.submitted = false;
      return;
      }
      alert("You have successfully signed into your account")
      userService.login(email,password)
      .then(result =>{
        console.log("Auth - go to dash")
        this.$router.push("/dashboard")
      })
      .catch(error =>{
        this.error=error;
        this.loading=false;
      })

      

       this.email ="";
       this.password ="";
        this.submitted = false;

    }

     
  
  },
  components:{
    nav1
  }

}
</script>