<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :disabled="disabled"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <ValidationProvider
          :name="label"
          :rules="rules"
          v-slot="{ errors, failed }"
        >
          <v-text-field
            v-model="dateFormatted"
            :disabled="disabled"
            :label="label"
            persistent-hint
            :placeholder="placeholder"
            :dense="dense"
            readonly
            :solo="solo"
            @blur="format = parseDate(dateFormatted)"
            v-on="on"
            :outlined="outlined"
            :hide-details="!failed"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            append-icon="mdi-calendar"
          ></v-text-field>
        </ValidationProvider>
      </template>
      <v-date-picker
        :locale="locale"
        :allowed-dates="allowedDates"
        v-model="format"
        @change="alterDate"
        no-title
        :disabled="disabled"
        clearable
        @input="menu = false"
        :min="min"
      >
        <div class="flex-grow-1"></div>
        <v-btn text color="primary" @click="alterDate('')">Limpar</v-btn>
        <v-btn text color="primary" @click="menu = false">Aplicar</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },

    locale: {
      type: String,
      default: 'pt-br',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: 'Data',
    },

    placeholder: {
      type: String,
      default: 'Selecione uma data...',
    },

    rules: {
      type: String,
      default: 'required',
    },

    dense: {
      type: Boolean,
      default: false,
    },

    solo: {
      type: Boolean,
      default: false,
    },

    outlined: {
      type: Boolean,
      default: false,
    },

    allowedDates: {
      type: Function,
      default() {
        return () => {};
      },
    },

    min: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      dateComponent: null,
      dateFormatted: null,
      menu: false,
    };
  },

  computed: {
    format: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dateFormatted = this.formatDate(this.value);
        return this.dateComponent;
      },

      set(newDate) {
        this.dateComponent = newDate;
        this.dateFormatted = this.formatDate(newDate);
        this.$emit('input', newDate);
      },
    },
  },

  created() {
    this.dateComponent = this.value;
  },

  methods: {
    alterDate(date) {
      this.$emit('alterDate', date);
      this.menu = false;
    },

    formatDate(date) {
      if (!date) return null;

      const format = date;

      const [year, month, day] = format.split('-');
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const format = date;

      const [day, month, year] = format.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
  },
};
</script>
