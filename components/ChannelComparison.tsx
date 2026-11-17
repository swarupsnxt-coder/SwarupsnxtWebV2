import React from 'react';
import { CHANNEL_COMPARISON, findProductPage, productPagePath } from '../constants';

interface ChannelComparisonProps {
  // Guides embed the table without the section heading.
  embedded?: boolean;
}

const productHref = (id: string) => (findProductPage(id) ? productPagePath(id) : `/#${id}`);

// WhatsApp vs RCS vs SMS vs voice blast. A table from md up; stacked cards on phones.
const ChannelComparison: React.FC<ChannelComparisonProps> = ({ embedded = false }) => {
  const { channels, rows } = CHANNEL_COMPARISON;

  const body = (
    <>
      <div className="hidden md:block overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Comparison of WhatsApp, RCS, SMS and voice blast</caption>
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              <td className="p-5"></td>
              {channels.map((c) => (
                <th key={c.id} scope="col" className="p-5 align-bottom">
                  <a href={productHref(c.productId)} className="inline-flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white hover:text-[#2BB6C6] transition-colors">
                    <i className={`${c.icon} text-[#2BB6C6]`} aria-hidden="true"></i>
                    {c.name}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b last:border-b-0 border-slate-200 dark:border-white/5">
                <th scope="row" className="p-5 w-48 font-bold text-slate-900 dark:text-white align-top">{r.label}</th>
                {channels.map((c) => (
                  <td key={c.id} className="p-5 text-slate-600 dark:text-slate-400 align-top leading-relaxed">{r.values[c.id]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {channels.map((c) => (
          <div key={c.id} className="p-6 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
            <a href={productHref(c.productId)} className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
              <i className={`${c.icon} text-[#2BB6C6]`} aria-hidden="true"></i>
              {c.name}
            </a>
            <dl className="space-y-3 text-sm">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt className="text-[11px] font-black uppercase tracking-widest text-[#2BB6C6]">{r.label}</dt>
                  <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">{r.values[c.id]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );

  if (embedded) return <div className="my-10">{body}</div>;

  return (
    <section id="compare-channels" className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Compare channels</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              WhatsApp, RCS, SMS or <span className="gradient-text italic">voice blast?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Each channel suits a different job. Many businesses use two or more together.
            </p>
          </div>
          {body}
        </div>
      </div>
    </section>
  );
};

export default ChannelComparison;
