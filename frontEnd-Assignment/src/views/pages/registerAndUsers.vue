<template>
    
    <nav1 />
    <button class="btn btn-success " v-on:click="back"><i class="bi bi-chevron-left"></i>Back</button>
    <br/>
    <em v-if="loading">Loading user...</em>

    <div class=" d-flex justify-content-center"> 
        <h3>User Management</h3>
    </div>
        <div class=" d-flex justify-content-around"> 
            <table class="table " v-if="users.length">
            <thead>
                
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="user in users" :key="user.user_id">
                    <td>{{user.user_id}}</td>
                    <td>{{user.first_name}}</td>
                    <td>{{ user.last_name}}</td>
                </tr>
               
            </tbody>
            </table>


        

        
            <div class="card1 " >
            <form @submit.prevent="handleSubmit"  class="border border-primary" style ="padding: 1%;">
            <h4>Register</h4>
            <div class="row">
                <div class="form-group col-md-6">
                <label for="first_name"> First Name: </label>
                <br /> 
                <input type="text" name="first_name" class="form-control" v-model ="first_name" />
                <div v-show="submitted && !first_name"> Input is required</div>
                <br /> 
                </div>
                <div class="form-group col-md-6">
                <label for="last_name"> Last Name: </label>
                <br /> 
                <input type="text" name="last_name" class="form-control" v-model ="last_name" />
                <div v-show="submitted && !last_name"> Input is required</div>
                <br /> 
                </div>
            </div>
            <div class="form-group">
            <label for="email"> Email: </label>
            <br /> 
            <input type="text" name="email"  class="form-control"  v-model ="email" />
            <div v-show="submitted && !email"> Input is required</div>
            <br /> 
            </div>
            <div class="form-group"></div>
            <label for="password">Password: </label>
            <br /> 
            <input type="password" name="password"  class="form-control" v-model ="password" />
            <div v-show="submitted && !password"> Password is required</div>
            <br />
            <div class ="d-flex justify-content-center">
                <div  v-if ="error">
                {{error}}
                <br/>
                {{error1}}
                <br/>
                {{error2}}
                </div> 
                </div>
                <br />  
            <div class=" d-flex justify-content-center"> 
            <button class="btn btn-success"> Add User <i class="bi bi-check-square"></i></button>

            
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
            users: [],
            first_name:"",
            last_name:"",
            email:"",
            password: "",
            submitted: false,
            loading : true
        }
    },
    mounted(){
        userService.alluser()
        .then(users =>{
            this.users = users
            this.loading =false
        }).catch(error => this.error =error);

    },
    
    methods:{
        handleSubmit(e){
            this.submitted =true
            this.error =""
            this.error1=''  
            this.error2=''

            const {first_name, last_name,email,password} = this
            
            if(!(email && password &&first_name &&last_name)){
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
            
            
            userService
            .addUser(this.first_name, this.last_name, this.email, this.password)
            .then(() =>{
                
                userService.alluser()
                    .then(users =>{
                        this.users = users
                        this.loading =false
                    })
                    .catch(error => this.error =error);

            })
            
            .catch((err) => {
                this.error = err
            })
            alert("User has been added")
            this.first_name="";
            this.last_name="";
            this.email ="";
            this.password ="";
            this.submitted = false;
            
        },
        back(){
                this.$router.push("/dashboard")
            },
      
    },
    components:{
        nav1
    }
 }
</script>