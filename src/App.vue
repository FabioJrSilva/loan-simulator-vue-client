<template>
  <component :is="layout"></component>
</template>

<script>
import layouts from './config/layouts';

export default {
  name: 'App',
  computed: {
    layout() {
      const { layout } = this.$route.meta;

      if (_.has(layouts, layout)) {
        return layouts[layout];
      }

      return false;
    },
  },
};
</script>
