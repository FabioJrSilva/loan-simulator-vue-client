<template>
  <div>
    <v-text-field
      v-model.lazy="amount"
      label="Preço"
      outlined
      hide-details
      dense
      autocomplete="off"
      v-money="money"
    ></v-text-field>
  </div>
</template>
<script>
import { VMoney } from 'v-money';

export default {
  name: 'MaskMoney',

  props: {
    value: {
      required: true,
      type: Object,
    },
  },

  computed: {
    amount: {
      get() {
        return this.value.amount;
      },

      set(amount) {
        this.value.amount = this.stringToFloat(amount);
      },
    },
  },

  data() {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    };
  },

  methods: {
    stringToFloat(text) {
      return parseFloat(text.replace(/[^0-9\,]/g, '').replace(',', '.'));
    },
  },

  directives: { money: VMoney },
};
</script>
