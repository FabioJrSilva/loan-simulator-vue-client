<template>
  <v-container fluid class="fill-height grey lighten-4 tw-w-full">
    <v-row justify="center" align="center">
      <v-sheet width="320" class="transparent">
        <div
          class="tw-bg-white tw-rounded-lg tw-shadow-lg tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4"
        >
          <div class="text-center">
            <h1 class="text-h5 mb-1">Loan Simulator</h1>
            <h2 class="text-body-2 tw-text-gray-700">
              Sua simulação simples e rápida!
            </h2>
          </div>

          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <v-form
              class="mt-5"
              lazy-validation
              @submit.prevent="handleSubmit(authenticate)"
            >
              <v-row no-gutters>
                <v-col cols="12">
                  <ValidationProvider
                    name="e-mail"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      label="E-mail"
                      autocomplete="off"
                      v-model="form.email"
                      :autofocus="!error.hasError"
                      :error="errors.length > 0 || error.hasError"
                      :error-messages="errors[0] || error.message"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-1">
                <v-col cols="12">
                  <ValidationProvider
                    name="senha"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      label="Senha"
                      autocomplete="off"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eyeoff'"
                      @click:append="showPassword = !showPassword"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <router-link
                  :to="'password'"
                  style="text-decoration: none; font-size: 12px"
                  >Esqueceu a senha?</router-link
                >
              </v-row>
              <v-row no-gutters class="mt-5">
                <v-col cols="12">
                  <v-btn block color="primary" type="submit" :loading="loading"
                    >Entrar</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </div>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '@/modules/auth/services/AuthService';

export default {
  name: 'Login',
  data: () => ({
    loading: false,
    showPassword: false,
    error: {
      hasError: false,
      message: null,
    },
    form: {
      email: null,
      password: null,
      remember: true,
    },
  }),

  methods: {
    async authenticate() {
      (async () => {
        this.loading = true;

        await AuthService.signIn(this.form);

        this.$router.push({
          name: 'auth.home',
        });
      })()
        .catch(() => {
          this.error.hasError = true;
          this.error.message = 'Usuário ou senha inválidos.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
