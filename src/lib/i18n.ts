export type Lang = "en" | "fr";

export const dict = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      tools: "Tools",
      certs: "Certifications",
      education: "Education",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Digital Marketing Specialist",
      name: "Sara Hassib",
      subtitle:
        "I help businesses grow through paid advertising, marketing strategy and creative digital solutions.",
      cv: "Download CV",
      contact: "Contact Me",
    },
    about: {
      title: "About Me",
      body: "Passionate Digital Marketing Specialist with experience in paid advertising, social media management, content strategy and AI-powered marketing tools. I enjoy creating high-performing campaigns that help businesses increase visibility, generate leads and improve ROI.",
      stats: [
        { value: 30, suffix: "+", label: "Campaigns Launched" },
        { value: 5, suffix: "+", label: "Ad Platforms" },
        { value: 15, suffix: "+", label: "AI & Creative Tools" },
        { value: 3, suffix: "x", label: "Average ROAS Uplift" },
      ],
    },
    skills: { title: "Skills & Toolkit", subtitle: "A blend of strategy, performance and craft." },
    tools: { title: "Tools I Use", subtitle: "The platforms and software behind every campaign." },
    certs: {
      title: "Certifications",
      subtitle: "Continuous learning across paid media, analytics and strategy.",
      view: "View Certificate",
    },
    education: { title: "Education", subtitle: "Academic foundations." },
    projects: {
      title: "Personal Projects",
      subtitle: "Selected personal work exploring campaigns, brand and product.",
      view: "View Project",
      github: "GitHub",
    },
    experience: { title: "Experience", subtitle: "Where I've grown as a marketer." },
    contact: {
      title: "Let's work together",
      subtitle: "Have a brief, a role or an idea? I'd love to hear about it.",
      name: "Your name",
      email: "Email address",
      message: "Tell me about your project",
      send: "Send message",
      sent: "Thanks! I'll get back to you shortly.",
    },
    footer: { rights: "All rights reserved." },
  },
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      tools: "Outils",
      certs: "Certifications",
      education: "Formation",
      projects: "Projets",
      experience: "Expérience",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Spécialiste Marketing Digital",
      name: "Sara Hassib",
      subtitle:
        "J'aide les entreprises à se développer grâce à la publicité payante, à la stratégie marketing et à des solutions digitales créatives.",
      cv: "Télécharger le CV",
      contact: "Me contacter",
    },
    about: {
      title: "À propos",
      body: "Spécialiste passionnée du marketing digital, avec de l'expérience en publicité payante, gestion des réseaux sociaux, stratégie de contenu et outils IA. J'aime créer des campagnes performantes qui augmentent la visibilité, génèrent des leads et améliorent le ROI.",
      stats: [
        { value: 30, suffix: "+", label: "Campagnes lancées" },
        { value: 5, suffix: "+", label: "Plateformes Ads" },
        { value: 15, suffix: "+", label: "Outils IA & créatifs" },
        { value: 3, suffix: "x", label: "Hausse ROAS moyenne" },
      ],
    },
    skills: {
      title: "Compétences & outils",
      subtitle: "Un mélange de stratégie, de performance et de créativité.",
    },
    tools: {
      title: "Mes outils",
      subtitle: "Les plateformes et logiciels derrière chaque campagne.",
    },
    certs: {
      title: "Certifications",
      subtitle: "Apprentissage continu en média payant, analytics et stratégie.",
      view: "Voir le certificat",
    },
    education: { title: "Formation", subtitle: "Bases académiques." },
    projects: {
      title: "Projets personnels",
      subtitle: "Une sélection de travaux personnels : campagnes, marque et produit.",
      view: "Voir le projet",
      github: "GitHub",
    },
    experience: { title: "Expérience", subtitle: "Mon parcours en marketing." },
    contact: {
      title: "Travaillons ensemble",
      subtitle: "Un brief, un poste ou une idée ? J'ai hâte d'en discuter.",
      name: "Votre nom",
      email: "Adresse email",
      message: "Parlez-moi de votre projet",
      send: "Envoyer",
      sent: "Merci ! Je vous réponds très vite.",
    },
    footer: { rights: "Tous droits réservés." },
  },
} as const;
