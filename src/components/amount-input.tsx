'use client'
import * as React from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Props = InputProps & {
  step?: number
  onChange: (amount: string) => void
  prefix?: string
  postfix?: string
  affixClassName?: string
}

const enforceAmountPattern = (value: string) =>
  value
    // replace first comma with #
    .replace(/[.,]/, '#')
    // remove all other commas
    .replace(/[.,]/g, '')
    // change back # to dot
    .replace(/#/, '.')
    // remove all non-numeric and non-dot characters
    .replace(/[^\d.]/g, '')

const AmountInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      affixClassName,
      step = 0.01,
      prefix,
      postfix,
      onChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex items-baseline gap-2">
        {prefix !== undefined && (
          <span className={cn(affixClassName)}>{prefix}</span>
        )}
        <Input
          className={cn('text-base', className)}
          type="text"
          inputMode={step >= 1 ? 'numeric' : 'decimal'}
          step={step}
          placeholder={step >= 1 ? '0' : String(step).replace(/\d/g, '0')}
          onChange={(event) =>
            onChange(enforceAmountPattern(event.target.value))
          }
          onClick={(e) => e.currentTarget.select()}
          ref={ref}
          {...props}
        />
        {postfix !== undefined && (
          <span className={cn(affixClassName)}>{postfix}</span>
        )}
      </div>
    )
  },
)
AmountInput.displayName = 'AmountInput'

export { AmountInput }
