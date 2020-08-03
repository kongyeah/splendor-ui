import { App } from 'vue';

import Button from './button';
import Input from './input';
import Textarea from './textarea';

const components: any[] = [Button, Input, Textarea];

const install = (app: App) => {
  components.forEach((Component) => {
    if (typeof Component === 'function' && typeof Component.name === 'string') {
      app.component(`sk-${Component.name.toLowerCase()}`, Component);
    } else if (Component && typeof Component.name === 'string') {
      app.component(Component.name, Component);
    } else if (Component && typeof Component.install === 'function') {
      app.use(Component);
    } else {
      console.warn('Failed to register component:', Component);
    }
  });
};

export { install, Button, Input };
