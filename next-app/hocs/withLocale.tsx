// import { NextPage } from 'next'
// import Error from 'next/error'
// // import { getDisplayName } from 'next/dist/server/lib/utils'
// import { isLocale, Locale } from '@/translations/types'
// import { LocaleProvider } from '@/context/Locale'
//
// interface LangProps {
//     locale?: Locale
// }
//
// export default (WrappedPage: NextPage<any>) => {
//     const WithLocale: NextPage<any, LangProps> = ({ locale, ...pageProps }) => {
//         if (!locale) {
//             return <Error statusCode={404} />
//         }
//         return (
//             <LocaleProvider language={locale}>
//                 <WrappedPage {...pageProps} />
//             </LocaleProvider>
//         )
//     }
//
//     WithLocale.getInitialProps = async ctx => {
//         let pageProps = {}
//         if (WrappedPage.getInitialProps) {
//             pageProps = await WrappedPage.getInitialProps(ctx)
//         }
//         if (typeof ctx.query.language !== 'string' || !isLocale(ctx.query.language)) {
//             return { ...pageProps, locale: undefined }
//         }
//         return { ...pageProps, locale: ctx.query.language }
//     }
//
//     // WithLocale.displayName = `withLang(${getDisplayName(WrappedPage)})`
//
//     return WithLocale
// }