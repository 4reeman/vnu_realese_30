// import { defaultLocale } from "@/translations/config";
// import { Locale, isLocale } from "@/translations/types";
//
// export function getInitialLocales (): Locale {
//     const localSettings = localStorage.getItem('locale')
//
//     if (localSettings && isLocale(localSettings)) {
//         return localSettings
//     }
//
//     const [browserSettings] = navigator.language.split('-')
//
//     if (isLocale(browserSettings)) {
//         return browserSettings
//     }
//
//     return defaultLocale
// }