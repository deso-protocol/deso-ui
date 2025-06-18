import { addons} from 'storybook/manager-api';
import desoTheme from './deso-theme';

addons.setConfig({
  navSize: 300,
  rightPanelWidth: 400,
  panelPosition: 'right',
  enableShortcuts: true,
  showToolbar: true,
  theme: desoTheme,
  selectedPanel: 'storybook/docs/panel',
  initialActive: 'sidebar',
});