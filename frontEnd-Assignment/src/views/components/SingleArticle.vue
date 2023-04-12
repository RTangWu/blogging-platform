<template>
    <nav1 />
    <em v-if="loading">Loading articles...</em>
    <div v-if="!checklogin">
    <button class="btn btn-success" v-on:click="goback"> <i class="bi bi-chevron-left"></i>Back </button>
    </div>
    <div v-if="checklogin">
    <button class="btn btn-success" v-on:click="back"><i class="bi bi-chevron-left"></i>Back</button>
    </div>
    <div class ="d-flex justify-content-center">
        <div class="card3" :key="articles.article_id">
            <h1>{{articles.title}}</h1>
            <p3>Written By: {{articles.author}}</p3>
            <br /> <br />  
            <p1>{{articles.article_text}}</p1>
            <br /> <br />  
            <p3>Date Published: {{articles.date_published}}</p3>
            <br /> <br />  <br />  
        </div>
    </div>
    <comment :article_id="articles.article_id" /> 
      
    
    <div v-if="error">
        {{error}}
    </div>
    </template>
    
    <script>
    import { articleService } from '../../services/article.service';
    import comment from './comment.vue';
    import nav1 from './nav1.vue';
    
    
    
    
    export default{
        data(){
            return{
                articles:[],
                error:"",
                loading:true,
                // article_id:null,
    
            }
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
        created(){
            
    
            articleService.getOne(this.$route.params.id)
            .then((article)=>{
                this.articles =article;
                
                this.article_id= article.article_id
                this.loading =false
                })
                
                
                .catch(error => this.error =error)
    
        },
        methods:{
            goback(){
                this.$router.push("/")
    
            },
            back(){
                this.$router.push("/dashboard")
            },
        },
        components: {
    
        comment,
        nav1
        }
    }
    </script>