<template>

<nav1 />
  <h3 class ="card-haeder text-center">Welcome to my blog!</h3>
<articleList />

 
</template>

<script>
  import articleList from '../components/articleList.vue'
  import nav1 from '../components/nav1.vue';
  export default {

 
    components: {

   articleList,
   nav1
  }

}
</script>