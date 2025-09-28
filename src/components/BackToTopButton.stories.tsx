import type { Meta, StoryObj } from '@storybook/react';
import BackToTopButton from './BackToTopButton';

const meta: Meta<typeof BackToTopButton> = {
  title: 'Components/BackToTopButton',
  component: BackToTopButton,
  tags: ['autodocs'],
  parameters: {
    // On ajoute un peu de contenu pour permettre le scroll
    docs: {
      story: {
        inline: false,
        iframeHeight: '400px',
        description: {
          story: 'Pour voir le bouton, scrollez vers le bas dans le canvas.',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Pour voir ce composant en action, il faut scroller.
// Storybook ne simule pas le scroll facilement, mais on peut voir son état "visible".
export const Default: Story = {};

export const Visible: Story = {
  // On ne peut pas vraiment forcer l'état visible via les props,
  // car il est géré par le state interne et le scroll.
  // La meilleure façon de le tester est manuellement dans le canvas.
  parameters: {
    docs: {
      description: {
        story: 'Le bouton devient visible après avoir scrollé de 300px.',
      },
    },
  },
};
