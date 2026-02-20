import React, { useState, useEffect, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// DDDs que usam 9 dígitos (SP, RJ parcial, ES)
const DDDS_WITH_9 = new Set([11,12,13,14,15,16,17,18,19,21,22,24,27,28]);

// Lista completa de DDDs do Brasil com estado
const DDD_LIST: { ddd: number; state: string }[] = [
  { ddd: 11, state: 'SP' }, { ddd: 12, state: 'SP' }, { ddd: 13, state: 'SP' },
  { ddd: 14, state: 'SP' }, { ddd: 15, state: 'SP' }, { ddd: 16, state: 'SP' },
  { ddd: 17, state: 'SP' }, { ddd: 18, state: 'SP' }, { ddd: 19, state: 'SP' },
  { ddd: 21, state: 'RJ' }, { ddd: 22, state: 'RJ' }, { ddd: 24, state: 'RJ' },
  { ddd: 27, state: 'ES' }, { ddd: 28, state: 'ES' },
  { ddd: 31, state: 'MG' }, { ddd: 32, state: 'MG' }, { ddd: 33, state: 'MG' },
  { ddd: 34, state: 'MG' }, { ddd: 35, state: 'MG' }, { ddd: 37, state: 'MG' },
  { ddd: 38, state: 'MG' },
  { ddd: 41, state: 'PR' }, { ddd: 42, state: 'PR' }, { ddd: 43, state: 'PR' },
  { ddd: 44, state: 'PR' }, { ddd: 45, state: 'PR' }, { ddd: 46, state: 'PR' },
  { ddd: 47, state: 'SC' }, { ddd: 48, state: 'SC' }, { ddd: 49, state: 'SC' },
  { ddd: 51, state: 'RS' }, { ddd: 53, state: 'RS' }, { ddd: 54, state: 'RS' },
  { ddd: 55, state: 'RS' },
  { ddd: 61, state: 'DF' }, { ddd: 62, state: 'GO' }, { ddd: 63, state: 'TO' },
  { ddd: 64, state: 'GO' }, { ddd: 65, state: 'MT' }, { ddd: 66, state: 'MT' },
  { ddd: 67, state: 'MS' }, { ddd: 68, state: 'AC' }, { ddd: 69, state: 'RO' },
  { ddd: 71, state: 'BA' }, { ddd: 73, state: 'BA' }, { ddd: 74, state: 'BA' },
  { ddd: 75, state: 'BA' }, { ddd: 77, state: 'BA' },
  { ddd: 79, state: 'SE' },
  { ddd: 81, state: 'PE' }, { ddd: 82, state: 'AL' }, { ddd: 83, state: 'PB' },
  { ddd: 84, state: 'RN' }, { ddd: 85, state: 'CE' }, { ddd: 86, state: 'PI' },
  { ddd: 87, state: 'PE' }, { ddd: 88, state: 'CE' }, { ddd: 89, state: 'PI' },
  { ddd: 91, state: 'PA' }, { ddd: 92, state: 'AM' }, { ddd: 93, state: 'PA' },
  { ddd: 94, state: 'PA' }, { ddd: 95, state: 'RR' }, { ddd: 96, state: 'AP' },
  { ddd: 97, state: 'AM' }, { ddd: 98, state: 'MA' }, { ddd: 99, state: 'MA' },
];

interface PhoneFieldWithDDDProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

// Parse existing value like "5562999118230" back into ddd + number
function parsePhoneValue(value: string): { ddd: string; number: string } {
  if (!value) return { ddd: '62', number: '' };
  const digits = value.replace(/\D/g, '');
  
  if (digits.startsWith('55') && digits.length >= 4) {
    const rest = digits.slice(2);
    const ddd = rest.slice(0, 2);
    const num = rest.slice(2);
    return { ddd, number: num };
  }
  if (digits.length >= 10) {
    const ddd = digits.slice(0, 2);
    const num = digits.slice(2);
    return { ddd, number: num };
  }
  return { ddd: '62', number: digits };
}

function formatPhoneDisplay(digits: string, has9: boolean): string {
  if (!digits) return '';
  if (has9) {
    // 9 XXXX-XXXX
    if (digits.length <= 1) return digits;
    if (digits.length <= 5) return `${digits[0]} ${digits.slice(1)}`;
    return `${digits[0]} ${digits.slice(1, 5)}-${digits.slice(5, 9)}`;
  }
  // XXXX-XXXX
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
}

export const PhoneFieldWithDDD: React.FC<PhoneFieldWithDDDProps> = ({
  name, value, onChange, required, className
}) => {
  const parsed = useMemo(() => parsePhoneValue(value), [value]);
  const [ddd, setDdd] = useState(parsed.ddd);
  const [number, setNumber] = useState(parsed.number);

  // Sync from external value changes
  useEffect(() => {
    const p = parsePhoneValue(value);
    setDdd(p.ddd);
    setNumber(p.number);
  }, [value]);

  const has9 = DDDS_WITH_9.has(parseInt(ddd));
  const maxDigits = has9 ? 9 : 8;
  const expectedLength = maxDigits;

  const emitValue = (newDdd: string, rawNumber: string) => {
    let digits = rawNumber.replace(/\D/g, '');
    const newHas9 = DDDS_WITH_9.has(parseInt(newDdd));
    const newMax = newHas9 ? 9 : 8;

    // Auto-correct: add/remove leading 9 based on DDD rule
    if (newHas9 && digits.length === 8 && digits[0] !== '9') {
      digits = '9' + digits;
    } else if (!newHas9 && digits.length === 9 && digits[0] === '9') {
      digits = digits.slice(1);
    }

    digits = digits.slice(0, newMax);
    setNumber(digits);

    if (digits.length > 0) {
      onChange(`55${newDdd}${digits}`);
    } else {
      onChange('');
    }
  };

  const handleDddChange = (newDdd: string) => {
    setDdd(newDdd);
    emitValue(newDdd, number);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, maxDigits);
    setNumber(raw);
    if (raw.length > 0) {
      onChange(`55${ddd}${raw}`);
    } else {
      onChange('');
    }
  };

  const isComplete = number.length === expectedLength;
  const isPartial = number.length > 0 && !isComplete;

  return (
    <div className={cn("flex gap-1.5 items-center", className)}>
      {/* +55 prefix */}
      <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-2.5 rounded-md border border-input whitespace-nowrap h-12 flex items-center">
        +55
      </span>

      {/* DDD Select */}
      <Select value={ddd} onValueChange={handleDddChange}>
        <SelectTrigger className="w-[100px] h-12 text-sm">
          <SelectValue placeholder="DDD" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {DDD_LIST.map(({ ddd: d, state }) => (
            <SelectItem key={d} value={String(d)}>
              ({d}) {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Number input */}
      <Input
        type="tel"
        name={name}
        inputMode="numeric"
        placeholder={has9 ? '9 XXXX-XXXX' : 'XXXX-XXXX'}
        value={formatPhoneDisplay(number, has9)}
        onChange={handleNumberChange}
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
