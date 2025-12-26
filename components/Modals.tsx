
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
      <div className="p-8 text-slate-400 text-sm leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyModal: React.FC<ModalProps> = ({ onClose }) => (
  <Modal title="Privacy Protocol" onClose={onClose}>
    <h3 className="text-white font-bold">DPDP Act 2023 Compliance</h3>
    <p>We strictly adhere to the Digital Personal Data Protection Act (DPDP) 2023 of India. All customer data used for neural training is anonymized and encrypted at rest using AES-256 standards.</p>
    <h3 className="text-white font-bold">Data Sovereignty</h3>
    <p>Swarups NXT ensures that data residency remains within specified geographical boundaries. We do not sell or lease user interaction data to third-party advertisers.</p>
    <h3 className="text-white font-bold">User Consent</h3>
    <p>Interaction logs are stored only for quality assurance and can be purged upon request through the 'Right to be Forgotten' protocol in your dashboard.</p>
  </Modal>
);

export const SecurityModal: React.FC<ModalProps> = ({ onClose }) => (
  <Modal title="Security Protocol" onClose={onClose}>
    <h3 className="text-white font-bold">Encryption Standards</h3>
    <p>All voice streams are encrypted via SRTP (Secure Real-time Transport Protocol). API handshakes utilize TLS 1.3 with Perfect Forward Secrecy.</p>
    <h3 className="text-white font-bold">Neural Vault</h3>
    <p>Your custom knowledge bases are stored in a 'Neural Vault'—an isolated environment with hardware-level memory encryption.</p>
    <h3 className="text-white font-bold">Compliance</h3>
    <p>NXT is SOC2 Type II and HIPAA ready. Regular penetration tests are conducted by independent neural security firms to ensure zero-day protection.</p>
  </Modal>
);
