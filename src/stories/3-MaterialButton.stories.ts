import {boolean, optionsKnob, text, withKnobs} from '@storybook/addon-knobs';
import {MatButtonModule} from '@angular/material/button';
import {moduleMetadata} from '@storybook/angular';
import {MatIconModule} from '@angular/material/icon';

export default {
  title: 'Material/Button',
  decorators: [withKnobs, moduleMetadata({imports: [MatButtonModule]}), storyFn => {
    const story = storyFn();
    return {
      ...story,
      template: (content => content)(story.template),
      styles: [`
        button {
          display: table-cell;
          margin: 8px;
        }
      `],
    };
  }],
};

export const Basic = () => ({
  template: `
    <div>
      <button mat-button>Basic</button>
      <button mat-button color="primary">Primary</button>
      <button mat-button color="accent">Accent</button>
      <button mat-button color="warn">Warn</button>
      <button mat-button disabled>Disabled</button>
      <a mat-button href="https://www.google.com/" target="_blank">Link</a>
    </div>
    <br>
    <div>Knobs:</div>
    <a mat-button [href]="customLink" target="_blank" [color]="colour" [disabled]="disabled">Button link to {{customLink}}</a>
    <button mat-button [color]="colour" [disabled]="disabled">Colour: {{colour}}</button>
    `,
  props: {
    colour: optionsKnob('Colour', {None: '', Primary: 'primary', Accent: 'accent', Warn: 'warn'}, '', {display: 'inline-radio'}),
    disabled: boolean('Disabled?', false),
    customLink: text('Custom link', 'https://www.google.com/'),
  },
});

export const Raised = () => ({
  template: `
    <button mat-raised-button>Basic</button>
    <button mat-raised-button color="primary">Primary</button>
    <button mat-raised-button color="accent">Accent</button>
    <button mat-raised-button color="warn">Warn</button>
    <button mat-raised-button disabled>Disabled</button>
    <a mat-raised-button href="https://www.google.com/" target="_blank">Link</a>
    `,
});

export const Stroked = () => ({
  template: `
    <button mat-stroked-button>Basic</button>
    <button mat-stroked-button color="primary">Primary</button>
    <button mat-stroked-button color="accent">Accent</button>
    <button mat-stroked-button color="warn">Warn</button>
    <button mat-stroked-button disabled>Disabled</button>
    <a mat-stroked-button href="https://www.google.com/" target="_blank">Link</a>
    `,
});

export const Flat = () => ({
  template: `
    <button mat-flat-button>Basic</button>
    <button mat-flat-button color="primary">Primary</button>
    <button mat-flat-button color="accent">Accent</button>
    <button mat-flat-button color="warn">Warn</button>
    <button mat-flat-button disabled>Disabled</button>
    <a mat-flat-button href="https://www.google.com/" target="_blank">Link</a>
    `,
});

export const Icon = () => ({
  moduleMetadata: {
    imports: [MatIconModule]
  },
  template: `
    <button mat-icon-button aria-label="Example icon button with a vertical three dot icon">
      <mat-icon>more_vert</mat-icon>
    </button>
    <button mat-icon-button color="primary" aria-label="Example icon button with a home icon">
      <mat-icon>home</mat-icon>
    </button>
    <button mat-icon-button color="accent" aria-label="Example icon button with a menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <button mat-icon-button color="warn" aria-label="Example icon button with a heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button disabled aria-label="Example icon button with a open in new tab icon">
      <mat-icon>open_in_new</mat-icon>
    </button>
    `,
});

export const FAB = () => ({
  moduleMetadata: {
    imports: [MatIconModule]
  },
  template: `
    <button mat-fab color="primary" aria-label="Example icon button with a delete icon">
      <mat-icon>delete</mat-icon>
    </button>
    <button mat-fab color="accent" aria-label="Example icon button with a bookmark icon">
      <mat-icon>bookmark</mat-icon>
    </button>
    <button mat-fab color="warn" aria-label="Example icon button with a home icon">
      <mat-icon>home</mat-icon>
    </button>
    <button mat-fab disabled aria-label="Example icon button with a heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    `,
});

export const MiniFAB = () => ({
  moduleMetadata: {
    imports: [MatIconModule]
  },
  template: `
    <button mat-mini-fab color="primary" aria-label="Example icon button with a menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <button mat-mini-fab color="accent" aria-label="Example icon button with a plus one icon">
      <mat-icon>plus_one</mat-icon>
    </button>
    <button mat-mini-fab color="warn" aria-label="Example icon button with a filter list icon">
      <mat-icon>filter_list</mat-icon>
    </button>
    <button mat-mini-fab disabled aria-label="Example icon button with a home icon">
      <mat-icon>home</mat-icon>
    </button>
    `,
});
