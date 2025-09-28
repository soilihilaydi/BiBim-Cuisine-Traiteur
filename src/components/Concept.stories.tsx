import type { Meta, StoryObj } from '@storybook/react';
import Concept from './Concept';

// Méta-informations sur le composant pour Storybook
const meta: Meta<typeof Concept> = {
  title: 'Components/Concept',
  component: Concept,
  parameters: {
    // Optionnel : définit comment le composant est centré dans le canvas de Storybook
    layout: 'fullscreen',
  },
  // Génère une documentation automatique pour ce composant
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// L'histoire par défaut pour le composant Concept
export const Default: Story = {};
