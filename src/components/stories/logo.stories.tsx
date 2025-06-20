import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../deso/logo';
import { ThemeProvider } from '../ui/theme-provider';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={() => setTheme('light')} disabled={theme === 'light'}>
        Light
      </Button>
      <Button onClick={() => setTheme('dark')} disabled={theme === 'dark'}>
        Dark
      </Button>
    </div>
  );
};

const meta: Meta<typeof Logo> = {
  title: 'DeSo/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="p-4">
          <Story />
          <ThemeSwitcher />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 60,
  },
}; 