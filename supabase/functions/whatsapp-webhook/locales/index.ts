import langEn from "./en.ts";
import langEs from "./es.ts";
import langFr from "./fr.ts";
import langJa from "./ja.ts";
import langZh from "./zh.ts";

const allData = {
  en: langEn,
  es: langEs,
  fr: langFr,
  ja: langJa,
  zh: langZh
};

export function isSupportedLang(language: string): language is ISupportedLang {
  return ["en", "es", "fr", "ja", "zh"].includes(language);
}

export type ISupportedLang = keyof typeof allData;
export default allData;
