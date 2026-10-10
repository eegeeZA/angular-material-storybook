import { inject, provideAppInitializer } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular-vite';
import { expect } from 'storybook/test';

type ButtonArgs = {
  appearance: 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';
  disabled: boolean;
  customLink: string;
};

const meta: Meta<ButtonArgs> = {
  title: 'Material/Button',
  decorators: [
    applicationConfig({
      providers: [
        provideAppInitializer(() => {
          inject(MatIconRegistry).setDefaultFontSetClass(
            'material-symbols-outlined',
            'mat-ligature-font',
          );
        }),
      ],
    }),
    moduleMetadata({ imports: [MatButtonModule, MatIconModule] }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<ButtonArgs>;

const appearanceRow = (appearance: string) => `
  <button matButton="${appearance}">Basic</button>
  <button matButton="${appearance}" disabled>Disabled</button>
  <a matButton="${appearance}" href="https://www.google.com/" target="_blank">Link</a>
`;

export const Playground: Story = {
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['text', 'filled', 'elevated', 'outlined', 'tonal'],
    },
  },
  args: {
    appearance: 'text',
    disabled: false,
    customLink: 'https://www.google.com/',
  },
  render: (args) => ({
    props: args,
    template: `
      <a [matButton]="appearance" [href]="customLink" target="_blank" [disabled]="disabled">
        Button link to {{ customLink }}
      </a>
      <button [matButton]="appearance" [disabled]="disabled">Appearance: {{ appearance }}</button>
    `,
  }),
};

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const Text: Story = { render: () => ({ template: appearanceRow('text') }) };

export const Elevated: Story = { render: () => ({ template: appearanceRow('elevated') }) };

export const Outlined: Story = { render: () => ({ template: appearanceRow('outlined') }) };

export const Filled: Story = { render: () => ({ template: appearanceRow('filled') }) };

export const Tonal: Story = { render: () => ({ template: appearanceRow('tonal') }) };

export const Icon: Story = {
  render: () => ({
    template: `
      <button matIconButton aria-label="Example icon button with a vertical three dot icon">
        <mat-icon fontIcon="more_vert" />
      </button>
      <button matIconButton aria-label="Example icon button with a home icon">
        <mat-icon fontIcon="home" />
      </button>
      <button matIconButton disabled aria-label="Example icon button with a open in new tab icon">
        <mat-icon fontIcon="open_in_new" />
      </button>
    `,
  }),
};

export const FAB: Story = {
  render: () => ({
    template: `
      <button matFab aria-label="Example icon button with a delete icon">
        <mat-icon fontIcon="delete" />
      </button>
      <button matFab extended>
        <mat-icon fontIcon="favorite" />
        Extended
      </button>
      <button matFab disabled aria-label="Example icon button with a heart icon">
        <mat-icon fontIcon="favorite" />
      </button>
    `,
  }),
};

export const MiniFAB: Story = {
  render: () => ({
    template: `
      <button matMiniFab aria-label="Example icon button with a menu icon">
        <mat-icon fontIcon="menu" />
      </button>
      <button matMiniFab aria-label="Example icon button with a plus one icon">
        <mat-icon fontIcon="plus_one" />
      </button>
      <button matMiniFab disabled aria-label="Example icon button with a home icon">
        <mat-icon fontIcon="home" />
      </button>
    `,
  }),
};
