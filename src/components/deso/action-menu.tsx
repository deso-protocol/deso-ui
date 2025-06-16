import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from './confirmation-dialog';

type ConfirmationProps = Omit<ConfirmationDialogProps, 'trigger' | 'children'>;

interface ActionMenuItemProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: (e: Event) => void;
  variant?: 'default' | 'destructive';
  className?: string;
  disabled?: boolean;
  confirmation?: ConfirmationProps;
}

export function ActionMenuItem({
  children,
  icon: Icon,
  onClick,
  variant,
  className,
  disabled,
  confirmation,
}: ActionMenuItemProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleSelect = (e: Event) => {
    if (confirmation) {
      e.preventDefault();
      setDialogOpen(true);
    } else if (onClick) {
      onClick(e);
    }
  };

  const item = (
    <DropdownMenuItem
      onSelect={handleSelect}
      variant={variant}
      disabled={disabled}
      className={cn('flex cursor-pointer items-center gap-2', className)}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </DropdownMenuItem>
  );

  if (confirmation) {
    return (
      <ConfirmationDialog
        {...confirmation}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        trigger={<>{item}</>}
        onConfirm={() => {
          if (onClick) {
            onClick(new Event('click'));
          }
          if (confirmation.onConfirm) {
            confirmation.onConfirm();
          }
        }}
      />
    );
  }

  return item;
}

interface ActionMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'center' | 'start' | 'end';
}

export function ActionMenu({
  trigger,
  children,
  align = 'end',
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DropdownMenuSeparator as ActionMenuSeparator }; 