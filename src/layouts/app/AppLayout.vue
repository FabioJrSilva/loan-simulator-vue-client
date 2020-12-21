<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs centered class="ml-n9" color="primary">
        <v-tab v-for="(link, index) in links" :key="index">
          {{ link.title }}
        </v-tab>
      </v-tabs>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="primary" size="35" v-bind="attrs" v-on="on">
            <span class="white--text subtitle">{{
              UserService.getUser().name[0]
            }}</span>
          </v-avatar>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar color="primary" size="35">
                  <span class="white--text subtitle">{{
                    UserService.getUser().name[0]
                  }}</span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  UserService.getUser().name
                }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn color="primary" text @click="logout">Sair</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AuthService from '@/modules/auth/services/AuthService';
import UserService from '@/modules/auth/services/UserService';

export default {
  name: 'AppLayout',

  computed: {
    customByRoute() {
      if (typeof this.customizations[this.$route.fullPath] !== 'undefined') {
        return this.customizations[this.$route.fullPath].color;
      }

      return '';
    },
  },

  data() {
    return {
      UserService,

      custom: {
        color: '',
        route: '',
      },

      menu: false,

      links: [
        {
          title: 'Home',
          route: { name: 'auth.home' },
        },

        // {
        //   title: 'Dashboard',
        //   route: { name: 'auth.home' },
        // },

        // {
        //   title: 'Sou Feliz',
        //   route: { name: 'auth.home' },
        // },
      ],

      customizations: {
        '/': {
          color: 'blue-grey lighten-5',
        },
      },
    };
  },

  methods: {
    logout() {
      AuthService.signOut();
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
