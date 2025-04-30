'use client';

import { useModal } from '@/providers/modal-provider';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

type CustomModalProps = {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  maxWidth?: string;
};

function CustomModal({
  children,
  defaultOpen,
  subheading,
  heading,
  maxWidth,
}: CustomModalProps) {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent
        className={cn(
          'h-screen overflow-y-scroll bg-card md:h-fit md:max-h-[700px]',
          maxWidth,
        )}
      >
        <DialogHeader className='pt-8 text-left'>
          {heading && (
            <DialogTitle className='text-2xl font-bold'>{heading}</DialogTitle>
          )}
          {subheading && <DialogDescription>{subheading}</DialogDescription>}

          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CustomModal;
