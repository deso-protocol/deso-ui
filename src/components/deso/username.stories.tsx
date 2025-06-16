import type { Meta, StoryObj } from '@storybook/react'
import { UsernameDisplay } from './username-display'
import { http, HttpResponse } from 'msw'
import { mockProfiles, defaultProfile } from '../../lib/mocks/deso-data'
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants'
import { successHandlers, errorHandlers, loadingHandlers } from '../../lib/mocks/msw-handlers'

const meta: Meta<typeof UsernameDisplay> = {
  title: 'DeSo/Username',
  component: UsernameDisplay,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['social', 'token', null],
      description: 'Prepend a character to the username.',
    },
    showVerification: {
      control: 'boolean',
    },
    showCopyButton: {
      control: 'boolean',
    },
    truncate: {
      control: 'boolean',
    },
    maxLength: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}

export const Social: Story = {
  name: 'Variant: Social (@)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    variant: 'social',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}

export const Token: Story = {
  name: 'Variant: Token ($)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    variant: 'token',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}

export const WithVerification: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    showVerification: true,
    variant: 'social',
    isVerified: true,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}

export const WithCopyButton: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    showCopyButton: true,
    variant: 'social',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}

export const Truncated: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    truncate: true,
    maxLength: 8,
    variant: 'social',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}

export const Loading: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
}

export const WithCustomStyling: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    showVerification: true,
    className: 'text-blue-600 font-bold text-lg',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
} 