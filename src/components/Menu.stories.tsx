import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockMenuItems = [
  {
    _id: '1',
    name: 'Taco Classique',
    description: 'Viande au choix, coriandre, oignons, sauce maison.',
    price: 8.50,
    image: { asset: { url: 'https://via.placeholder.com/200' } },
    categoryName: 'Tacos',
  },
  {
    _id: '2',
    name: 'Burger du Chef',
    description: 'Steak haché frais, cheddar, salade, tomate, sauce secrète.',
    price: 12.00,
    image: { asset: { url: 'https://via.placeholder.com/200' } },
    categoryName: 'Burgers',
  },
  {
    _id: '3',
    name: 'Frites Maison',
    description: 'Pommes de terre fraîches, double cuisson.',
    price: 4.00,
    image: { asset: { url: 'https://via.placeholder.com/200' } },
    categoryName: 'Accompagnements',
  },
];

// Histoire avec des données simulées
export const Default: Story = {
  args: {
    initialMenuItems: mockMenuItems,
  },
};

// Histoire pour l'état de chargement
export const Loading: Story = {
  args: {
    initialMenuItems: [], // Pas de données initiales pour simuler le chargement
  },
};

// Histoire pour l'état vide (pas d'articles)
export const Empty: Story = {
  args: {
    initialMenuItems: [],
  },
  // On simule que le chargement est terminé mais qu'il n'y a rien
  play: async ({ canvasElement }) => {
    // Ce serait mieux si le composant pouvait gérer un état "pas de chargement, mais vide"
    // Pour l'instant, on le montre tel quel.
  },
};
