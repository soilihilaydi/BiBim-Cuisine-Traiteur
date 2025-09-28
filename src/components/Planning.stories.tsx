import type { Meta, StoryObj } from '@storybook/react';
import Planning from './Planning';

const meta: Meta<typeof Planning> = {
  title: 'Components/Planning',
  component: Planning,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPlanningItems = [
  {
    _id: '1',
    day: 'Mardi',
    place: 'Marché de Lamastre',
    time: '8h - 13h',
    location: { lat: 44.9865, lng: 4.5833 },
  },
  {
    _id: '2',
    day: 'Vendredi',
    place: 'Place de la Mairie, Vernoux',
    time: '18h - 22h',
    location: { lat: 44.893, lng: 4.658 },
  },
];

export const Default: Story = {
  args: {
    initialPlanningItems: mockPlanningItems,
  },
};

export const Loading: Story = {
  args: {
    initialPlanningItems: [],
  },
};
