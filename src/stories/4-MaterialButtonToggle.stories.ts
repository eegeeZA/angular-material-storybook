import {boolean} from '@storybook/addon-knobs/angular';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {withKnobs} from '@storybook/addon-knobs';
import {action, decorate} from '@storybook/addon-actions';

export default {
  title: 'Material/ButtonToggle',
  decorators: [withKnobs]
};

// https://github.com/storybookjs/storybook/tree/master/addons/actions#action-decorators
const printSourceAndValue = decorate([([event]: [MatButtonToggleChange]) => [event.source, event.value]]);

export const Basic = () => ({
  template: `
    <mat-button-toggle-group name="fontStyle" aria-label="Font Style" [disabled]="disabled" [vertical]="vertical" (change)="onChangeToggleGroup($event)">
      <mat-button-toggle value="bold" (change)="onChangeToggle($event)">Bold</mat-button-toggle>
      <mat-button-toggle value="italic" (change)="onChangeToggle($event)">Italic</mat-button-toggle>
      <mat-button-toggle value="underline" (change)="onChangeToggle($event)">Underline</mat-button-toggle>
    </mat-button-toggle-group>
    `,
  props: {
    disabled: boolean('disabled', false),
    vertical: boolean('vertical', false),
    onChangeToggleGroup: action('mat-button-toggle-group changed'),
    onChangeToggle: printSourceAndValue.action('mat-button-toggle changed'),
  },
  moduleMetadata: {
    imports: [MatButtonToggleModule]
  }
});
