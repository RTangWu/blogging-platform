<template>
  <!-- <nav1 /> -->
  <div v-if="checklogin">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end !important">
      <button class="btn btn-danger me-md-2"  v-on:click="logout">Logout <i class="bi bi-box-arrow-left"></i></button>
    </div>
  </div>
  <br/>
  <div v-if="checklogin">
  <h3 class ="card-haeder text-center"> Dashboard</h3>
</div>

  <em v-if="loading">Loading articles...</em>
  <div v-if="articles.length" >
    <ul v-for="article in articles" :key="article.article_id">
    <div class=" d-flex justify-content-center">
      <div class="card">
        <div v-if="checklogin">
        <li class="card-body text-center " style="background-color: #e3f2fd;" >
          <router-link :to="'dashboard/article/' +article.article_id">
            {{article.title+ " by " + article.author}}
          </router-link>
          <br/>
            <button class="btn btn-success " v-on:click="deleteArticle(article.article_id)">  Delete <i class="bi bi-x-circle"></i> </button>
            <button class="btn btn-success" v-on:click="setEdit(article.article_id)">  Edit <i class="bi bi-pencil-square"></i> </button>
        </li>
      </div>
      <div v-if="!checklogin">
        <li class="card-body text-center " style="background-color: #e3f2fd;">
        <router-link style="text-decoration: none ;" :to="'/article/' +article.article_id">
          {{article.title+ " by " + article.author}}
        </router-link>
      </li>
      </div>
      </div>
    </div>
    </ul>
  </div>

  <div v-if="error">
    {{error}}
  </div>
  <div v-if="checklogin">
    <div class ="d-flex justify-content-center">
      <div class="card2 border border-primary">
        <form @submit.prevent="handleSubmit" >
          <div v-if="editing">
            <button class="btn btn-success" v-on:click="cancelediting">Cancet <i class="bi bi-trash"></i></button>
          </div>
          <h5 class ="text-center">Add or Edit Article</h5>
          <div class="form-group">
            <label for="title"> Title: </label>
            <br /> 
            <input type="text" name="title"  class="form-control" v-model ="title"/>
            <div v-show="submitted && !title"> Input is required</div>
            <br /> <br/>
          </div>
          <div class="form-group">
            <label for="article"> Article: </label>
            <br /> 
            <textarea type="text" name="article_text"  class="form-control" v-model ="article_text" ></textarea>
            <div v-show="submitted && !article_text"> Input is required</div>
            <br /> <br/>
          </div>
          <div class="form-group">
            <label for="author"> Author: </label>
            <br /> 
            <input type="text" name="author"  class="form-control" v-model ="author" />
            <div v-show="submitted && !author"> Input is required</div>
            <br /> <br/>
          </div>
          <div class ="d-flex justify-content-center">
            <div class="btn">
            <div v-if="!editing">
              <button  class="btn btn-success" :disabled="editing"> Add <i class="bi bi-check-square"></i></button>
              <div v-if ="error">{{ error}}</div>
            </div>
          
          
            <div v-if="editing">
              <button class="btn btn-success" :disabled="!editing"> Update <i class="bi bi-cloud-arrow-up"></i></button>
              <div v-if ="error">{{ error}}</div>
            </div>
          </div>
        
  
          </div>

          
        </form>
      </div>
    </div>
  </div>
    </template>
    
    <script>
     import { articleService } from '../../services/article.service';
     import{userService} from '../../services/user.service'; 
    //  import nav1 from '../components/nav1.vue';
     export default {
        data(){
          return{
            articles: [],
            error:"",
            article_text:"",
            title:"",
            author:"",
            error:"",
            editing:false,
            loading:true,
            
            submitted:false,
                
            
          }
        },
        created(){
          articleService.getAll()
          .then(articles =>{
          this.articles =articles
          this.loading =false
         })
          .catch(error => this.error =error);
        },
        mounted(){

          const lg=localStorage.getItem('session_token');

          if(lg){
          this.checklogin=true
          }
          else {
          this.checklogin=false
          }

        },
        methods:{
            handleSubmit(e){
              if(!(this.editing)){
                this.submitted =true
                this.error = ""
                const {article_text , title, author} = this
    
                if(!(article_text && title &&author)){
                    return;
                }
                
                articleService
                .addArticle( this.title, this.article_text, this.author)
                .then(()=>{
                  articleService.getAll()
                  .then(articles =>{
                  this.articles =articles
                  this.loading =false
                  })
                  .catch(error => this.error =error);

                })
                .catch((err) => {
                this.error = err
                })
                
                
                this.title="";
                this.article_text="";
                this.author="";
                this.submitted = false; 
                alert("Article has been added")

              }else{
                this.submitted =true
                this.error = ""
                const {article_text , title, author} = this
    
                if(!(article_text && title &&author)){
                    return;
                }
                
                articleService
                .updateArticle(this.article_id,this.title, this.article_text, this.author)
                .then(()=>{
                  articleService.getAll()
                  .then(articles =>{
                  this.articles =articles
                  this.loading =false
                  })
                  .catch(error => this.error =error);

                })
                .catch((err) => {
                this.error = err
                })
                
                this.editing=false;
                this.title="";
                this.article_text="";
                this.author="";
                this.submitted = false; 
                alert("The article has been edited")
              }
                   
    
            },
            deleteArticle(article_id) {
              articleService.deleteArticle(article_id)
              .then(()=>{
                articleService.getAll()
                  .then(articles =>{
                  this.articles =articles
                  this.loading =false
                  })
                  .catch(error => this.error =error);

              })
              .catch((err) => {
                this.error = err
               })
               alert("Article has been removed")
              },

              logout(){
              userService.logout()
              .then(result =>{
              console.log("Auth - go to home")
              this.$router.push("/")
              })
              .catch(error =>{
              this.error=error;
              this.loading=false;
              })
              alert("You have been successfully logged out")
              },
              
              cancelediting(){
                this.title="";
                this.article_text="";
                this.author="";
              this.submitted = false; 
              this.editing=false

              },
              setEdit(article_id){
                this.submitted = false; 
                this.editing=true;
                articleService.getOne(article_id)
                .then((article)=>{
                     this.title = article.title;
                     this.article_text =article.article_text;
                     this.author=article.author;
                     this.article_id=article.article_id;

                })
                .catch(error =>{
                this.error=error;
                this.loading=false;
                })
              }
        },
        // components:{
        //   nav1
        // }
      }
    </script>