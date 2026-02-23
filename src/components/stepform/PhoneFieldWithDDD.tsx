import React, { useState, useEffect, useRef } from 'react';
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

/** Extract only digits, stripping leading +55 or 55 country code */
function extractDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 11); // max 11 digits (2 DDD + 9 number)
}

/** Format digits into (XX) XXXXX-XXXX or (XX) XXXX-XXXX */
function formatPhone(digits: string): string {
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  const ddd = digits.slice(0, 2);
  const num = digits.slice(2);
  if (num.length === 0) return `(${ddd})`;
  if (num.length <= 4) return `(${ddd}) ${num}`;
  if (num.length <= 8) return `(${ddd}) ${num.slice(0, 4)}-${num.slice(4)}`;
  // 9 digits
  return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`;
}

/** Normalize 9th digit based on DDD rules */
function normalize9thDigit(digits: string): string {
  if (digits.length < 10) return digits;
  const ddd = parseInt(digits.slice(0, 2));
  const num = digits.slice(2);

  if (DDDS_WITH_9.has(ddd)) {
    // Needs 9 digits — add leading 9 if missing
    if (num.length === 8 && num[0] !== '9') {
      return digits.slice(0, 2) + '9' + num;
    }
  } else {
    // Does NOT need 9 — remove leading 9 if present and has 9 digits
    if (num.length === 9 && num[0] === '9') {
      return digits.slice(0, 2) + num.slice(1);
    }
  }
  return digits;
}

export const PhoneFieldWithDDD: React.FC<PhoneFieldWithDDDProps> = ({
  name, value, onChange, required, className
}) => {
  const [digits, setDigits] = useState(() => extractDigits(value));
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync from external value
  useEffect(() => {
    const ext = extractDigits(value);
    setDigits(ext);
  }, [value]);

  const emitValue = (d: string) => {
    if (d.length > 0) {
      onChange(`55${d}`);
    } else {
      onChange('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = extractDigits(e.target.value);
    setDigits(raw);
    emitValue(raw);
  };

  const handleBlur = () => {
    setTouched(true);
    if (digits.length >= 10) {
      const normalized = normalize9thDigit(digits);
      if (normalized !== digits) {
        setDigits(normalized);
        emitValue(normalized);
      }
    }
  };

  const numLen = digits.length >= 2 ? digits.length - 2 : 0;
  const isComplete = numLen >= 8 && numLen <= 9;
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
        value={formatPhone(digits)}
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
