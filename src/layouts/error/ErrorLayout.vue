<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',

  components: {},
};
</script>

<style></style>
