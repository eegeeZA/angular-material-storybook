import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

interface ButtonToggleArgs {
  disabled: boolean;
  vertical: boolean;
  groupChange: (event: MatButtonToggleChange) => void;
  toggleChange: (sourceId: string, value: unknown) => void;
}

const meta: Meta<ButtonToggleArgs> = {
  title: 'Material/ButtonToggle',
  decorators: [moduleMetadata({ imports: [MatButtonToggleModule] })],
};

export default meta;

export const Basic: StoryObj<ButtonToggleArgs> = {
  args: {
    disabled: false,
    vertical: false,
    groupChange: fn(),
    toggleChange: fn(),
  },
  render: (args) => ({
    props: args,
    template: `
      <mat-button-toggle-group
        name="fontStyle"
        aria-label="Font Style"
        [disabled]="disabled"
        [vertical]="vertical"
        (change)="groupChange($event)"
      >
        <mat-button-toggle value="bold" (change)="toggleChange($event.source.id, $event.value)">Bold</mat-button-toggle>
        <mat-button-toggle value="italic" (change)="toggleChange($event.source.id, $event.value)">Italic</mat-button-toggle>
        <mat-button-toggle value="underline" (change)="toggleChange($event.source.id, $event.value)">Underline</mat-button-toggle>
      </mat-button-toggle-group>
    `,
  }),
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Bold' }));

    await expect(args.groupChange).toHaveBeenCalledOnce();
    await expect(args.toggleChange).toHaveBeenCalledWith(expect.any(String), 'bold');
  },
};
