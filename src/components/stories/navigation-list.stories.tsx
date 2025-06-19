import type { Meta, StoryObj } from '@storybook/react';
import { NavigationList, NavigationItemProps } from '../deso/navigation-list';
import {
  Home,
  Compass,
  LayoutGrid,
  Rss,
  CandlestickChart,
  Bell,
  Mail,
  Banknote,
  Wallet,
  User,
  Settings,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

const meta: Meta<typeof NavigationList> = {
  title: 'DeSo/NavigationList',
  component: NavigationList,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems: NavigationItemProps[] = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/discover', icon: Compass, label: 'Discover' },
  { href: '/collections', icon: LayoutGrid, label: 'Collections' },
  { href: '/feed-store', icon: Rss, label: 'Feed Store' },
  { href: '/trade', icon: CandlestickChart, label: 'Trade' },
  {
    href: '/notifications',
    icon: Bell,
    label: 'Notifications',
    isActive: true,
    unreadCount: 71,
  },
  { href: '/messages', icon: Mail, label: 'Messages', unreadCount: 120 },
  { href: '/earnings', icon: Banknote, label: 'Earnings' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/admin', icon: ShieldCheck, label: 'Admin' },
  { href: '/feedback', icon: HelpCircle, label: 'Feedback' },
];

export const Default: Story = {
  args: {
    items: navItems,
    className: 'w-64',
  },
}; 