import type { Meta, StoryObj } from '@storybook/react';
import Gallery from './Gallery';

const meta: Meta<typeof Gallery> = {
  title: 'Components/Gallery',
  component: Gallery,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGalleryItems = [
  {
    _id: '1',
    caption: 'Notre food truck en action',
    image: { asset: { url: 'https://via.placeholder.com/400x300' } },
  },
  {
    _id: '2',
    caption: 'Le burger du chef',
    image: { asset: { url: 'https://via.placeholder.com/400x300' } },
  },
  {
    _id: '3',
    caption: 'Ambiance conviviale',
    image: { asset: { url: 'https://via.placeholder.com/400x300' } },
  },
];

export const Default: Story = {
  args: {
    initialGalleryItems: mockGalleryItems,
  },
};

export const Loading: Story = {
  args: {
    initialGalleryItems: [],
  },
};

export const Empty: Story = {
  args: {
    initialGalleryItems: [],
  },
};
