import React from 'react';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-md" onClick={onClose}></div>
    <div className="glass w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[30px] border-white/10 shadow-2xl relative z-10 flex flex-col">
      <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0f172a] z-20">
        <h2 className="text-2xl font-bold uppercase tracking-widest">{title}</h2>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
      <div className="p-8 text-slate-400 text-sm leading-relaxed space-y-8">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyModal: React.FC<ModalProps> = ({ onClose }) => (
  <Modal title="Privacy Protocol" onClose={onClose}>
    <div className="space-y-6">
      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">01. Entity Status</div>
        <h3 className="text-white font-bold text-lg mb-2">Proprietorship Overview</h3>
        <p>Swarups NXT is an Indian Sole Proprietorship specializing in the reselling and integration of high-performance Artificial Intelligence SaaS tools. This Privacy Protocol outlines our commitment to your data security and transparency in accordance with the Digital Personal Data Protection (DPDP) Act 2023.</p>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">02. Transmission Architecture</div>
        <h3 className="text-white font-bold text-lg mb-2">The Zero-Storage Policy</h3>
        <p className="mb-3">Swarups NXT operates as a Neural Interface Layer. We explicitly state that:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>We do not store, record, or log any voice or chat data processed through our agents.</li>
          <li>All data flows via secure, encrypted channels directly to our primary SaaS partners.</li>
          <li>We do not sell, trade, or analyze your business conversation metadata.</li>
          <li>Real-time interactions are ephemeral and exist only during the active session duration.</li>
        </ul>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">03. Cookie Protocol</div>
        <h3 className="text-white font-bold text-lg mb-2">Strictly Necessary Logic</h3>
        <p className="mb-4">Our web interface utilizes only Strictly Necessary Cookies. These are essential for core platform functionality, specifically regarding:</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <h4 className="text-white font-bold text-sm mb-1">Security Node</h4>
            <p className="text-xs">Auth tokens and CSRF protection to prevent unauthorized session access.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <h4 className="text-white font-bold text-sm mb-1">UI Integrity</h4>
            <p className="text-xs">Theme preferences (Dark/Light mode) and tour completion status.</p>
          </div>
        </div>
        <p className="mt-4 text-xs italic opacity-70">Note: We do not utilize third-party advertising or cross-site tracking cookies.</p>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">04. Partner Ecosystem</div>
        <h3 className="text-white font-bold text-lg mb-2">Data Sharing Protocols</h3>
        <p className="mb-4">Data is shared exclusively with our vetted SaaS vendors (e.g., Google GenAI, Vapi, Retell) solely to facilitate the core AI services you consume. Each partner is selected based on rigorous SOC2 and enterprise-grade privacy compliance.</p>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <h3 className="text-white font-bold mb-2">Grievance Officer</h3>
          <p className="mb-4">In compliance with the DPDP Act 2023, for any privacy concerns or data requests, please contact our designated officer:</p>
          <div className="flex items-center gap-3 text-[#2BB6C6] font-bold">
            <i className="fa-solid fa-shield-halved"></i>
            <a href="mailto:grievance@swarupsnxt.com" className="hover:underline">grievance@swarupsnxt.com</a>
          </div>
        </div>
      </section>
    </div>
  </Modal>
);

export const SecurityModal: React.FC<ModalProps> = ({ onClose }) => (
  <Modal title="Security Terms" onClose={onClose}>
    <div className="space-y-6">
      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">01. Scope of Service</div>
        <h3 className="text-white font-bold text-lg mb-2">Reseller Framework</h3>
        <p>Swarups NXT operates as an independent reseller and integrator of Artificial Intelligence SaaS products. By utilizing our services, the Client acknowledges that Swarups NXT facilitates access to technology developed by third-party vendors (hereinafter referred to as "Original Vendors").</p>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">02. AI Autonomy Disclaimer</div>
        <h3 className="text-white font-bold text-lg mb-2">Algorithm Behavior</h3>
        <p className="mb-2 font-bold text-white/80">AI "Hallucinations" & Response Quality</p>
        <p>The Client acknowledges that AI models can occasionally produce inaccurate information, known as "hallucinations," or responses that may not align with expectations. Swarups NXT shall not be held responsible for the factual accuracy, sentiment, or quality of responses generated by the third-party AI bots.</p>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">03. Liability Limitations</div>
        <h3 className="text-white font-bold text-lg mb-2">Aggregate Liability Cap</h3>
        <p>To the maximum extent permitted by Indian Law, the total cumulative liability of Swarups NXT for any and all claims arising out of or related to these terms or the services, whether in contract, tort, or otherwise, shall not exceed the amount actually paid by the Client to Swarups NXT in the three (3) months immediately preceding the event giving rise to the claim.</p>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">04. Support Protocol</div>
        <h3 className="text-white font-bold text-lg mb-2">Maintenance SLA</h3>
        <p className="mb-2">Swarups NXT provides technical support during the following window:</p>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 inline-block">
          <p className="text-white font-mono font-bold">10:00 AM — 06:00 PM IST</p>
          <p className="text-xs">Monday to Friday (Excl. Public Holidays)</p>
        </div>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">05. System Integrity</div>
        <h3 className="text-white font-bold text-lg mb-2">No Uptime Guarantee</h3>
        <p>As a reseller, Swarups NXT does not control the underlying server infrastructure. Platform uptime and software stability are the sole responsibility of the Original Vendors. Swarups NXT makes no warranties regarding continuous availability.</p>
      </section>

      <section>
        <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">06. Legal Jurisdiction</div>
        <h3 className="text-white font-bold text-lg mb-2">Governing Law</h3>
        <p>These terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms, including any question regarding its existence, validity, or termination, shall be subject to the exclusive jurisdiction of the Courts in Chennai, Tamil Nadu, India.</p>
      </section>
    </div>
  </Modal>
);
