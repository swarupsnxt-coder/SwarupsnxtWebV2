import React from 'react';
import { PRODUCTS, productPagePath } from '../constants';
import ProductVisual from './visuals/ProductVisual';

// Small product card (sample visual, summary, link) for "Works well with" and industry pages.
const ProductCard: React.FC<{ productId: string }> = ({ productId }) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  return (
    <li className="rounded-[2rem] overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col">
      <ProductVisual productId={product.id} size="sm" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{product.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-grow">{product.summary}</p>
        <a href={productPagePath(product.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all">
          Learn more<span className="sr-only"> about {product.title}</span> <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
        </a>
      </div>
    </li>
  );
};

export default ProductCard;
