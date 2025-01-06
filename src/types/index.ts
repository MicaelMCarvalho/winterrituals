export type Language = 'en' | 'es' | 'pt';

export interface LayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  onLanguageChange: (lang: Language) => void;
}
