import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onPrivacyClick: () => void;
  onSecurityClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onSecurityClick }) => {
  return (
    <footer className="bg-slate-50 dark:bg-[#0f172a] pt-24 pb-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-slate-600 dark:text-slate-500 max-w-sm mb-8 leading-relaxed">
              Swarups NXT is a global pioneer in Hyper-Realistic AI Digital Employees. 
              Bridging the gap between human empathy and computational efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#2BB6C6] hover:text-[#0f172a] transition-all">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#2BB6C6] hover:text-[#0f172a] transition-all">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#2BB6C6] hover:text-[#0f172a] transition-all">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Intelligence</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-500">
              <li><a href="#nxt-lab" className="hover:text-[#2BB6C6] transition-colors">NXT Lab</a></li>
              <li><a href="#" className="hover:text-[#2BB6C6] transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-[#2BB6C6] transition-colors">Benchmarks</a></li>
              <li><a href="#" className="hover:text-[#2BB6C6] transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-500">
              <li><a href="#" className="hover:text-[#2BB6C6] transition-colors">Careers</a></li>
              <li><button onClick={onPrivacyClick} className="hover:text-[#2BB6C6] transition-colors text-left">Privacy Protocol</button></li>
              <li><button onClick={onSecurityClick} className="hover:text-[#2BB6C6] transition-colors text-left">Security Terms</button></li>
              <li><a href="#" className="hover:text-[#2BB6C6] transition-colors">Ethics Board</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
          <p>© 2025 Swarups NXT Intelligence. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>India Headquarters: Chennai, TN, India</span>
            <span>Uptime: 99.98%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;