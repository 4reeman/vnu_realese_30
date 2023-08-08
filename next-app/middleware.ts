// import { NextRequest, NextResponse } from 'next/server'
//
// const PUBLIC_FILE = /\.(.*)$/
//
// export async function middleware(req: NextRequest) {
//     if (
//         req.nextUrl.pathname.startsWith('/_next') ||
//         req.nextUrl.pathname.includes('/api/') ||
//         PUBLIC_FILE.test(req.nextUrl.pathname)
//     ) {
//         return
//     }
//
//     if (req.nextUrl.locale === 'en') {
//         const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
//         // return NextResponse.redirect(
//         //     new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
//         // )
//     }
// }

import {NextRequest, NextResponse} from "next/server"
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

let locales = ['en-US', 'uk-UA']

export function middleware(req: NextRequest, request: Request, response: NextResponse) {
    const pathname = req.nextUrl.pathname
    const origin = req.nextUrl.origin
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    )
    setTimeout(()=>{

    }, 1000)
    if (pathnameIsMissingLocale) {
        console.log('path is missing')
        const locale = getLocale(req)
        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )

    }

    return NextResponse.next()
}

// export default function handler(req: NextRequest, res) {
//     getLocale(req)
// }

function getLocale(req: NextRequest) {
    let headers = { 'accept-language': `${req.headers.get('accept-language')}` }
    let languages = new Negotiator({ headers }).languages()
    let defaultLocale = 'en-US'
    return match(languages, locales, defaultLocale)
}

export const config = {
    matcher: [
        '/((?!_next).*)',
        '/((?!api|_next|static|public|favicon.ico).*)',
    ],
}