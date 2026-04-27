// ============================================================
// src/types/cms.ts
// Definisi semua tipe TypeScript untuk data dari uni-verse CMS
// ============================================================

/** Item navigasi dari CMS */
export interface NavItem {
  title: string;
  slug: string;
}

/** Link sosial media dari settings CMS */
export interface SocialLink {
  platform: string; // 'instagram' | 'facebook' | 'youtube' | 'twitter' | dll
  url: string;
}

/** Settings situs dari CMS (GET /api/v1/public/settings) */
export interface SiteSettings {
  site_name?: string;
  title?: string;
  tagline?: string;
  logo_url?: string | null;
  frontend_url?: string;
  copyright_text?: string;
  social_links?: SocialLink[];
}

/** Post dari CMS (GET /api/v1/public/posts) */
export interface CMSPost {
  id: number;
  tenant_id?: number;
  title: string;
  slug: string;
  content?: Record<string, unknown> | string | null;
  excerpt?: string;
  category?: string;
  featured_image?: string | null;
  status?: 'published' | 'draft';
  created_at?: string;
}

/** Page dari CMS (GET /api/v1/public/pages) */
export interface CMSPage {
  id: number;
  tenant_id?: number;
  title: string;
  slug: string;
  content?: Record<string, unknown> | string | null;
  featured_image?: string | null;
  status?: 'published' | 'draft';
}

/** Komentar dari CMS */
export interface CMSComment {
  id: number;
  author_name: string;
  content: string;
  created_at?: string;
}

/** Payload submit komentar */
export interface CommentInput {
  author_name: string;
  author_email: string;
  content: string;
}

/** User yang sudah login (dari /api/auth/login) */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  profile_picture_url?: string | null;
  tenant_id?: number | null;
  role?: string | null;
  site_name?: string;
}

/** Response login */
export interface LoginResponse {
  token: string;
  user: AuthUser;
  tenant_id?: number | null;
}

/** Payload login */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Payload register */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
