import type { Meta, StoryObj } from '@storybook/react';
import CookieConsentBanner from './CookieConsentBanner';

const meta: Meta<typeof CookieConsentBanner> = {
  title: 'Components/CookieConsentBanner',
  component: CookieConsentBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
