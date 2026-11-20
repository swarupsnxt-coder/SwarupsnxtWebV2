import React from 'react';
import { Product } from '../types';

// A product's three icon benefits (PRODUCTS[].benefits): home page cards and product page heroes.
const BenefitList: React.FC<{ benefits: Product['benefits']; size?: 'sm' | 'lg'; className?: string }> = ({
  benefits,
  size = 'sm',
  className = '',
}) => {
  const lg = size === 'lg';
  return (
    <ul className={`${lg ? 'space-y-4' : 'space-y-3'} ${className}`}>
      {benefits.map((b) => (
        <li key={b.text} className="flex items-center gap-3">
          <span
            className={`${lg ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'} shrink-0 rounded-lg bg-[#2BB6C6]/10 dark:bg-[#2BB6C6]/15 text-[#2BB6C6] flex items-center justify-center`}
          >
            <i className={b.icon} aria-hidden="true"></i>
          </span>
          <span className={`${lg ? 'text-base md:text-lg' : 'text-sm'} font-semibold text-slate-700 dark:text-slate-200 leading-snug`}>{b.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default BenefitList;
