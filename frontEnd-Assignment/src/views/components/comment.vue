<template>
<div class ="d-flex justify-content-around">
        <div class="card1">
        <form @submit.prevent="handleSubmit" class="border border-primary" style ="padding: 1%;">
        <h4 class ="d-flex justify-content-center">Comment Area</h4>
        <div class="form-group">
        <label for="comment">Comments:  {{num_comments}}</label>
        <br /> 
        <textarea type="text" name="comment" class="form-control" v-model ="comment_text" ></textarea>
        <div v-show="submitted && !comment_text"> Input is required</div>
        <br /> <br/>
        </div>
        <div class ="d-flex justify-content-center">
        <button class="btn btn-success "> Add  <i class="bi bi-check-square"></i></button>
        </div>
        </form>
        </div>

        <br/>
        <em v-if="loading">Loading comments...</em>
        

        <table class="table " v-if="comments.length">
            <thead>
                
                <tr>
                    <th scope="col">Comment</th>
                    <th scope="col">Date Published</th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="comment in comments" :key="comment.article_id">
                    <td>{{comment.comment_text}}</td>
                    <td>{{comment.date_published}}</td>
                    <div v-if="checklogin">
                        <button class="btn btn-success " v-on:click="deleteComment(comment.comment_id)">Delete <i class="bi bi-x-circle"></i></button>
                    </div>
                   
                </tr>
               
               
            </tbody>
        
        </table>

</div>

</template>

<script>
import{commentService} from '../../services/comment.service';


export default{
    props:{
        article_id:Number,
        
    },
    data(){
        return{
            comments:[],
            num_comments:null, 
            comment_text:"",
            error:"",
            loading:true,
            submitted:false,
            checklogin:"",
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
        commentService.getAll(this.$route.params.id)
                            .then((comments)=>{
                            this.comments=comments;
                            this.num_comments=comments.length
                            this.loading =false
                            
                        }) .catch(error => this.error =error)

    },
    methods:{
        
        deleteComment(comment_id){
            commentService.deleteComment(comment_id)
            .then(()=>{
                commentService.getAll(this.$route.params.id)
            .then((comments)=>{
            this.comments=comments;
            this.num_comments=comments.length
            }) 
            .catch(error => this.error =error)

            }).catch((err) => {
                this.error = err
               })

               alert("Comment has been removed")
            
            },
    handleSubmit(e){
            this.submitted =true
            this.error = ""

            if(!(this.comment_text)){
                return;
            }
            
            commentService
                .addComment(this.$route.params.id, this.comment_text )
                .then(() =>{
                    commentService.getAll(this.$route.params.id)
                            .then((comments)=>{
                            this.comments=comments;
                            this.num_comments=comments.length
                            
                        }) .catch(error => this.error =error)

                })
                .catch((err) => {
                this.error = err
                 })
                            

                
                this.comment_text ="";
                this.submitted = false;
                alert("Comment has been added")
        
           

    

        }

    }

}
</script>