<template>
  <v-app>
    <v-main>
      <v-scroll-x-transition>
        <router-view :key="$route.fullPath"></router-view>
      </v-scroll-x-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
};
</script>
