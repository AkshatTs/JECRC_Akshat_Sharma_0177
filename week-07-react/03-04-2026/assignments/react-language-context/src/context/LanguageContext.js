import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const LanguageContext = createContext();

// 2. Translation Dictionary
const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navLogin: "Login",
    navRegister: "Register",
    homeTitle: "Welcome to Our Platform",
    homeDesc: "Delivering enterprise-level solutions with seamless global integration.",
    aboutTitle: "About Us",
    aboutDesc: "We are a leading tech company committed to excellence and innovation.",
    loginTitle: "Account Login",
    registerTitle: "Create an Account",
    emailLabel: "Email Address",
    passLabel: "Password",
    nameLabel: "Full Name",
    submitBtn: "Submit",
    logo: "Language Demo"
  },
  ta: {
    navHome: "முகப்பு",
    navAbout: "பற்றி",
    navLogin: "உள்நுழைய",
    navRegister: "பதிவு செய்",
    homeTitle: "எங்கள் தளத்திற்கு வரவேற்கிறோம்",
    homeDesc: "தடையற்ற உலகளாவிய ஒருங்கிணைப்புடன் நிறுவன அளவிலான தீர்வுகளை வழங்குதல்.",
    aboutTitle: "எங்களை பற்றி",
    aboutDesc: "நாங்கள் ஒரு முன்னணி தொழில்நுட்ப நிறுவனம், சிறந்து விளங்கவும் புதுமைக்கும் உறுதிபூண்டுள்ளோம்.",
    loginTitle: "கணக்கு உள்நுழைவு",
    registerTitle: "கணக்கை உருவாக்கவும்",
    emailLabel: "மின்னஞ்சல் முகவரி",
    passLabel: "கடவுச்சொல்",
    nameLabel: "முழு பெயர்",
    submitBtn: "சமர்ப்பிக்கவும்",
    logo: "மொழி டெமோ"
  },
  fr: {
    navHome: "Accueil",
    navAbout: "À Propos",
    navLogin: "Connexion",
    navRegister: "S'inscrire",
    homeTitle: "Bienvenue sur Notre Plateforme",
    homeDesc: "Fournir des solutions d'entreprise avec une intégration mondiale fluide.",
    aboutTitle: "À Propos de Nous",
    aboutDesc: "Nous sommes une entreprise technologique de premier plan engagée envers l'excellence.",
    loginTitle: "Connexion au Compte",
    registerTitle: "Créer un Compte",
    emailLabel: "Adresse e-mail",
    passLabel: "Mot de passe",
    nameLabel: "Nom Complet",
    submitBtn: "Soumettre",
    logo: "Démo de Langue"
  },
  hi: {
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navLogin: "लॉगिन",
    navRegister: "पंजीकरण",
    homeTitle: "हमारे प्लेटफॉर्म पर आपका स्वागत है",
    homeDesc: "निर्बाध वैश्विक एकीकरण के साथ उद्यम-स्तर के समाधान प्रदान करना।",
    aboutTitle: "हमारे बारे में",
    aboutDesc: "हम उत्कृष्टता और नवाचार के लिए प्रतिबद्ध एक अग्रणी तकनीकी कंपनी हैं।",
    loginTitle: "अकाउंट लॉगिन",
    registerTitle: "खाता बनाएं",
    emailLabel: "ईमेल पता",
    passLabel: "पासवर्ड",
    nameLabel: "पूरा नाम",
    submitBtn: "जमा करें",
    logo: "भाषा डेमो"
  }
};

// 3. Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Helper function to get the translated text based on the key
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 4. Custom Hook for easy usage in components
export const useLanguage = () => {
  return useContext(LanguageContext);
};