// ============================================================
// src/services/cms.ts
// Wrapper API untuk uni-verse Headless CMS
// Semua request menggunakan x-api-key header
// ============================================================

import type {
  CMSPost,
  CMSPage,
  SiteSettings,
  NavItem,
  CMSComment,
  CommentInput,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  AuthUser,
} from '../types/cms';

const BASE_URL = (
  import.meta.env.VITE_CMS_API_URL ||
  process.env.VITE_CMS_API_URL ||
  ''
).replace(/\/$/, '');

const API_KEY = (
  import.meta.env.VITE_CMS_API_KEY ||
  process.env.VITE_CMS_API_KEY ||
  ''
);

const PUBLIC_PREFIX = `${BASE_URL}/api/v1/public`;
const AUTH_PREFIX   = `${BASE_URL}/api/auth`;

// ── Shared request helper ───────────────────────────────────

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`[CMS] ${res.status} – ${errText}`);
  }

  return res.json() as Promise<T>;
}

// Helper untuk request yang butuh Bearer token (auth routes)
async function authRequest<T>(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`[CMS Auth] ${res.status} – ${errText}`);
  }

  return res.json() as Promise<T>;
}

// ── Public Content Endpoints ────────────────────────────────

/** Ambil semua post yang dipublish (events, blog, gallery, repository, dst.) */
export const fetchPosts = (): Promise<CMSPost[]> =>
  request<CMSPost[]>(`${PUBLIC_PREFIX}/posts`);

/** Ambil semua halaman yang dipublish (services, about, dst.) */
export const fetchPages = (): Promise<CMSPage[]> =>
  request<CMSPage[]>(`${PUBLIC_PREFIX}/pages`);

/** Ambil settings situs (nama, logo, footer, sosmed) */
export const fetchSettings = (): Promise<SiteSettings> =>
  request<SiteSettings>(`${PUBLIC_PREFIX}/settings`);

/** Ambil item navigasi (halaman yang is_in_navbar = 1) */
export const fetchNavigation = (): Promise<NavItem[]> =>
  request<NavItem[]>(`${PUBLIC_PREFIX}/navigation`);

/** Ambil komentar yang disetujui untuk satu post */
export const fetchComments = (postId: number): Promise<CMSComment[]> =>
  request<CMSComment[]>(`${PUBLIC_PREFIX}/posts/${postId}/comments`);

/** Kirim komentar baru (status: pending, butuh moderasi) */
export const submitComment = (
  postId: number,
  data: CommentInput
): Promise<{ message: string; id: number }> =>
  request(`${PUBLIC_PREFIX}/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ── Auth Endpoints (JWT) ────────────────────────────────────

/** Login – mengembalikan token + user object */
export const login = (data: LoginPayload): Promise<LoginResponse> =>
  authRequest<LoginResponse>(`${AUTH_PREFIX}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

/** Register – membuat akun baru + tenant */
export const register = (data: RegisterPayload): Promise<LoginResponse> =>
  authRequest<LoginResponse>(`${AUTH_PREFIX}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

/** Ambil profil user yang sedang login */
export const fetchProfile = (token: string): Promise<AuthUser> =>
  authRequest<AuthUser>(`${BASE_URL}/api/user/profile`, {}, token);

// ── Utility: Filter helpers ────────────────────────────────

/** Filter posts berdasarkan kata kunci dalam kategori */
export const filterPostsByCategory = (
  posts: CMSPost[],
  keyword: string
): CMSPost[] =>
  posts.filter(p =>
    p.category?.toLowerCase().includes(keyword.toLowerCase())
  );

/** Cari page berdasarkan slug */
export const findPageBySlug = (
  pages: CMSPage[],
  slug: string
): CMSPage | undefined =>
  pages.find(p => p.slug === slug);
