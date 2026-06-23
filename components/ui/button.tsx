import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111F] disabled:pointer-events-none disabled:opacity-100',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#60A5FA] to-[#4CC9F0] text-[#07111F] shadow-xl hover:scale-[1.02] hover:shadow-[0_18px_60px_-24px_rgba(76,201,240,0.35)]',
        destructive:
          'bg-rose-500 text-white shadow-xl hover:bg-rose-400',
        outline:
          'border border-white/15 bg-white/[0.07] text-white shadow-lg backdrop-blur-xl hover:bg-white/[0.10]',
        secondary:
          'bg-white/[0.07] text-white shadow-lg backdrop-blur-xl hover:bg-white/[0.10]',
        ghost: 'text-[#E5E7EB] hover:bg-white/[0.08] hover:text-white',
        link: 'text-[#C4B5FD] underline-offset-4 hover:text-white hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-12 rounded-xl px-6',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
