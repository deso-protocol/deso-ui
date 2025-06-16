import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ConfirmationDialogProps {
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'success' | 'destructive';
  confirmText?: string;
  cancelText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConfirmationDialog({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
  variant = 'default',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  open,
  onOpenChange,
}: ConfirmationDialogProps) {
  const confirmButtonVariant = variant === 'default' ? 'default' : variant;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(buttonVariants({ variant: confirmButtonVariant }))}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 