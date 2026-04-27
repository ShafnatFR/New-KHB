import { useState, useEffect } from "react";
import Hero from "./Hero";
import Workflow from "./Workflow";
import Ecosystem from "./Ecosystem";
import Gallery from "./Gallery";
import CTA from "./CTA";
import { fetchPosts, fetchPages, filterPostsByCategory, findPageBySlug } from "../services/cms";
import type { CMSPost, CMSPage } from "../types/cms";

// ── Block content parser ─────────────────────────────────────
// Mencoba mengekstrak data hero dari block JSON CMS.
// CMS bisa mengirim content dalam berbagai format block builder.
function parseHeroBlock(content: unknown): Partial<HeroOverride> {
  if (!content) return {};
  try {
    const blocks: unknown[] = Array.isArray(content)
      ? content
      : typeof content === "object"
      ? [content]
      : [];

    for (const block of blocks) {
      const b = block as Record<string, unknown>;
      const type = (b.type as string)?.toLowerCase() ?? "";
      if (type.includes("hero") || type.includes("banner") || type.includes("slider")) {
        return {
          badge:     (b.badge ?? b.label ?? b.tag) as string | undefined,
          headline:  (b.headline ?? b.title ?? b.heading) as string | undefined,
          desc:      (b.subheadline ?? b.description ?? b.body) as string | undefined,
          slides:    Array.isArray(b.images) ? (b.images as string[]) : undefined,
        };
      }
    }
  } catch {
    // ignore
  }
  return {};
}

export interface HeroOverride {
  badge?: string;
  headline?: string;
  desc?: string;
  slides?: string[];
}

export default function Home() {
  const [galleryPosts, setGalleryPosts] = useState<CMSPost[]>([]);
  const [heroPage,     setHeroPage]     = useState<CMSPage | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchPosts(), fetchPages()])
      .then(([posts, pages]) => {
        if (cancelled) return;

        // ── Gallery items: cari post dengan kategori galeri/foto/dokumentasi
        let galPosts = filterPostsByCategory(posts, "galer");
        if (!galPosts.length) galPosts = filterPostsByCategory(posts, "foto");
        if (!galPosts.length) galPosts = filterPostsByCategory(posts, "dokumentasi");
        // Fallback: ambil 6 post pertama apa pun kategorinya
        if (!galPosts.length) galPosts = posts.slice(0, 6);
        setGalleryPosts(galPosts.slice(0, 6));

        // ── Hero page: cari page slug "home" atau "beranda"
        const hp = findPageBySlug(pages, "home") ?? findPageBySlug(pages, "beranda");
        setHeroPage(hp ?? null);
      })
      .catch(() => {
        // Tidak blocking – komponen akan pakai fallback statis
      });

    return () => { cancelled = true; };
  }, []);

  // Parse hero override dari CMS page content
  const heroOverride: HeroOverride = heroPage
    ? parseHeroBlock(heroPage.content)
    : {};

  return (
    <>
      <Hero cmsOverride={heroOverride} />
      <Workflow />
      <Ecosystem />
      <Gallery cmsItems={galleryPosts} />
      <CTA />
    </>
  );
}
