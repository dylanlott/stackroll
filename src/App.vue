<template>
  <v-app dark id="app">
    <v-content>
      <v-container id="container">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'stackroll_home'
}
</script>
<style lang="stylus" scope>
#container
  max-width: 550px
  padding: 8px
</style>
