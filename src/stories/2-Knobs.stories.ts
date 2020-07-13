import {text, withKnobs} from '@storybook/addon-knobs';
import {Button} from '@storybook/angular/demo';

export default {
  title: 'Knobs (addon)',
  decorators: [withKnobs]
};

export const Example = () => ({
  component: Button,
  props: {
    // https://github.com/storybookjs/storybook/tree/next/addons/knobs#available-knobs
    text: text('text', 'Hello Storybook'),
  },
});
