<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-card>
          <v-card-title
            >Preencha o formulário de simulação simulação!</v-card-title
          >

          <AlertDialog
            v-if="error.dialog"
            :dialog="error.dialog"
            :messages="error.messages"
            @close="error.dialog = $event"
          />

          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <v-form
                class="mt-5"
                lazy-validation
                @submit.prevent="handleSubmit(save)"
              >
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      name="name"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <v-text-field
                        label="Nome completo"
                        autocomplete="off"
                        outlined
                        dense
                        :hide-details="!failed"
                        v-model="simulation.name"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xl="6" lg="6">
                    <ValidationProvider
                      name="cpf"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <v-text-field
                        label="CPF"
                        v-mask="'###.###.###-##'"
                        autocomplete="off"
                        outlined
                        dense
                        :hide-details="!failed"
                        v-model="simulation.cpf"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xl="6" lg="6">
                    <MaskMoney :key="rerender" v-model="simulation" />
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xl="6" lg="6">
                    <DatePickerMenu
                      v-model="simulation.date_birth"
                      @alterDate="simulation.date_birth = $event"
                      :label="'Data de Nascimento'"
                      :placeholder="'Data de Nascimento'"
                      :outlined="true"
                      :dense="true"
                    />
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xl="6" lg="6">
                    <ValidationProvider
                      name="period"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <v-select
                        :items="periods"
                        label="Quantidade de parcelas"
                        autocomplete="off"
                        outlined
                        dense
                        :hide-details="!failed"
                        v-model="simulation.period"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xl="6" lg="6">
                    <ValidationProvider
                      name="purpose"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <v-select
                        :items="categories"
                        item-text="name"
                        item-value="name"
                        label="Propósito"
                        autocomplete="off"
                        outlined
                        dense
                        v-model="simulation.purpose"
                        :hide-details="!failed"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xl="6" lg="6">
                    <ValidationProvider
                      name="sex"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <v-select
                        :items="sexs"
                        label="Sexo"
                        item-value="id"
                        item-text="name"
                        autocomplete="off"
                        outlined
                        dense
                        v-model="simulation.sex"
                        :error="errors.length > 0"
                        :hide-details="!failed"
                        :error-messages="errors[0]"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn small text @click="clearForm">Limpar</v-btn>

                    <v-btn
                      small
                      class="ml-2"
                      color="secondary"
                      text
                      type="submit"
                      :loading="loading"
                      >Enviar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import storeSimulation from '../services/SimulatorService';
import getCategories from '../services/CategoryService';

export default {
  name: 'Simulator',

  components: {
    AlertDialog: () => import('@/components/AlertDialog'),
    MaskMoney: () => import('@/components/Money/MaskMoney'),
    DatePickerMenu: () =>
      import('@/components/vuetify/datetime/DatePickerMenu'),
  },

  data() {
    return {
      loading: false,
      error: {
        dialog: false,
        messages: [],
      },

      periods: [6, 12, 18, 24],

      categories: [],

      sexs: [
        {
          id: 'm',
          name: 'Masculino',
        },

        {
          id: 'f',
          name: 'Feminino',
        },
      ],

      rerender: 0,

      simulation: {
        name: null,
        cpf: null,
        amount: null,
        date_birth: null,
        period: null,
        purpose: null,
        sex: null,
      },
    };
  },

  mounted() {
    getCategories().then((res) => {
      this.categories = res.data.found;
    });
  },

  methods: {
    save() {
      this.error.dialog = false;
      this.error.messages = [];

      storeSimulation(this.simulation)
        .then(() => {
          this.clearForm();
          this.$toastr.Add({
            name: 'updateToast',
            msg: 'Salvo com sucesso!',
            clickClose: true,
            timeout: 5000,
            position: 'toast-bottom-right',
            type: 'success',
            preventDuplicates: true,
          });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.error.messages = err.response.data.message;
            this.error.dialog = true;
          }
        });
    },

    clearForm() {
      this.simulation = {
        name: null,
        cpf: null,
        amount: null,
        date_birth: null,
        period: null,
        purpose: null,
        sex: null,
      };
      this.rerender += 1;
      this.$refs.form.reset();
    },
  },
};
</script>
