"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
};

/**
 * 语言切换器：显示当前语言，点击切换到另一个语言
 * en 路径无前缀 (/bosses/gelum)
 * ja 路径有前缀 (/ja/bosses/gelum)
 *
 * next-intl middleware 使用 NEXT_LOCALE cookie + localePrefix: "as-needed"
 * 切换时必须先设置 cookie，否则 middleware 会重定向回原语言
 */
export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  // 当前 locale 不在列表中则不渲染
  if (!routing.locales.includes(locale as Locale)) return null;
  // 只有一个语言时不需要切换器
  if (routing.locales.length <= 1) return null;

  const handleSwitch = () => {
    // 找到下一个语言（循环切换）
    const currentIndex = routing.locales.indexOf(locale as Locale);
    const nextLocale = routing.locales[(currentIndex + 1) % routing.locales.length];

    // 计算新路径
    let newPath = pathname;

    // 移除当前 locale 前缀（如果有）
    if (locale !== routing.defaultLocale) {
      newPath = newPath.replace(`/${locale}`, "") || "/";
    }

    // 添加新 locale 前缀（如果不是默认语言）
    if (nextLocale !== routing.defaultLocale) {
      newPath = `/${nextLocale}${newPath === "/" ? "" : newPath}`;
    }

    // 设置 NEXT_LOCALE cookie，防止 middleware 重定向回原语言
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;

    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSwitch}
      className="gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      <span>{LOCALE_LABELS[locale as Locale]}</span>
    </Button>
  );
}
