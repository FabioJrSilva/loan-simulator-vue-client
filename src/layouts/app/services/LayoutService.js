import config from '@/layouts/app/config';

class LayoutService {
  constructor() {
    this.key = 'layout';

    const settings = this.getSettings() || {};
  }

  getSettings() {}

  setSetting(setting, value) {
    const settings = this.getSettings();

    settings[setting] = value;

    return this;
  }

  getSetting(setting) {
    const settings = this.getSettings();

    if (_.has(settings, setting)) {
      return settings[setting];
    }

    return null;
  }

  getPageNavigation() {
    return this.getSetting('navigation');
  }

  getPageNavigationComponent() {
    const navigation = this.getPageNavigation();

    if (!_.isEmpty(navigation)) {
      return config.navigations[navigation];
    }

    return null;
  }

  setPageNavigation(navigation) {
    if (_.has(config.navigations, navigation)) {
      this.setSetting('navigation', navigation);
    }

    return this;
  }

  clearPageNavigation() {
    this.setSetting('navigation', null);

    return this;
  }
}

export const LayoutServiceInstance = LayoutService;

export default new LayoutService({});
