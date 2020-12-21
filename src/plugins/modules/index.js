class ModulesPlugin {
  constructor() {
    this.Vue = null;
    this.options = {
      modules: {},
      vmProperty: '$modules',
    };
  }

  /**
   * Install the plugin with Vue.use(VueModular, options)
   * @param {Object} Vue
   * @param {Object} [options]
   * @param {Object} [options.modules] - an object containing modules you want to register
   * @param {Object} [options.store] - a Vuex store instance
   * @param {Object} [options.router] - a Vue Router instance
   */
  async install(Vue, options) {
    this.Vue = Vue;
    this.options = Object.assign(this.options, options);

    this.registerVmProperty();
    await this.registerModules();
  }

  /**
   * Register Vue plugin globaly
   *
   * @returns void
   */
  registerVmProperty() {
    const { vmProperty, modules } = this.options;
    this.registerError(modules);
    this.Vue.prototype[vmProperty] = modules;
  }

  registerError(modules) {
    if (Object.prototype.hasOwnProperty.call(modules, 'errors')) {
      const error = modules.errors;
      delete modules.errors;
      modules.errors = error;
    }

    return modules;
  }

  /**
   * Register each module provided in /config/modules
   *
   * @return void
   */
  async registerModules() {
    const { modules } = this.options;

    for (let index = 0; index < Object.keys(modules).length; index += 1) {
      const name = Object.keys(modules)[index];
      const module = modules[name];

      // eslint-disable-next-line no-await-in-loop
      await module.then((loadedModule) => {
        const { routes, store } = loadedModule.default;
        this.registerModuleRoutes(routes);
        this.registerModuleStore(name, store);
      });
    }
  }

  /**
   * Register VueRouter module
   *
   * @param {Array} moduleRoutes
   * @returns void
   */
  async registerModuleRoutes(moduleRoutes) {
    if (moduleRoutes) {
      const { router } = this.options;

      await router.addRoutes(moduleRoutes);
    }
  }

  /**
   * Register Vuex store module
   *
   * @param {String} moduleName
   * @param {Object} moduleStore
   * @return void
   */
  async registerModuleStore(moduleName, moduleStore) {
    if (moduleStore) {
      const { store } = this.options;

      await store.registerModule(moduleName, moduleStore);
    }
  }
}

export default new ModulesPlugin();
