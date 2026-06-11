import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CircleHelp, FileText, Swords } from "lucide-react";
import { getMessages } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { BOSS_CARDS } from "@/lib/boss-data";
import { getAllContentPaths, getContent } from "@/lib/content";
import { Breadcrumbs, JsonLd, WikiSidebar, localizeHref } from "@/components/site";
import { MobileTOC, SidebarTOC } from "@/components/table-of-contents";
import { BOSS_LINKS, CONTENT_TYPES } from "@/config/navigation";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vvultimatum.net";
type Messages = typeof en;

function languageAlternates(pathname: string) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, locale === "en" ? pathname : `/${locale}${pathname}`]));
}

export async function generateStaticParams() {
  const paths = await getAllContentPaths("en");
  return [{ slug: ["bosses"] }, ...paths.map((item) => ({ slug: [item.contentType, ...item.slug] }))];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  if (slug.length === 1 && slug[0] === "bosses") {
    return { title: messages.bosses.meta.title, description: messages.bosses.meta.description, alternates: { canonical: "/bosses", languages: languageAlternates("/bosses") }, openGraph: { title: messages.bosses.meta.title, description: messages.bosses.meta.description, url: `${siteUrl}/bosses`, images: [`${siteUrl}/images/hero.webp`] } };
  }
  const [contentType, ...articleSlug] = slug;
  const item = await getContent(contentType, articleSlug, locale);
  if (!item) return { title: "Not Found" };
  const pathname = `/${contentType}/${articleSlug.join("/")}`;
  const image = item.metadata.image?.startsWith("http") ? item.metadata.image : `${siteUrl}${item.metadata.image ?? "/images/hero.webp"}`;
  return { title: `${item.metadata.title} — VV Ultimatum Wiki`, description: item.metadata.description, alternates: { canonical: pathname, languages: languageAlternates(pathname) }, openGraph: { type: "article", title: item.metadata.title, description: item.metadata.description, url: `${siteUrl}${pathname}`, images: [image] }, twitter: { card: "summary_large_image", images: [image] } };
}

export default async function SlugPage({ params }: { params: Promise<{ locale: Locale; slug: string[] }> }) {
  const { locale, slug } = await params;
  if (slug.length === 1) return <NavigationPage locale={locale} contentType={slug[0]} />;
  return <DetailPage locale={locale} contentType={slug[0]} slug={slug.slice(1)} />;
}

async function NavigationPage({ locale, contentType }: { locale: Locale; contentType: string }) {
  if (!CONTENT_TYPES.includes(contentType)) notFound();
  const messages = (await getMessages({ locale })) as Messages;
  const listData = { "@context": "https://schema.org", "@type": "ItemList", name: messages.bosses.overviewTitle, itemListElement: BOSS_CARDS.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `${siteUrl}${item.href}`, name: item.title })) };

  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><JsonLd data={listData} /><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"><article><Breadcrumbs items={[{ label: "Home", href: localizeHref("/", locale) }, { label: "Bosses" }]} /><div className="mb-8 overflow-hidden rounded-3xl border border-border bg-card"><div className="relative aspect-[16/7]"><Image src="/images/hero.webp" alt="VV Ultimatum official media" fill className="object-cover" priority /><div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" /><p className="absolute bottom-4 left-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Official media</p></div></div><h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{messages.bosses.overviewTitle}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{messages.bosses.overviewDescription}</p><p className="mt-5 leading-8 text-muted-foreground">{messages.bosses.body}</p><h2 className="mt-12 border-b border-border pb-3 text-2xl font-bold tracking-tight">{messages.bosses.guidesTitle}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{BOSS_CARDS.map((boss, index) => <Link key={boss.href} href={localizeHref(boss.href, locale)} className="group rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-0.5 hover:border-[hsl(var(--nav-theme-light))]"><div className="mb-4 flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-[hsl(var(--nav-theme))]"><Swords className="h-5 w-5" /></span>{boss.badge && <Badge variant="secondary">{boss.badge}</Badge>}</div><h3 className="text-lg font-bold text-foreground group-hover:text-[hsl(var(--nav-theme))]">{boss.title}</h3><p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">{boss.description}</p><span className="mt-4 inline-flex items-center text-sm font-semibold text-[hsl(var(--nav-theme))]">{messages.bosses.readMore}<ChevronRight className="ml-1 h-4 w-4" /></span></Link>)}</div></article><WikiSidebar locale={locale} /></div></main>;
}

async function DetailPage({ locale, contentType, slug }: { locale: Locale; contentType: string; slug: string[] }) {
  if (!CONTENT_TYPES.includes(contentType)) notFound();
  const messages = (await getMessages({ locale })) as Messages;
  const item = await getContent(contentType, slug, locale);
  if (!item) notFound();
  const pathname = `/${contentType}/${slug.join("/")}`;
  const tocLabel = messages.shared.tableOfContents || messages.shared.inThisSection || "Table of Contents";
  const articleData = { "@context": "https://schema.org", "@type": "Article", headline: item.metadata.title, description: item.metadata.description, image: `${siteUrl}${item.metadata.image ?? "/images/hero.webp"}`, datePublished: item.metadata.date, dateModified: item.metadata.lastModified ?? item.metadata.date, mainEntityOfPage: `${siteUrl}${pathname}`, author: { "@type": "Organization", name: "VV Ultimatum Wiki" }, publisher: { "@type": "Organization", name: "VV Ultimatum Wiki", logo: { "@type": "ImageObject", url: `${siteUrl}/android-chrome-512x512.png` } } };
  const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Bosses", item: `${siteUrl}/bosses` }, { "@type": "ListItem", position: 3, name: item.metadata.title, item: `${siteUrl}${pathname}` }] };

  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><JsonLd data={articleData} /><JsonLd data={breadcrumbData} /><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"><article><Breadcrumbs items={[{ label: "Home", href: localizeHref("/", locale) }, { label: "Bosses", href: localizeHref("/bosses", locale) }, { label: item.metadata.title }]} /><h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{item.metadata.title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{item.metadata.summary ?? item.metadata.description}</p><MobileTOC headings={item.headings} label={tocLabel} /><div className="prose-invert mt-10 max-w-none"><item.MDXContent /></div><ArticleCards locale={locale} /></article><aside className="space-y-6"><SidebarTOC headings={item.headings} label={tocLabel} currentPathname={pathname} /><WikiSidebar locale={locale} /></aside></div></main>;
}

function ArticleCards({ locale }: { locale: string }) {
  return <div className="mt-12 space-y-8"><section><h3 className="text-xl font-bold text-foreground">Next Steps</h3><div className="mt-4 grid gap-4 sm:grid-cols-2"><SmallCard icon={<Swords className="h-5 w-5" />} title="Dragonfly Boss Guide" description="Take on the next area boss." href={localizeHref("/bosses/dragonfly", locale)} /><SmallCard icon={<FileText className="h-5 w-5" />} title="Combat System" description="Improve your fighting fundamentals." href={localizeHref("/combat", locale)} /></div></section><section><h3 className="text-xl font-bold text-foreground">Need Help?</h3><Link href={localizeHref("/beginner-guide", locale)} className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-5 transition hover:border-[hsl(var(--nav-theme-light))]"><CircleHelp className="h-5 w-5 text-[hsl(var(--nav-theme))]" /><span><span className="block text-sm text-muted-foreground">Just getting started?</span><span className="font-semibold text-foreground">Beginner Guide</span></span></Link></section><section><h3 className="text-xl font-bold text-foreground">Related Reading</h3><div className="mt-4 grid gap-4 sm:grid-cols-2"><SmallCard title="Soul Society Areas" description="Starting zone with Sweetwater Pass, Nebukai Village, and more." href={localizeHref("/maps/soul-society", locale)} /><SmallCard title="Quest System" description="Understand quest types, EXP zones, and mission tickets." href={localizeHref("/quests", locale)} /></div></section></div>;
}

function SmallCard({ title, description, href, icon }: { title: string; description: string; href: string; icon?: React.ReactNode }) { return <Link href={href} className="block rounded-2xl border border-border bg-card/70 p-5 transition hover:border-[hsl(var(--nav-theme-light))]">{icon && <div className="mb-3 text-[hsl(var(--nav-theme))]">{icon}</div>}<h4 className="font-bold text-foreground">{title}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></Link>; }
