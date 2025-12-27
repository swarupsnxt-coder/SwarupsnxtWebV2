import React, { useState, useEffect, useRef } from 'react';
import { decodeBase64, decodeAudioData } from '../services/geminiService';

const VoiceStudio: React.FC = () => {
  const [industry, setIndustry] = useState('Real Estate');
  const [language, setLanguage] = useState('Indian English');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [personaKey, setPersonaKey] = useState('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [syncPercentage, setSyncPercentage] = useState(0);
  const [statusLogs, setStatusLogs] = useState<string[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const visualizerDataArrayRef = useRef<Uint8Array | null>(null);
  const particlesRef = useRef<any[]>([]);
  const currentRequestId = useRef<number>(0);

  const INDUSTRIES = ['Real Estate', 'Healthcare', 'Banking', 'Finance', 'E-commerce', 'EdTech'];
  const LANGUAGES = ['Indian English', 'US English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi', 'Punjabi'];
  
  const PERSONAS = {
    enthusiastic: {
      name: 'Enthusiastic',
      icon: 'fa-bolt',
      voices: { female: 'Kore', male: 'Fenrir' },
      directive: 'Speak cheerfully and with high energy:',
    },
    assertive: {
      name: 'Assertive',
      icon: 'fa-user-tie',
      voices: { female: 'Kore', male: 'Charon' },
      directive: 'Speak with authority and absolute confidence:',
    },
    calm: {
      name: 'Calm & Caring',
      icon: 'fa-leaf',
      voices: { female: 'Zephyr', male: 'Puck' },
      directive: 'Speak softly and with deep empathy:',
    },
    neutral: {
      name: 'Efficiency Pro',
      icon: 'fa-robot',
      voices: { female: 'Zephyr', male: 'Charon' },
      directive: 'Speak clearly and with professional neutrality:',
    }
  };

  const SCRIPTS: Record<string, Record<string, string>> = {
    'Real Estate': {
      'Indian English': "Hi! This is Swarup from Luxury Estates. I noticed you were looking at our 3 BHK penthouses. Would you like to schedule a site visit this weekend?",
      'US English': "Hey! Swarup here from Luxury Estates. Saw you checking out those penthouses. Ready for a private tour this Saturday?",
      'Hindi': "नमस्ते! मैं लक्ज़री एस्टेट्स से स्वरूप हूँ। मैंने देखा कि आप हमारे 3 BHK पेंटहाउस देख रहे थे। क्या आप इस सप्ताहांत साइट विजिट करना चाहेंगे?",
      'Tamil': "வணக்கம்! நான் லக்ஷ்ரி எஸ்டேட்ஸிலிருந்து ஸ்வரூப் பேசுகிறேன். எங்களின் 3 BHK வீடுகளைப் பார்த்ததற்கு நன்றி. இந்த வாரம் நேரில் பார்க்கலாமா?",
      'Telugu': "నమస్కారం! లగ్జరీ ఎస్టేట్స్ నుండి స్వరూప్ మాట్లాడుతున్నాను. మీరు మా 3 BHK ప్రాపర్టీ చూసినందుకు ధన్యవాదాలు. సైట్ విజిట్ ప్లాన్ చేద్దామా?",
      'Malayalam': "നമസ്കാരം! లక్ష్వറി ఎస్టేట్സിൽ നിന്ന് స్వరూప్ ആണ്. നിങ്ങൾ ഞങ്ങളുടെ 3 BHK ప్రొపర్టీ నోക്കിയത് ശ്രദ്ധിച്ചു. ఈ ఆഴ്ച సైట్ విసిట్ ప్లాన్ చేయట్టെയో?",
      'Kannada': "ನಮಸ್ಕಾರ! ಲಕ್ಸುರಿ ಎಸ್ಟೇಟ್ಸ್‌ನಿಂದ ಸ್ವರೂಪ್ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ನೀವು ನಮ್ಮ 3 BHK ಫ್ಲಾಟ್‌ಗಳನ್ನು ನೋಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಸೈಟ್ ವಿಸಿಟ್ ಮಾಡೋಣವೇ?",
      'Marathi': "नमस्कार! लक्झरी इस्टेट्स मधून स्वरूप बोलत आहे. तुम्ही आमचे 3 BHK पेंटहाउस पाहिले त्याबद्दल धन्यवाद. या आठवड्यात साइट व्हिजिट करायची का?",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਲਗਜ਼ਰੀ ਐਸਟੇਟ ਤੋਂ ਸਵਰੂਪ ਹਾਂ। ਸਾਡੇ 3 BHK ਪੈਂਟਹਾਊਸ ਦੇਖਣ ਲਈ ਧੰਨਵਾਦ। ਕੀ ਤੁਸੀਂ ਇਸ ਵੀਕੈਂਡ 'ਤੇ ਸਾਈਟ ਵਿਜ਼ਿਟ ਕਰਨਾ ਚਾਹੋਗੇ?"
    },
    'Healthcare': {
      'Indian English': "Hello, this is your health assistant from Swarup Clinic. I'm calling to confirm your appointment for tomorrow at 10 AM. Is this still convenient?",
      'US English': "Hi there, this is Swarup Clinic. Just checking in to confirm your 10 AM appointment tomorrow. Does that still work for you?",
      'Hindi': "नमस्ते, स्वरूप क्लिनिक से आपका हेल्थ असिस्टेंट बात कर रहा हूँ। कल सुबह 10 बजे के अपॉइंटमेंट की पुष्टि के लिए कॉल किया है। क्या यह आपके लिए सही है?",
      'Tamil': "வணக்கம், ஸ்வரூப் கிளினிக்கிலிருந்து அழைக்கிறேன். நாளை காலை 10 மணி சந்திப்பை உறுதிப்படுத்த விரும்புகிறேன். இது உங்களுக்கு வசதியாக இருக்குமா?",
      'Telugu': "నమస్కారం, స్వరూప్ క్లినిక్ నుండి కాల్ చేస్తున్నాను. రేపు ఉదయం 10 గంటలకు మీ అపాయింట్‌మెంట్‌ని కన్ఫర్మ్ చేయవచ్చా?",
      'Malayalam': "നമസ്കാരം, സ്വരൂപ് ക്ലിനിക്കിൽ നിന്ന് വിളിക്കുകയാണ്. നാളെ രാവിലെ 10 മണിക്കുള്ള നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് സ്ഥിരീകരിക്കാൻ ആഗ്രഹിക്കുന്നു.",
      'Kannada': "ನಮಸ್ಕಾರ, ಸ್ವರೂಪ್ ಕ್ಲಿನಿಕ್‌ನಿಂದ ಕರೆ ಮಾಡುತ್ತಿದ್ದೇವೆ. ನಾಳೆ ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಖಚಿತಪಡಿಸಬಹುದೇ?",
      'Marathi': "नमस्कार, स्वरूप क्लिनिकमधून बोलत आहे. उद्या सकाळी 10 वाजताची तुमची अपॉइंटमेंट कन्फर्म करण्यासाठी फोन केला आहे.",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਸਵਰੂਪ ਕਲੀਨਿਕ ਤੋਂ ਬੋਲ ਰਿਹਾ ਹਾਂ। ਕੱਲ੍ਹ ਸਵੇਰੇ 10 ਵਜੇ ਦੀ ਤੁਹਾਡੀ ਅਪੌਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਫ਼ੋਨ ਕੀਤਾ ਹੈ।"
    },
    'Banking': {
      'Indian English': "Greetings from NXT Finance. We've detected a high-value transaction on your corporate card. Did you authorize this payment?",
      'US English': "Hello, this is NXT Finance security. We noticed a large transaction on your business card. Can you confirm if you authorized this?",
      'Hindi': "NXT फाइनेंस से नमस्कार। आपके कार्ड पर एक बड़ा लेन-देवन देखा गया है। क्या आपने इसे अधिकृत किया है?",
      'Tamil': "NXT பைனான்ஸிலிருந்து வணக்கம். உங்கள் கார்டில் ஒரு பெரிய பரிவர்த்தனை நடந்துள்ளது. இதை நீங்கள் அங்கீகரித்தீர்களா?",
      'Telugu': "NXT ఫైనాన్స్ నుండి నమస్కారం. మీ కార్డ్‌లో ఒక పెద్ద లావాదేవీని గుర్తించాము. మీరు దీనిని ఆమోదించారా?",
      'Malayalam': "NXT ഫിനാൻസിൽ നിന്ന് നമസ്കാരം. നിങ്ങളുടെ കാർഡിൽ ഒരു വലിയ ഇടപാട് ഞങ്ങൾ കണ്ടെത്തി. നിങ്ങൾ ഇത് അംഗീകരിച്ചിട്ടുണ്ടോ?",
      'Kannada': "NXT ಫೈನಾನ್ಸ್‌ನಿಂದ ನಮಸ್ಕಾರ. ನಿಮ್ಮ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಹೆಚ್ಚಿನ ಮೌಲ್ಯದ ವಹಿವಾಟನ್ನು ಪತ್ತೆಹಚ್ಚಿದ್ದೇವೆ. ನೀವು ಇದಕ್ಕೆ ಅನುಮತಿ ನೀಡಿದ್ದೀರಾ?",
      'Marathi': "नमस्कार, NXT फायनान्सकडून. तुमच्या कार्डवर एक मोठा व्यवहार झाला आहे. तुम्ही या पेमेंटला परवानगी दिली आहे का?",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, NXT ਫਾਈਨਾਂਸ ਤੋਂ। ਅਸੀਂ ਤੁਹਾਡੇ ਕਾਰਡ 'ਤੇ ਇੱਕ ਵੱਡਾ ਲੈਣ-ਦੇਣ ਦੇਖਿਆ ਹੈ। ਕੀ ਤੁਸੀਂ ਇਸਦੀ ਇਜਾਜ਼ਤ ਦਿੱਤੀ ਹੈ?"
    },
    'Finance': {
      'Indian English': "Hello, your quarterly portfolio review is ready. Would you like me to highlight the top-performing assets?",
      'US English': "Hi, your quarterly portfolio report is in. Want me to walk you through the top-performing assets in your account?",
      'Hindi': "नमस्ते, आपकी तिमाही पोर्टफोलियो समीक्षा तैयार है। क्या आप चाहते हैं कि मैं सबसे अच्छा प्रदर्शन करने वाली संपत्तियों पर प्रकाश डालूँ?",
      'Tamil': "வணக்கம், உங்கள் காலாண்டு போர்ட்ஃபோலியோ அறிக்கை தயாராக உள்ளது. சிறப்பாகச் செயல்படும் சொத்துக்களைப் பற்றி நான் விளக்கலாமா?",
      'Telugu': "నమస్కారం, మీ త్రైమాసిక పోర్ట్‌ఫోలియో సమీక్ష సిద్ధంగా ఉంది. ఉత్తమంగా పనిచేస్తున్న ఆస్తుల గురించి నేను వివరించాలా?",
      'Malayalam': "നമസ്കാരം, നിങ്ങളുടെ ത്രൈമാസ പോർട്ട്ഫോളിയോ അവലോകനം തയ്യാറാണ്. മികച്ച പ്രകടനം കാഴ്ചവെക്കുന്ന അസറ്റുകളെക്കുറിച്ച് ഞാൻ വിശദീകരിക്കട്ടെയോ?",
      'Kannada': "ನಮಸ್ಕಾರ, ನಿಮ್ಮ ತ್ರೈಮಾಸಿಕ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ವಿಮರ್ಶೆ ಸಿದ್ಧವಾಗಿದೆ. ಉತ್ತಮವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಆಸ್ತಿಗಳ ಬಗ್ಗೆ ನಾನು ವಿವರಿಸಲೇ?",
      'Marathi': "नमस्कार, तुमचा त्रैमासिक पोर्टफोलिओ रिव्ह्यू तयार आहे. मी सर्वोत्तम कामगिरी करणाऱ्या मालमत्तांबद्दल सांगू का?",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਤੁਹਾਡੀ ਤਿਮਾਹੀ ਪੋਰਟਫੋਲੀਓ ਸਮੀਖਿਆ ਤਿਆਰ ਹੈ। ਕੀ ਤੁਸੀਂ ਚਾਹੁੰਦੇ ਹੋ ਕਿ ਮੈਂ ਵਧੀਆ ਪ੍ਰਦਰਸ਼ਨ ਕਰਨ ਵਾਲੀਆਂ ਸੰਪਤੀਆਂ ਬਾਰੇ ਦੱਸਾਂ?"
    },
    'E-commerce': {
      'Indian English': "Hi! Your order from Swarup Shop is out for delivery. Our agent will reach you within 2 hours. Please keep your OTP ready.",
      'US English': "Hey there! Your order from Swarup Shop is on its way and should arrive in about 2 hours. Please have your confirmation code ready.",
      'Hindi': "नमस्ते! स्वरूप शॉप से आपका ऑर्डर डिलीवरी के लिए निकल चुका है। हमारा एजेंट 2 घंटे में आप तक पहुँच जाएगा। कृपया अपना ओटीपी तैयार रखें।",
      'Tamil': "வணக்கம்! உங்கள் ஆர்டர் டெலிவரிக்கு வந்துவிட்டது. தயவுசெய்து உங்கள் OTP-யை தயாராக வைத்திருக்கவும்.",
      'Telugu': "హాయ్! స్వరూప్ షాప్ నుండి మీ ఆర్డర్ డెలివరీకి బయలుదేరింది. మా ఏజెంట్ 2 గంటల్లో మీ దగ్గరకు చేరుకుంటారు. దయచేసి మీ OTP సిద్ధంగా ఉంచుకోండి.",
      'Malayalam': "ഹായ്! സ്വരൂപ് ഷോപ്പിൽ നിന്നുള്ള നിങ്ങളുടെ ഓർഡർ ഡെലിവറിക്കായി പുറപ്പെട്ടു. ഏജന്റ് 2 മണിക്കൂറിനുള്ളിൽ എത്തും. ദയവായി OTP തയ്യാറാക്കി വെക്കുക.",
      'Kannada': "ಹಾಯ್! ಸ್ವರೂಪ್ ಶಾಪ್‌ನಿಂದ ನಿಮ್ಮ ಆರ್ಡರ್ ಡೆಲಿವರಿಗಾಗಿ ಹೊರಟಿದೆ. 2 ಗಂಟೆಯೊಳಗೆ ಏಜೆಂಟ್ ಬರುತ್ತಾರೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ OTP ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.",
      'Marathi': "नमस्कार! स्वरूप शॉपवरून तुमची ऑर्डर डिलिव्हरीसाठी निघाली आहे. कृपया तुमचा OTP तयार ठेवा.",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਸਵਰੂਪ ਸ਼ਾਪ ਤੋਂ ਤੁਹਾਡਾ ਆਰਡਰ ਡਿਲੀਵਰੀ ਲਈ ਨਿਕਲ ਚੁੱਕਾ ਹੈ। ਸਾਡਾ ਏਜੰਟ 2 ਘੰਟਿਆਂ ਵਿੱਚ ਪਹੁੰਚ ਜਾਵੇਗਾ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ OTP ਤਿਆਰ ਰੱਖੋ।"
    },
    'EdTech': {
      'Indian English': "Hi, this is Atlas from NXT Academy. You've successfully unlocked the AI module. Ready to start your first lesson?",
      'US English': "Hi, I'm Atlas from NXT Academy. Congrats, you've unlocked the AI module! Are you ready to dive into your first lesson?",
      'Hindi': "हाय, मैं NXT एकेडमी से एटलस बोल रहा हूँ। आपने एआई मॉड्यूल को सफलतापूर्वक अनलॉक कर लिया है। क्या आप अपना पहला पाठ शुरू करने के लिए तैयार हैं?",
      'Tamil': "வணக்கம், நான் NXT அகாடமியிலிருந்து அட்லஸ் பேசுகிறேன். நீங்கள் AI பாடத்திட்டத்தை வெற்றிகரமாகத் திறந்துவிட்டீர்கள். முதல் பாடத்தைத் தொடங்கலாமா?",
      'Telugu': "హాయ్, నేను NXT అకాడమీ నుండి అట్లాస్ మాట్లాడుతున్నాను. మీరు AI మాడ్యూల్‌ను అన్‌లాక్ చేసారు. మొదటి పాఠం ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
      'Malayalam': "ഹായ്, NXT అకాడమీలో నుంచి అറ്റ്‌లస్ ആണ്. നിങ്ങൾ AI മൊഡ്യൂൾ വിജയകരമായി അൺലോക്ക് ചെയ്തു. ആദ്യ പാഠം തുടങ്ങാൻ തയ്യാറാണോ?",
      'Kannada': "ಹಾಯ್, ನಾನು NXT ಅಕಾಡೆಮಿಯಿಂದ ಅಟ್ಲಾಸ್ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ನೀವು AI ಮಾಡ್ಯೂಲ್ ಅನ್ನು ಅನ್ಲಾಕ್ ಮಾಡಿದ್ದೀರಿ. ಮೊದಲ ಪಾಠವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
      'Marathi': "नमस्कार, मी NXT अकॅडमीमधून ॲटलस बोलत आहे. तुम्ही AI मॉड्यूल यशस्वीरित्या अनलॉक केले आहे. पहिला धडा सुरू करायचा का?",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ NXT ਅਕੈਡਮੀ ਤੋਂ ਐਟਲਸ ਹਾਂ। ਤੁਸੀਂ AI ਮੋਡਿਊਲ ਨੂੰ ਸਫਲਤਾਪੂਰਵਕ ਅਨਲੌਕ ਕਰ ਲਿਆ ਹੈ। ਕੀ ਤੁਸੀਂ ਪਹਿਲਾ ਪਾਠ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?"
    }
  };

  const getScript = () => {
    const industryData = SCRIPTS[industry] || SCRIPTS['Real Estate'];
    const text = industryData[language] || industryData['Indian English'] || Object.values(industryData)[0] || "System operational. Neural link active.";
    return text;
  };

  const addLog = (msg: string) => {
    setStatusLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg.toUpperCase()}`, ...prev.slice(0, 1)]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        const pts = [];
        for (let i = 0; i < 50; i++) {
          pts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1
          });
        }
        particlesRef.current = pts;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let audioLevel = 0;

      if (isPlaying && analyserRef.current && visualizerDataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(visualizerDataArrayRef.current);
        const sum = visualizerDataArrayRef.current.reduce((a, b) => a + b, 0);
        audioLevel = sum / (visualizerDataArrayRef.current.length * 1.2);
      } else if (isBuffering) {
        audioLevel = 15 + Math.sin(Date.now() / 80) * 12;
      }

      ctx.lineWidth = 0.5;
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const speedMultiplier = 1 + (audioLevel / 12);
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + audioLevel / 25), 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(34, 211, 238, ${p.opacity})` : `rgba(30, 38, 148, ${p.opacity + 0.2})`;
        ctx.fill();
      }

      const coreSize = 30 + (audioLevel / 1.5);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 4);
      
      if (isPlaying) {
        gradient.addColorStop(0, isDark ? 'rgba(34, 211, 238, 0.8)' : 'rgba(43, 182, 198, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (isBuffering) {
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, isBuffering]);

  const stopAudio = () => {
    currentRequestId.current += 1;
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch (e) {}
      sourceRef.current = null;
    }
    setIsPlaying(false);
    setIsBuffering(false);
    setSyncPercentage(0);
  };

  const handleAction = async () => {
    if (isPlaying || isBuffering) { 
      stopAudio(); 
      return; 
    }

    const reqId = ++currentRequestId.current;
    const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
    const script = getScript();
    const voiceName = persona.voices[gender];
    const fullPrompt = `${persona.directive} ${script}`;
    
    setIsBuffering(true);
    setSyncPercentage(30);
    addLog(`Neural synthesis for ${language}...`);

    try {
      // Routing through Cloudflare Pages API function for secure key handling
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: fullPrompt, voiceName })
      });

      if (!response.ok) {
        throw new Error("Vocal engine connection failed.");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      const base64Audio = data.base64Audio;
      
      if (reqId !== currentRequestId.current) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      
      const audioBytes = decodeBase64(base64Audio);
      const buffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
      
      if (!analyserRef.current) {
        analyserRef.current = ctx.createAnalyser();
        analyserRef.current.fftSize = 64;
        visualizerDataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
      source.onended = () => { 
        if (reqId === currentRequestId.current) {
          setIsPlaying(false); 
          addLog("Transmission finished."); 
        }
      };
      sourceRef.current = source;
      
      setSyncPercentage(100);
      setIsBuffering(false);
      setIsPlaying(true);
      source.start();
    } catch (e: any) {
      console.error("Vocal Engine Failed:", e);
      setIsBuffering(false);
      addLog(`Error: ${e.message || 'Transmission failed'}`);
    }
  };

  return (
    <div id="voice-studio" className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col gap-8 h-full transition-all duration-500">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4 self-start">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-500 shadow-lg ${isBuffering ? 'bg-purple-600 animate-pulse shadow-purple-500/30' : 'bg-accent-500 shadow-accent-500/20'}`}>
              <i className={`fa-solid ${isBuffering ? 'fa-dna' : 'fa-brain-circuit'} text-xl`}></i>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">NXT Vocal Engine</h3>
            <p className="text-[9px] font-bold uppercase tracking-widest text-accent-500">Neural-Audio Interface Active</p>
          </div>
        </div>
        <div className="flex gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Low Latency Core</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="bg-slate-50/80 dark:bg-slate-950/40 rounded-[2.5rem] p-6 md:p-8 border border-slate-200 dark:border-white/5 flex flex-col gap-6 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Industry</label>
                <select 
                  value={industry} 
                  onChange={(e) => { setIndustry(e.target.value); stopAudio(); }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-accent-500 transition-colors"
                  disabled={isBuffering}
                >
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Language</label>
                <select 
                  value={language} 
                  onChange={(e) => { setLanguage(e.target.value); stopAudio(); }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-accent-500 transition-colors"
                  disabled={isBuffering}
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vocal DNA</label>
                <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-2xl">
                  <button onClick={() => { setGender('female'); stopAudio(); }} disabled={isBuffering} className={`px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${gender === 'female' ? 'bg-white text-[#1e266e] shadow-md dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}>Female</button>
                  <button onClick={() => { setGender('male'); stopAudio(); }} disabled={isBuffering} className={`px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${gender === 'male' ? 'bg-white text-[#1e266e] shadow-md dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}>Male</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PERSONAS).map(([key, v]) => (
                  <button 
                    key={key}
                    onClick={() => { setPersonaKey(key); stopAudio(); }}
                    disabled={isBuffering}
                    className={`p-4 rounded-[1.5rem] text-[10px] font-black border transition-all flex items-center gap-3 ${personaKey === key ? 'bg-[#1e266e] text-white border-[#1e266e] shadow-lg scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 dark:bg-slate-800 dark:border-white/5 dark:text-slate-400 hover:border-accent-500/50'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${personaKey === key ? 'bg-accent-500 text-[#1e266e]' : 'bg-slate-100 dark:bg-slate-900'}`}>
                      <i className={`fa-solid ${v.icon}`}></i>
                    </div>
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5 font-mono text-[9px] border border-white/5 h-20 flex flex-col justify-center relative overflow-hidden shadow-2xl">
             <div className="flex gap-3 items-center mb-1">
                <div className={`w-2 h-2 rounded-full ${isBuffering ? 'bg-purple-500 animate-ping' : isPlaying ? 'bg-accent-500 animate-pulse' : 'bg-slate-700'}`}></div>
                <span className="text-slate-500 uppercase">Status:</span>
                <span className="text-accent-400">{statusLogs[0] || 'READY FOR UPLINK'}</span>
             </div>
             {isBuffering && (
               <div className="absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-all duration-300" style={{ width: `${syncPercentage}%` }}></div>
             )}
             <div className="text-[8px] text-slate-600 mt-1">LATENCY: {isPlaying ? '184ms' : '0ms'} | QUALITY: 48KHZ PCM</div>
          </div>
        </div>

        <div className="lg:w-1/2 relative rounded-[3rem] bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 min-h-[400px] shadow-inner">
          <div className="absolute inset-0 pointer-events-none">
             <canvas ref={canvasRef} className="w-full h-full opacity-80" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <button 
              onClick={handleAction}
              disabled={isBuffering}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 transform hover:scale-110 active:scale-95 z-20 border-4 ${isPlaying || isBuffering ? 'bg-white border-accent-400 shadow-[0_0_80px_rgba(43,182,198,0.5)]' : 'bg-[#1e266e] border-white/10 text-white shadow-2xl'}`}
            >
              {isBuffering ? (
                <i className="fa-solid fa-circle-notch fa-spin text-accent-500 text-4xl"></i>
              ) : isPlaying ? (
                <i className="fa-solid fa-stop text-[#1e266e] text-4xl opacity-100 relative drop-shadow-sm"></i>
              ) : (
                <i className="fa-solid fa-play text-white text-4xl ml-2 opacity-100 relative drop-shadow-lg"></i>
              )}
            </button>

            {(isPlaying || isBuffering) && (
              <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl max-w-[280px] text-center animate-fadeIn z-10">
                <div className="text-[8px] font-black text-accent-500 uppercase tracking-widest mb-3">Live Transcript</div>
                <p className="text-xs text-slate-900 dark:text-gray-100 font-bold italic leading-relaxed">
                   {isBuffering ? "Neural matrix aligning..." : `"${getScript()}"`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;