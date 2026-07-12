import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReveal } from "@/hooks/use-reveal";
import { dict, type Lang } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import heroImg from "@/assets/hero-illustration.png";
import certImg from "@/assets/cert-placeholder.jpg";
import proj1 from "@/assets/project-1.jpg";
import proj2 from "@/assets/project-2.jpg";
import proj3 from "@/assets/project-3.jpg";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ArrowUpRight,
  Megaphone,
  Target,
  BarChart3,
  Palette,
  Sparkles,
  Code2,
  GraduationCap,
  Briefcase,
  Send,
  Instagram,
  Globe,
} from "lucide-react";

/* ---------- data ---------- */

const defaultSkillGroups = [
  {
    icon: Megaphone,
    title: "Paid Advertising",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "Snapchat Ads", "LinkedIn Ads"],
  },
  {
    icon: Target,
    title: "Marketing",
    items: [
      "Digital Strategy",
      "Lead Generation",
      "Funnel Strategy",
      "Social Media",
      "Community Mgmt.",
      "Content Strategy",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    items: ["Google Analytics 4", "Meta Pixel", "Google Tag Manager", "Looker Studio"],
  },
  { icon: Palette, title: "Creative", items: ["Canva", "Adobe Photoshop", "CapCut", "Figma"] },
  {
    icon: Sparkles,
    title: "AI Tools",
    items: ["ChatGPT", "Gemini", "Claude", "Midjourney", "Lovable", "Notion AI"],
  },
  {
    icon: Code2,
    title: "Technical",
    items: ["HTML", "CSS", "JavaScript", "WordPress", "SEO Basics"],
  },
];

const defaultTools = [
  {
    name: "Figma",
    svg: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "Meta Business Suite",
    svg: "M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12.04c0-5.52-4.48-10-10-10z",
  },
  {
    name: "Canva",
    svg: "M7.5 2.14A5.36 5.36 0 0 0 2.14 7.5c0 1.44.47 2.77 1.26 3.87L12 2.14 7.5 2.14zM12 2.14l4.76 9.23c.79-1.1 1.26-2.43 1.26-3.87A5.36 5.36 0 0 0 12 2.14zM2.14 12l9.23 4.76-4.76-9.23L2.14 12zM12 21.86a5.36 5.36 0 0 0 5.36-5.36c0-1.44-.47-2.77-1.26-3.87L12 21.86zM12 21.86l-4.76-9.23c-.79 1.1-1.26 2.43-1.26 3.87A5.36 5.36 0 0 0 12 21.86zM21.86 12l-9.23-4.76 4.76 9.23L21.86 12z",
  },
  {
    name: "ChatGPT",
    svg: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z",
  },
  {
    name: "Claude AI",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    name: "Google Analytics",
    svg: "M22.16 11.42l-9.58 9.58a7.96 7.96 0 0 1-2.33.83A8 8 0 1 1 17.63 2.42a7.96 7.96 0 0 1 .83-2.33 8 8 0 0 1 12.7 11.33z",
  },
  {
    name: "Google Ads",
    svg: "M12.013 3.988L7.35 8.65a4.186 4.186 0 0 0 0 5.92l4.663 4.663a4.186 4.186 0 0 0 5.92 0l4.663-4.663a4.186 4.186 0 0 0 0-5.92L17.933 3.988a4.186 4.186 0 0 0-5.92 0z",
  },
  {
    name: "Meta Ads Manager",
    svg: "M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12.04c0-5.52-4.48-10-10-10z",
  },
  { name: "CapCut", svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  {
    name: "Photoshop",
    svg: "M9.08 3.56L4.88 21h3.1l1.2-5.2h.02L10.4 21h3.18l4.2-17.44h-3.2l-2.75 11.8h-.02L11.56 3.56H9.08zM19.76 16.2c-.6 1.2-1.4 2-2.4 2.4-.6.3-1.3.4-2 .4-1.5 0-2.6-.5-3.2-1.5.6 0 1.1-.1 1.5-.4.4-.3.7-.6.9-1 .2-.4.3-.8.3-1.3 0-.2 0-.4-.1-.5-.1-.2-.2-.3-.4-.5-.2-.2-.4-.3-.7-.4-.3-.1-.6-.2-1-.2l-.8-.1c-.2 0-.3-.1-.5-.2-.1-.1-.2-.2-.2-.4 0-.3.1-.6.3-.8.2-.3.5-.5.9-.6.4-.2.9-.2 1.5-.2.4 0 .8 0 1.3.1.5.1.9.2 1.3.4.4.2.7.4 1 .7.3.3.5.6.7 1 .2.3.2.7.2 1 0 .7-.2 1.3-.5 1.8z",
  },
  { name: "Illustrator", svg: "M15.2 3H20v16h-4.8V3zM6.8 3H12v16H6.8V3zM1.6 3h3.2v16H1.6V3z" },
  {
    name: "VS Code",
    svg: "M17.583 3.017L12.045 8.555l-5.538-5.538L4.37 4.359l3.137 3.137L4.37 10.633l2.137 2.137 5.538-5.538 5.538 5.538 2.137-2.137-5.538-5.538 5.538-5.538-2.137-2.137z",
  },
  {
    name: "GitHub",
    svg: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "Notion",
    svg: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.2 2.16c-.42-.326-.98-.7-2.055-.607l-12.8.934c-.466.047-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.449.327s0 .84-1.168.84l-3.222.187c-.093-.187 0-.653.327-.746l.84-.233V9.854c0-.654.14-1.168.934-1.168l.84-.187v10.03l-1.449.14c-.093.84.28 1.12 1.073 1.12l2.34.187c1.78 0 2.78-.887 2.78-2.572V9.06l-.84-.047zM6.11 19.197l10.078-.56c.327-.653.186-1.167-.467-1.26L7.557 16.56c-.654-.094-1.214.28-1.12 1.074zm.84-4.247l10.358-.607c.373-.094.467-.327.327-.653l-.98-2.987c-.14-.327-.467-.467-.84-.374L6.67 11.053c-.466.187-.56.467-.186.84z",
  },
  {
    name: "TikTok",
    svg: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "Snapchat",
    svg: "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.085-.023.18-.054.275-.054.135 0 .285.036.45.09.53.185.854.435 1.213.745l.06.06c.18.18.39.375.735.585.15.09.3.165.465.225.33.12.735.195 1.17.135a.655.655 0 0 1 .165.06c.255.105.465.285.57.555.03.075.045.15.06.225.06.225-.045.45-.15.585-.375.48-.96.69-1.38.795-.09.03-.18.06-.255.075-.36.075-.66.225-.87.42-.03.03-.045.06-.075.09-.165.225-.345.48-.72.63-.435.18-1.035.24-1.575.285l-.105.015c-.135.015-.255.03-.375.045-.255.03-.48.075-.675.3-.075.09-.135.195-.18.3-.06.135-.09.285-.105.435-.015.15-.015.315.015.48.045.27.135.54.21.765.015.03.015.075.03.105.09.24.195.465.27.66.015.045.03.075.03.12.03.165.045.315.045.45 0 .3-.06.555-.165.78-.015.03-.03.06-.045.09-.195.345-.45.63-.735.84-.225.165-.465.285-.705.36-.135.045-.27.075-.39.09-.3.03-.54.165-.675.405a.71.71 0 0 0-.075.18c-.015.06-.03.135-.03.21-.06.42-.27.72-.555.93-.165.12-.345.21-.525.27-.3.09-.585.135-.855.15-.15.015-.3.015-.435.03-.255.03-.465.135-.615.345a.82.82 0 0 0-.12.255c-.03.09-.06.195-.06.3 0 .075.015.165.03.255.045.27.135.53.21.72.015.03.015.075.03.105.045.165.09.315.12.435.015.06.03.12.03.18.015.15.015.285.015.42v.105c-.03.27-.09.54-.165.78-.015.045-.015.09-.03.135-.09.27-.195.525-.33.75-.06.09-.12.18-.195.255-.165.165-.36.285-.57.36-.06.03-.12.045-.18.06-.3.06-.555.18-.72.39-.06.075-.105.165-.15.255-.135.27-.27.54-.435.75-.09.12-.195.21-.3.3-.255.21-.54.33-.84.39-.06.015-.12.03-.18.03-.225.03-.42.135-.54.33-.015.03-.045.06-.06.09-.105.18-.21.375-.33.555-.09.135-.195.255-.3.36-.24.21-.51.33-.795.39a.97.97 0 0 1-.15.015c-.105 0-.21-.015-.315-.03-.27-.045-.51-.15-.705-.33-.045-.045-.09-.09-.135-.135-.165-.15-.345-.285-.54-.39-.075-.045-.15-.075-.225-.105-.285-.09-.585-.12-.885-.075-.075.015-.15.03-.225.045-.255.06-.48.195-.63.405-.03.045-.06.09-.09.135-.105.18-.21.36-.33.51-.15.195-.33.345-.525.435-.15.075-.315.12-.48.135-.18.015-.345.015-.51-.015a.93.93 0 0 1-.12-.03c-.24-.06-.435-.195-.57-.39a.9.9 0 0 1-.105-.18c-.015-.045-.03-.09-.045-.135-.06-.225-.09-.465-.09-.705v-.15c.015-.195.045-.39.075-.57.015-.09.03-.18.045-.27.045-.255.09-.51.135-.735.015-.075.03-.15.045-.225.06-.255.12-.495.18-.72.015-.06.03-.12.045-.18.075-.285.15-.555.24-.81.015-.045.03-.09.045-.135.12-.345.27-.66.435-.93.06-.09.12-.18.195-.255.18-.21.39-.36.615-.45.06-.03.12-.045.18-.06.33-.075.6-.24.78-.51.03-.045.045-.09.06-.135.09-.18.18-.375.27-.555.12-.24.24-.465.36-.66.03-.045.06-.09.09-.135.165-.27.345-.51.54-.705.06-.06.12-.12.18-.165.21-.15.435-.255.66-.315.06-.015.12-.03.18-.045.345-.045.63-.18.84-.42.015-.015.03-.03.045-.045.135-.15.27-.315.39-.48.135-.18.255-.375.375-.57.03-.06.06-.12.09-.18.18-.3.36-.6.54-.87.03-.045.06-.09.09-.135.165-.255.345-.48.525-.66.045-.045.09-.09.135-.135.21-.18.435-.315.675-.39.06-.015.12-.03.18-.045.375-.06.69-.225.915-.51.03-.045.06-.075.09-.12.135-.18.27-.375.39-.57.135-.225.255-.465.375-.705.015-.03.03-.06.045-.09.18-.33.36-.66.54-.96.03-.06.06-.12.09-.18.165-.3.33-.57.495-.81.015-.03.03-.06.045-.09.195-.33.39-.63.585-.885.015-.03.03-.045.045-.075.21-.3.42-.555.63-.765.015-.015.03-.03.045-.045.21-.225.42-.405.63-.54.015-.015.03-.015.045-.03.24-.165.48-.285.72-.36.015-.015.03-.015.045-.015.285-.09.57-.135.855-.135.045 0 .09 0 .135.005z",
  },
  { name: "Gemini", svg: "M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z" },
  {
    name: "Midjourney",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
  },
  { name: "Looker Studio", svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
];

const defaultCertifications = [
  {
    title: "Meta Certified Digital Marketing Associate",
    org: "Meta",
    date: "2024",
    desc: "Foundations of paid social strategy, campaign structure and creative testing on Meta platforms.",
  },
  {
    title: "Google Ads — Search Certification",
    org: "Google Skillshop",
    date: "2024",
    desc: "Search campaign strategy, bidding, keyword planning and performance optimisation.",
  },
  {
    title: "Google Analytics 4",
    org: "Google Skillshop",
    date: "2024",
    desc: "Event-based measurement, conversion tracking and reporting fundamentals in GA4.",
  },
  {
    title: "TikTok Marketing Science",
    org: "TikTok Academy",
    date: "2025",
    desc: "Creator-led strategy, ad formats and community-driven growth on TikTok.",
  },
];

const defaultEducation = [
  {
    degree: "Bachelor in Marketing & Communication",
    school: "University Program",
    year: "2021 — 2024",
    desc: "Focus on brand strategy, consumer behaviour and digital communication.",
  },
  {
    degree: "Digital Marketing Specialisation",
    school: "Online Bootcamp",
    year: "2024",
    desc: "Intensive training on paid media, analytics, funnels and AI-powered marketing.",
  },
];

const defaultProjects = [
  {
    img: proj1,
    title: "AMM Dashboard",
    category: "Web App",
    tech: ["React", "TypeScript", "Tailwind"],
    desc: "Real-time concrete batching plant monitoring dashboard with live data visualization.",
    liveUrl: "https://amm-dashboard.vercel.app/dashboard",
    githubUrl: "https://github.com/sarahassib/amm-dashboard",
  },
  {
    img: proj2,
    title: "AMM Landing Page",
    category: "Web & Conversion",
    tech: ["React", "Tailwind", "Vercel"],
    desc: "High-converting landing page for AMM concrete batching solutions.",
    liveUrl: "https://amm-concrete-batching-landing.vercel.app/",
    githubUrl: "https://github.com/sarahassib/amm-concrete-batching-landing",
  },
  {
    img: proj3,
    title: "Portfolio Website",
    category: "Personal Brand",
    tech: ["React", "Tailwind", "Lovable"],
    desc: "This portfolio — a dark, premium take on the modern personal site.",
    liveUrl: "",
    githubUrl: "",
  },
  {
    img: proj1,
    title: "Meta Ads Campaign",
    category: "Paid Social",
    tech: ["Meta Ads Manager", "Canva", "GA4"],
    desc: "End-to-end paid social campaign — creative, targeting and reporting.",
    liveUrl: "",
    githubUrl: "",
  },
  {
    img: proj2,
    title: "Landing Page Build",
    category: "Web & Conversion",
    tech: ["HTML", "CSS", "WordPress"],
    desc: "High-converting landing page designed and shipped for a personal launch.",
    liveUrl: "",
    githubUrl: "",
  },
  {
    img: proj3,
    title: "Brand Strategy",
    category: "Positioning",
    tech: ["Figma", "Notion", "ChatGPT"],
    desc: "Brand pillars, tone of voice and visual identity for a personal project.",
    liveUrl: "",
    githubUrl: "",
  },
];

const defaultExperience = [
  {
    company: "Freelance",
    position: "Digital Marketing Specialist",
    duration: "2024 — Present",
    desc: "Paid media, analytics setup and content strategy for small businesses and personal brands.",
  },
  {
    company: "Agency Internship",
    position: "Junior Marketing Associate",
    duration: "2023 — 2024",
    desc: "Supported paid campaigns, community management and reporting across multiple client accounts.",
  },
];

/* ---------- helpers ---------- */

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-chip px-3 py-1 text-xs font-medium tracking-wide uppercase text-[var(--color-primary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}

/* ---------- page ---------- */

export function Portfolio() {
  useReveal();
  const [lang, setLang] = useState<Lang>("en");
  const t = dict[lang];

  const { data: dbSkills } = useQuery({
    queryKey: ["portfolio-skills"],
    queryFn: async () => {
      const { data } = await supabase.from("skills").select("*").order("sort_order");
      return data;
    },
    staleTime: 60_000,
  });

  const { data: dbTools } = useQuery({
    queryKey: ["portfolio-tools"],
    queryFn: async () => {
      const { data } = await supabase.from("tools").select("*").order("sort_order");
      return data;
    },
    staleTime: 60_000,
  });

  const { data: dbCerts } = useQuery({
    queryKey: ["portfolio-certifications"],
    queryFn: async () => {
      const { data } = await supabase.from("certifications").select("*").order("sort_order");
      return data;
    },
    staleTime: 60_000,
  });

  const { data: dbEducation } = useQuery({
    queryKey: ["portfolio-education"],
    queryFn: async () => {
      const { data } = await supabase.from("education").select("*").order("sort_order");
      return data;
    },
    staleTime: 60_000,
  });

  const { data: dbProjects } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("sort_order");
      return data;
    },
    staleTime: 60_000,
  });

  const { data: dbExperience } = useQuery({
    queryKey: ["portfolio-experience"],
    queryFn: async () => {
      const { data } = await supabase.from("experience").select("*").order("sort_order");
      return data;
    },
    staleTime: 60_000,
  });

  const skillGroups =
    dbSkills && dbSkills.length > 0
      ? dbSkills.map((s: Record<string, unknown>) => ({
          icon: Megaphone,
          title: s.category as string,
          items: (s.items as string[]) ?? [],
        }))
      : defaultSkillGroups;

  const tools =
    dbTools && dbTools.length > 0
      ? dbTools.map((t: Record<string, unknown>) => ({
          name: t.name as string,
          svg: (t.svg_path as string) ?? "",
        }))
      : defaultTools;

  const certifications =
    dbCerts && dbCerts.length > 0
      ? dbCerts.map((c: Record<string, unknown>) => ({
          title: c.title as string,
          org: c.org as string,
          date: (c.date as string) ?? "",
          desc: (c.description as string) ?? "",
          img: (c.image_url as string) || certImg,
        }))
      : defaultCertifications;

  const education =
    dbEducation && dbEducation.length > 0
      ? dbEducation.map((e: Record<string, unknown>) => ({
          degree: e.degree as string,
          school: (e.school as string) ?? "",
          year: (e.year as string) ?? "",
          desc: (e.description as string) ?? "",
        }))
      : defaultEducation;

  const projects =
    dbProjects && dbProjects.length > 0
      ? dbProjects.map((p: Record<string, unknown>) => ({
          img: (p.image_url as string) || proj1,
          title: p.title as string,
          category: p.category as string,
          tech: (p.tech as string[]) ?? [],
          desc: (p.description as string) ?? "",
          liveUrl: (p.live_url as string) ?? "",
          githubUrl: (p.github_url as string) ?? "",
        }))
      : defaultProjects;

  const experience =
    dbExperience && dbExperience.length > 0
      ? dbExperience.map((e: Record<string, unknown>) => ({
          company: e.company as string,
          position: e.position as string,
          duration: (e.duration as string) ?? "",
          desc: (e.description as string) ?? "",
        }))
      : defaultExperience;

  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV — N5 Floating pill */}
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl">
        <nav className="glass-nav flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-sans text-xs font-bold">
              SH
            </span>
            <span className="hidden sm:inline">Sara Hassib</span>
          </a>
          <div className="hidden items-center gap-5 text-[13px] font-medium md:flex">
            {(["about", "skills", "tools", "projects", "experience", "contact"] as const).map(
              (k) => (
                <a
                  key={k}
                  href={`#${k}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav[k]}
                </a>
              ),
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              aria-label="Toggle language"
              className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden px-4 pt-28 pb-24 sm:px-6 md:pt-36 md:pb-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "var(--color-primary)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "var(--color-gold)" }}
          />
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-8">
            <div className="reveal">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-chip px-3 py-1.5 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-coral)]" />
                {t.hero.eyebrow}
              </div>
              <h1 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
                {t.hero.name.split(" ")[0]}{" "}
                <span className="text-[var(--color-gold)]">{t.hero.name.split(" ")[1]}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-8px_oklch(0.55_0.16_300_/_0.35)]"
                >
                  <Download className="h-4 w-4" /> {t.hero.cv}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold transition-all hover:bg-secondary hover:-translate-y-0.5"
                >
                  {t.hero.contact} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="reveal relative">
              <div className="card-surface overflow-hidden rounded-3xl">
                <img
                  src={heroImg}
                  alt="Sara Hassib — Digital Marketing Specialist"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="01 — About" title={t.about.title} />
            <div className="grid gap-8 md:grid-cols-5">
              <div className="reveal card-surface p-8 md:col-span-3 md:p-10">
                <p className="text-lg leading-relaxed text-card-foreground/80">{t.about.body}</p>
              </div>
              <div className="reveal grid gap-4 md:col-span-2 sm:grid-cols-2">
                {t.about.stats.map((s) => (
                  <div
                    key={s.label}
                    className="card-surface group p-6 transition-all hover:-translate-y-0.5"
                  >
                    <div className="font-display text-3xl font-semibold text-[var(--color-primary)]">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="02 — Skills"
              title={t.skills.title}
              subtitle={t.skills.subtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    key={g.title}
                    className="reveal card-surface group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  >
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ background: "var(--color-primary)" }}
                    />
                    <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-secondary text-[var(--color-primary)] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-4 font-display text-lg font-semibold">{g.title}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section id="tools" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="03 — Tools" title={t.tools.title} subtitle={t.tools.subtitle} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="reveal card-surface group flex items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] hover:border-[var(--color-coral)]/30 sm:p-5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 shrink-0 fill-muted-foreground/60 transition-colors group-hover:fill-foreground sm:h-9 sm:w-9"
                  >
                    <path d={tool.svg} />
                  </svg>
                  <span className="text-sm font-medium text-card-foreground/80 transition-colors group-hover:text-card-foreground">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="04 — Certifications"
              title={t.certs.title}
              subtitle={t.certs.subtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {certifications.map((c) => (
                <article
                  key={c.title}
                  className="reveal card-surface group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={"img" in c ? (c as { img: string }).img : certImg}
                      alt={`${c.title} certificate`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5">{c.org}</span>
                      <span>{c.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                    <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:gap-2 transition-all">
                      {t.certs.view} <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionTitle
              eyebrow="05 — Education"
              title={t.education.title}
              subtitle={t.education.subtitle}
            />
            <ol className="relative border-l border-border pl-8">
              {education.map((e, i) => (
                <li key={i} className="reveal relative mb-10 last:mb-0">
                  <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <div className="card-surface p-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] font-mono">
                      {e.year}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{e.degree}</h3>
                    <div className="text-sm text-muted-foreground">{e.school}</div>
                    <p className="mt-2 text-sm text-card-foreground/70">{e.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="06 — Projects"
              title={t.projects.title}
              subtitle={t.projects.subtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <article
                  key={i}
                  className="reveal card-surface group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--color-coral)]">
                      {p.category}
                    </div>
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-4 text-sm">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:gap-2 transition-all">
                          {t.projects.view} <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <Github className="h-4 w-4" /> {t.projects.github}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionTitle
              eyebrow="07 — Experience"
              title={t.experience.title}
              subtitle={t.experience.subtitle}
            />
            <ol className="relative border-l border-border pl-8">
              {experience.map((e, i) => (
                <li key={i} className="reveal relative mb-10 last:mb-0">
                  <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-[var(--color-gold)] text-[var(--color-gold-foreground)] ring-4 ring-background">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <div className="card-surface p-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-coral)] font-mono">
                      {e.duration}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{e.position}</h3>
                    <div className="text-sm text-muted-foreground">{e.company}</div>
                    <p className="mt-2 text-sm text-card-foreground/70">{e.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="08 — Contact"
              title={t.contact.title}
              subtitle={t.contact.subtitle}
            />
            <div className="grid gap-8 md:grid-cols-5">
              <div className="reveal card-surface flex flex-col justify-between gap-6 p-8 md:col-span-2">
                <div className="space-y-5">
                  <a href="mailto:sarahassib687@gmail.com" className="flex items-start gap-4 group">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-[var(--color-primary)] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Email
                      </div>
                      <div className="truncate font-semibold">sarahassib687@gmail.com</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-start gap-4 group">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-[var(--color-primary)] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        LinkedIn
                      </div>
                      <div className="truncate font-semibold">linkedin.com/in/sarahassib</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-[var(--color-primary)]">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Phone
                      </div>
                      <div className="font-semibold">+212 61 962 9538</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-[var(--color-primary)]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Location
                      </div>
                      <div className="font-semibold">Available worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={onSubmit} className="reveal card-surface space-y-4 p-8 md:col-span-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    placeholder={t.contact.name}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    required
                    type="email"
                    placeholder={t.contact.email}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <textarea
                  required
                  rows={6}
                  placeholder={t.contact.message}
                  className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex items-center justify-between gap-4">
                  <div
                    className={`text-sm text-[var(--color-primary)] transition-opacity ${sent ? "opacity-100" : "opacity-0"}`}
                  >
                    {t.contact.sent}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-8px_oklch(0.55_0.16_300_/_0.35)]"
                  >
                    <Send className="h-4 w-4" /> {t.contact.send}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — Ft5 Statement */}
      <footer className="border-t border-border px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-display text-xl font-semibold text-foreground/80 sm:text-2xl">
            Built to perform, designed to <span className="text-[var(--color-gold)]">impress</span>.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            {[
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Globe, href: "#", label: "Website" },
            ].map(({ icon: I, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sara Hassib. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
