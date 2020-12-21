<template>
  <v-dialog v-model="dialog" width="500" persistent v-if="messages.length">
    <v-card loader-height="3">
      <v-card-title>
        <span class="font-weight-medium">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-alert dense outlined type="error" :icon="false">
          <v-list>
            <v-list-item
              v-for="(message, index) in messages"
              :key="index"
              v-html="message"
            ></v-list-item>
          </v-list>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AlertDialog',

  props: {
    title: {
      type: String,
      default: 'Atenção!',
    },

    dialog: {
      type: Boolean,
      default: false,
    },

    messages: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    close() {
      this.$emit('close', false);
    },
  },
};
</script>
