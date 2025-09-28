import type { Meta, StoryObj } from '@storybook/react';
import Contact from './Contact';

const meta: Meta<typeof Contact> = {
  title: 'Components/Contact',
  component: Contact,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockContactInfo = {
  _id: '1',
  phone: '06 12 34 56 78',
  email: 'contact@restoambulant.com',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
};

export const Default: Story = {
  args: {
    initialContactInfo: mockContactInfo,
  },
};

export const Loading: Story = {
  args: {
    initialContactInfo: undefined,
  },
};

export const WithSubmitSuccess: Story = {
  args: {
    initialContactInfo: mockContactInfo,
  },
  play: async ({ canvasElement }) => {
    // Cette story est plus complexe à simuler car elle implique une interaction utilisateur
    // et un appel API. On la laisse en l'état pour une démonstration visuelle.
  },
};
