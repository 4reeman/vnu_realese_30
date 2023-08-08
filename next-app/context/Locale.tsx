// "use client"
// import React, { ReactNode } from "react";
// import { useRouter } from 'next/navigation' //router
// import { Locale, isLocale } from '@/translations/types'
//
// interface ContextProps {
//     readonly locale: Locale
//     readonly setLocale: (locale:Locale) => void
// }
//
// export const LocaleContext = React.createContext<ContextProps>({
//     locale: 'en',
//     setLocale: ()=> null
// })
//
// export const LocaleProvider: React.FC<{ language: Locale, children: ReactNode }> = ({ language, children }) => {
//     const [locale, setLocale] = React.useState(language)
//     const { query } = useRouter()
//
//     React.useEffect(() => {
//         if (locale !== localStorage.getItem('locale')) {
//             localStorage.setItem('locale', locale as string)
//         }
//     }, [locale])
//
//     React.useEffect(() => {
//         if (typeof query.language === 'string' && isLocale(query.language) && locale !== query.language) {
//             setLocale(query.language)
//         }
//     }, [query.language, locale])
//
//     return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
// }

export default function tralala() {
    return ;
}