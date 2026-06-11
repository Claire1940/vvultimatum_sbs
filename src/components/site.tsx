import Link from "next/link";
import { ChevronRight, ExternalLink, Moon, Play, Sun, Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import { getDynamicNavigation } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollapsibleNavGroup } from "@/components/collapsible-nav-group";

export function localizeHref(href: string, locale: string) {
  if (locale === "en") return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const header = (
    <div className="flex items-center justify-between gap-4">
      <Link href={localizeHref("/", locale)} className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted text-sm font-black text-foreground">VV</span>
        <span className="text-sm font-bold tracking-wide text-foreground">VV: ULTIMATUM</span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        {NAVIGATION_CONFIG.map((item) => (
          <Link key={item.key} href={localizeHref(item.path, locale)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle label={t("toggleTheme")} />
        <Sheet>
          <SheetTrigger asChild className="md:hidden"><Button variant="outline" size="icon" aria-label={t("menu")}><Menu className="h-4 w-4" /></Button></SheetTrigger>
          <SheetContent className="border-border bg-background text-foreground">
            <div className="mt-8 grid gap-2">
              {NAVIGATION_CONFIG.map((item) => <Link key={item.key} href={localizeHref(item.path, locale)} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted">{t(item.key)}</Link>)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
  return <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl"><div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">{header}</div></header>;
}

function ThemeToggle({ label }: { label: string }) {
  return <Button variant="ghost" size="icon" aria-label={label} className="text-muted-foreground hover:text-foreground"><Sun className="h-4 w-4 dark:hidden" /><Moon className="hidden h-4 w-4 dark:block" /></Button>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">{items.map((item, index) => <span key={`${item.label}-${index}`} className="flex items-center gap-2">{index > 0 && <ChevronRight className="h-4 w-4" />}{item.href ? <Link className="hover:text-foreground" href={item.href}>{item.label}</Link> : <span className="text-foreground">{item.label}</span>}</span>)}</nav>;
}

export async function WikiSidebar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "shared" });
  const navGroups = getDynamicNavigation(locale as "en" | "ja");
  return <aside className="space-y-6 lg:sticky lg:top-24"><section className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm"><h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("wikiNavigation")}</h3><div className="space-y-4">{navGroups.map((group) => <CollapsibleNavGroup key={group.slug} title={group.title} icon={<span className="grid h-4 w-4 place-items-center rounded text-[10px] font-bold text-[hsl(var(--nav-theme))]">{group.title[0]}</span>} count={group.count} defaultOpen={group.slug === "bosses"}><ul className="space-y-1">{group.links.map((link) => <li key={link.href}><Link href={localizeHref(link.href, locale)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><span className="truncate">{link.label}</span>{link.badge && <Badge variant="secondary" className="ml-auto h-5 border-border px-1.5 text-[10px]">{link.badge}</Badge>}</Link></li>)}</ul></CollapsibleNavGroup>)}</div></section><section className="rounded-2xl border border-border bg-card/60 p-5"><h3 className="mb-3 text-sm font-bold text-foreground">{t("activeCodes")}</h3><div className="space-y-3 text-sm"><div className="rounded-xl bg-muted p-3"><code className="font-bold text-foreground">FULLRELEASE</code><p className="mt-1 text-muted-foreground">1x Manipulator's Eyepatch (Limited) + 10x Clan Reroll</p></div><div className="rounded-xl bg-muted p-3"><code className="font-bold text-foreground">75KLIKES</code><p className="mt-1 text-muted-foreground">3x Ability Reroll</p></div><Link href={localizeHref("/codes", locale)} className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))]">{t("viewAllCodes")} <ChevronRight className="h-4 w-4" /></Link></div></section></aside>;
}

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const site = await getTranslations({ locale, namespace: "site" });
  return <footer className="mt-16 border-t border-border bg-card/30"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-10 rounded-2xl border border-border bg-muted/40 p-5"><div className="font-bold text-foreground">VV Ultimatum</div><p className="mt-1 text-sm text-muted-foreground">Free Bleach-inspired fighting RPG on Roblox. 3 races, 130+ skills, Lv100 cap.</p><Link href="https://www.roblox.com/games/6270290407/VV-ULTIMATUM" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--nav-theme))]">{t("quickLinks")} <ExternalLink className="h-4 w-4" /></Link></div><p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{site("legalNotice")}</p><div className="grid gap-8 md:grid-cols-4"><div className="md:col-span-2"><h3 className="font-bold text-foreground">{t("aboutTitle")}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{t("about")}</p></div><FooterList title={t("quickLinks")} links={[["Play VV: ULTIMATUM", "https://www.roblox.com/games/6270290407/VV-ULTIMATUM"], ["Official Discord", "https://discord.gg/vvgame"], ["Official YouTube", "https://www.youtube.com/@vvrobloxgame"], ["VV Builder (Skill Planner)", "https://www.vvbuilder.online/"]]} /><FooterList title={t("guides")} links={[["Beginner Guide", "/beginner-guide"], ["Race Guides", "/races"], ["Boss Guides", "/bosses"], ["Build Guide", "/builds"], ["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms-of-service"]]} /></div><p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">{t("copyright")}</p></div></footer>;
}

function FooterList({ title, links }: { title: string; links: string[][] }) { return <div><h4 className="font-semibold text-foreground">{title}</h4><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{links.map(([label, href]) => <li key={href}><Link className="hover:text-foreground" href={href}>{label}</Link></li>)}</ul></div>; }

export function WatchCard() { return <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"><img src="/images/hero.webp" alt="VV Ultimatum gameplay" className="aspect-video w-full object-cover opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" /><div className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-background/80 text-foreground shadow-xl backdrop-blur"><Play className="h-7 w-7 fill-current" /></span></div></div>; }

export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }
