import React from 'react';

// Illustrative product mockups (ProductVisual.tsx), used when a product has no sample photo.
// Fictional "NXT ..." businesses, as in the voice demo; no figures, rates or results (CLAUDE.md
// hard rule 1).

const Bubble: React.FC<{ from: 'them' | 'me'; children: React.ReactNode; tag?: string }> = ({ from, children, tag }) => (
  <div className={`flex ${from === 'me' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug shadow-sm ${
        from === 'me'
          ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-slate-900 dark:text-white rounded-tr-sm'
          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm'
      }`}
    >
      {tag && <div className="text-[10px] font-black uppercase tracking-widest text-[#2BB6C6] mb-1">{tag}</div>}
      {children}
    </div>
  </div>
);

const Chip: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border ${
    active ? 'bg-[#2BB6C6] border-[#2BB6C6] text-[#0f172a]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
  }`}>
    {children}
  </span>
);

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const ChatHeader: React.FC<{ icon: string; name: string; sub: string; className?: string }> = ({ icon, name, sub, className = 'bg-[#075e54]' }) => (
  <div className={`flex items-center gap-3 px-4 py-3 text-white ${className}`}>
    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><i className={icon}></i></div>
    <div>
      <div className="text-sm font-bold leading-tight">{name}</div>
      <div className="text-[11px] opacity-80">{sub}</div>
    </div>
  </div>
);

export const WhatsAppCampaign: React.FC = () => (
  <Panel>
    <ChatHeader icon="fa-solid fa-store" name="NXT Store" sub="Business account" />
    <div className="p-4 space-y-3 bg-[#efeae2] dark:bg-[#0b141a]">
      <Bubble from="them">
        <div className="h-24 -mx-1 -mt-1 mb-2 rounded-xl bg-gradient-to-br from-[#2BB6C6] to-[#1e266e] flex items-center justify-center text-white gap-2 font-bold">
          <i className="fa-solid fa-gift"></i> Festive offers
        </div>
        Hi Priya, our festive sale starts today. Tap below to see the offers picked for you.
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/10 grid grid-cols-2 gap-2 text-center text-[12px] font-bold text-[#027eb5] dark:text-[#53bdeb]">
          <span>See offers</span><span>Talk to us</span>
        </div>
      </Bubble>
      <Bubble from="me">Do you have this in blue?</Bubble>
      <Bubble from="them" tag="AI reply">Yes, blue is in stock in all sizes. Shall I keep one aside for you?</Bubble>
    </div>
  </Panel>
);

export const SmsOtp: React.FC = () => (
  <div className="mx-auto w-full max-w-sm rounded-[2.5rem] bg-gradient-to-b from-[#1e266e] to-[#0f172a] p-5 shadow-xl">
    <div className="text-center text-white/80 text-sm font-semibold mb-6"><i className="fa-solid fa-lock mr-2"></i>Lock screen</div>
    <div className="space-y-3">
      {[
        { from: 'NXTSTR', text: '482913 is your OTP to log in to NXT Store. Do not share it with anyone.', tag: 'OTP' },
        { from: 'NXTSTR', text: 'Your NXT Store order is packed and on its way. Track it in the app.', tag: 'Alert' },
      ].map((n) => (
        <div key={n.tag} className="rounded-2xl bg-white/90 dark:bg-white/10 backdrop-blur p-3.5 text-slate-900 dark:text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black uppercase tracking-widest"><i className="fa-solid fa-comment-sms text-[#2BB6C6] mr-1.5"></i>{n.from}</span>
            <span className="text-[10px] font-bold text-[#2BB6C6] uppercase">{n.tag}</span>
          </div>
          <p className="text-[13px] leading-snug">{n.text}</p>
        </div>
      ))}
    </div>
    <div className="mt-5 flex justify-center gap-2">
      <Chip active><i className="fa-solid fa-check-double"></i> Delivered</Chip>
      <Chip>Transactional route</Chip>
    </div>
  </div>
);

export const VoiceAgentCall: React.FC = () => (
  <Panel>
    <div className="bg-gradient-to-br from-[#1e266e] to-[#0f172a] text-white p-5 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-[#2BB6C6] text-[#0f172a] flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-microphone-lines"></i></div>
      <div className="font-bold">NXT Clinic · AI receptionist</div>
      <div className="text-[12px] text-[#2BB6C6] font-semibold">On call</div>
      <div className="mt-3 flex items-end justify-center gap-1 h-6">
        {[3, 5, 2, 6, 4, 6, 3, 5, 2].map((h, i) => (
          <span key={i} className="w-1 rounded-full bg-[#2BB6C6]" style={{ height: `${h * 4}px` }}></span>
        ))}
      </div>
    </div>
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
      <Bubble from="me">Kal subah doctor available hain?</Bubble>
      <Bubble from="them" tag="AI agent">Haan ji, kal subah ka slot khali hai. Book kar doon?</Bubble>
      <Bubble from="me">Yes, please.</Bubble>
      <Bubble from="them" tag="AI agent">Done. You'll get a confirmation on WhatsApp.</Bubble>
    </div>
  </Panel>
);

export const WebsiteChatbot: React.FC = () => (
  <Panel>
    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-white/10">
      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
      <span className="ml-3 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">nxt-academy website</span>
    </div>
    <ChatHeader icon="fa-solid fa-comments" name="NXT Academy assistant" sub="Replies instantly" className="bg-[#1e266e]" />
    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
      <Bubble from="them" tag="AI chatbot">Hi! Looking for admission details?</Bubble>
      <Bubble from="me">Yes, for my son. What's the process?</Bubble>
      <Bubble from="them" tag="AI chatbot">Happy to help. May I have your name so I can share the details and book a campus visit?</Bubble>
      <div className="flex flex-wrap gap-2">
        <Chip active><i className="fa-regular fa-calendar"></i> Saturday morning</Chip>
        <Chip>Sunday morning</Chip>
      </div>
    </div>
  </Panel>
);

export const VoiceBlast: React.FC = () => (
  <div className="mx-auto w-full max-w-sm space-y-4">
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-4 flex items-center gap-3">
      <div className="w-11 h-11 shrink-0 rounded-full bg-[#2BB6C6] text-[#0f172a] flex items-center justify-center"><i className="fa-solid fa-play"></i></div>
      <div className="flex-1">
        <div className="text-sm font-bold text-slate-900 dark:text-white">NXT Motors: service reminder</div>
        <div className="mt-1.5 flex items-end gap-0.5 h-4">
          {[2, 4, 3, 5, 2, 4, 5, 3, 2, 4, 3, 5, 2, 3].map((h, i) => (
            <span key={i} className="w-1 rounded-full bg-[#2BB6C6]/70" style={{ height: `${h * 3}px` }}></span>
          ))}
        </div>
      </div>
      <Chip>Tamil</Chip>
    </div>
    <div className="flex justify-between px-2 text-[#2BB6C6]" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-arrow-down text-[10px] opacity-60"></i>
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
            <i className="fa-solid fa-mobile-screen"></i>
          </div>
        </div>
      ))}
    </div>
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-4">
      <div className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 mb-3">"Press 1 to book your service, press 2 for a callback."</div>
      <div className="grid grid-cols-3 gap-2 text-center text-sm font-bold">
        {['1', '2', '3'].map((k) => (
          <span key={k} className={`py-2 rounded-xl ${k === '1' ? 'bg-[#2BB6C6] text-[#0f172a]' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{k}</span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip active>Pressed 1</Chip><Chip>Answered</Chip><Chip>Missed</Chip>
      </div>
    </div>
  </div>
);

export const SocialBot: React.FC = () => (
  <Panel>
    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-white/10">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[2px]">
        <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-[10px] font-black text-slate-900 dark:text-white">NXT</div>
      </div>
      <span className="text-sm font-bold text-slate-900 dark:text-white">nxtstore</span>
      <i className="fa-brands fa-instagram ml-auto text-slate-400"></i>
    </div>
    <div className="h-24 bg-gradient-to-br from-[#2BB6C6]/40 to-[#1e266e]/60 flex items-center justify-center text-white font-bold gap-2">
      <i className="fa-solid fa-shirt"></i> New collection
    </div>
    <div className="p-4 space-y-3 text-[13px]">
      <div><span className="font-bold text-slate-900 dark:text-white">ananya</span> <span className="text-slate-700 dark:text-slate-300">Price please?</span></div>
      <div className="pl-4 border-l-2 border-[#2BB6C6]">
        <span className="font-bold text-slate-900 dark:text-white">nxtstore</span>{' '}
        <span className="text-slate-700 dark:text-slate-300">Hi Ananya! We've sent you the details in a DM.</span>
        <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-[#2BB6C6]">Auto-reply</span>
      </div>
      <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-3">
        <div className="text-[10px] font-black uppercase tracking-widest text-[#2BB6C6] mb-1"><i className="fa-regular fa-paper-plane mr-1"></i>Direct message</div>
        <p className="text-slate-800 dark:text-slate-100">Here are the prices and sizes for this look. Want us to keep one aside?</p>
        <div className="mt-2 flex gap-2"><Chip active>Shop now</Chip><Chip>Talk to the team</Chip></div>
      </div>
    </div>
  </Panel>
);

export const Automation: React.FC = () => {
  const steps = [
    { icon: 'fa-solid fa-file-lines', title: 'New enquiry from your website form' },
    { icon: 'fa-solid fa-table', title: 'Added to your lead sheet automatically' },
    { icon: 'fa-solid fa-bell', title: 'Follow-up reminder sent to the customer' },
    { icon: 'fa-solid fa-user-check', title: 'Your sales team is alerted' },
  ];
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-4 flex justify-center"><Chip active><i className="fa-solid fa-gears"></i> Runs automatically</Chip></div>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.title}>
            <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md p-3.5">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#2BB6C6]/10 text-[#2BB6C6] flex items-center justify-center"><i className={s.icon}></i></div>
              <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-100">{s.title}</span>
            </div>
            {i < steps.length - 1 && <div className="flex justify-center py-1 text-[#2BB6C6]"><i className="fa-solid fa-arrow-down text-xs"></i></div>}
          </li>
        ))}
      </ol>
    </div>
  );
};

export const ContactCenter: React.FC = () => {
  const queue = [
    { topic: 'Where is my order?', ai: true },
    { topic: 'Change delivery address', ai: true },
    { topic: 'Complaint about a damaged item', ai: false },
    { topic: 'Store opening hours', ai: true },
  ];
  return (
    <Panel>
      <div className="px-4 py-3 bg-[#1e266e] text-white flex items-center gap-2 text-sm font-bold">
        <i className="fa-solid fa-headset text-[#2BB6C6]"></i> Support queue
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-white/5">
        {queue.map((q) => (
          <li key={q.topic} className="flex items-center justify-between gap-3 px-4 py-3 text-[13px]">
            <span className="text-slate-800 dark:text-slate-100 font-medium">{q.topic}</span>
            {q.ai
              ? <span className="shrink-0 text-[11px] font-bold text-[#2BB6C6]"><i className="fa-solid fa-robot mr-1"></i>AI handled</span>
              : <span className="shrink-0 text-[11px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"><i className="fa-solid fa-user mr-1"></i>To agent</span>}
          </li>
        ))}
      </ul>
      <div className="m-4 mt-1 rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#2BB6C6] text-[#0f172a] flex items-center justify-center"><i className="fa-solid fa-headset"></i></div>
        <div className="text-[12px] text-slate-700 dark:text-slate-200"><span className="font-bold">Meena</span> is taking the complaint, with the customer's details already collected.</div>
      </div>
    </Panel>
  );
};

export const Omnichannel: React.FC = () => {
  const channels = [
    { icon: 'fa-solid fa-phone', name: 'Phone' },
    { icon: 'fa-brands fa-whatsapp', name: 'WhatsApp' },
    { icon: 'fa-solid fa-comments', name: 'Web chat' },
    { icon: 'fa-brands fa-instagram', name: 'Instagram' },
    { icon: 'fa-brands fa-facebook-messenger', name: 'Facebook' },
  ];
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="grid grid-cols-5 gap-2 mb-3">
        {channels.map((c) => (
          <div key={c.name} className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md flex items-center justify-center text-lg text-[#2BB6C6]"><i className={c.icon}></i></div>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{c.name}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 mb-3 text-[#2BB6C6]">
        {channels.map((c) => <div key={c.name} className="flex justify-center"><i className="fa-solid fa-arrow-down text-[10px] opacity-60"></i></div>)}
      </div>
      <div className="rounded-3xl bg-gradient-to-br from-[#1e266e] to-[#0f172a] text-white p-5 text-center shadow-xl">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#2BB6C6] text-[#0f172a] flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-robot"></i></div>
        <div className="font-bold">One AI assistant</div>
        <div className="text-[12px] text-slate-300 mt-1">Trained once on your business. The same answers on every channel.</div>
      </div>
      <div className="mt-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md p-3 text-[12px] text-slate-700 dark:text-slate-200 flex items-center gap-2">
        <i className="fa-solid fa-people-arrows text-[#2BB6C6]"></i> Conversations that need a person go to your team.
      </div>
    </div>
  );
};
