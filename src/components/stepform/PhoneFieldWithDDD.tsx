import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const DDDS_WITH_9 = new Set([11,12,13,14,15,16,17,18,19,21,22,24,27,28]);

interface PhoneFieldWithDDDProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

/** Extract only digits, stripping country code if present */
function extractDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 11);
}

/** Format digits into (XX) XXXXX-XXXX or (XX) XXXX-XXXX */
function formatPhone(digits: string): string {
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits})`;
  const ddd = digits.slice(0, 2);
  const num = digits.slice(2);
  if (num.length <= 4) return `(${ddd}) ${num}`;
  if (num.length <= 8) return `(${ddd}) ${num.slice(0, 4)}-${num.slice(4)}`;
  return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`;
}

/** Normalize 9th digit based on DDD rules */
function normalize9thDigit(digits: string): string {
  if (digits.length < 10) return digits;
  const ddd = parseInt(digits.slice(0, 2));
  const num = digits.slice(2);
  if (DDDS_WITH_9.has(ddd)) {
    if (num.length === 8 && num[0] !== '9') {
      return digits.slice(0, 2) + '9' + num;
    }
  } else {
    if (num.length === 9 && num[0] === '9') {
      return digits.slice(0, 2) + num.slice(1);
    }
  }
  return digits;
}

/** Check if a phone value (format 55XXXXXXXXXXX) is valid */
export function isValidPhone(value: string): boolean {
  if (!value) return false;
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) {
    const local = digits.slice(2);
    return local.length >= 10 && local.length <= 11;
  }
  return digits.length >= 10 && digits.length <= 11;
}

/** Initialize display from external value */
function initDisplay(value: string): string {
  if (!value) return '';
  const digits = extractDigits(value);
  return digits.length >= 10 ? formatPhone(digits) : '';
}

export const PhoneFieldWithDDD: React.FC<PhoneFieldWithDDDProps> = ({
  name, value, onChange, required, className
}) => {
  const [displayValue, setDisplayValue] = useState(() => initDisplay(value));
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Let the user type freely — no masking during input
    setDisplayValue(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
    const digits = extractDigits(displayValue);
    if (digits.length >= 10) {
      const normalized = normalize9thDigit(digits);
      setDisplayValue(formatPhone(normalized));
      onChange(`55${normalized}`);
    } else if (digits.length === 0) {
      setDisplayValue('');
      onChange('');
    } else {
      // Partial — show what they typed, emit partial so validation catches it
      onChange(digits.length > 0 ? `55${digits}` : '');
    }
  };

  const digits = extractDigits(displayValue);
  const isComplete = digits.length >= 10 && digits.length <= 11;
  const isPartial = touched && digits.length > 0 && !isComplete;

  return (
    <div className={cn("flex gap-1.5 items-center", className)}>
      <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-2.5 rounded-md border border-input whitespace-nowrap h-12 flex items-center">
        +55
      </span>
      <Input
        ref={inputRef}
        type="tel"
        name={name}
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="(00) 00000-0000"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={cn(
          "flex-1 h-12",
          isComplete && "border-primary focus-visible:ring-primary",
          isPartial && "border-destructive/60 focus-visible:ring-destructive/60"
        )}
      />
    </div>
  );
};
