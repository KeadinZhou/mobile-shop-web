<template>
  <div id="app">
    <div id="page-top"></div>
    <router-view/>
    <page-foot></page-foot>
  </div>
</template>

<script>
  import PageFoot from '@/components/page-foot'
  export default {
    name: 'App',
    components: {
      'page-foot': PageFoot
    }
  }
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    text-decoration: none;
    list-style-type: none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: rgb(242,242,242)
  }
</style>
