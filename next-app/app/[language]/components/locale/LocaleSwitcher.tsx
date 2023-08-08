import React, {Fragment} from 'react'
import {usePathname, useRouter} from "next/navigation"
import { locales, languageNames } from "@/translations/config"
// import { LocaleContext } from "@/context/Locale"
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import {useParams} from "next/dist/client/components/navigation";

export default function LocaleSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const options = useParams()
    // const { locale } = React.useContext(LocaleContext)

    const handleLocaleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const regex = new RegExp(`^/(${locales.join('|')})`)
            // {console.log('localhost/en'.replace(regex, `/${e.target.value}`))}
            const path = pathname.replace(regex, `/${e.target.value}`)
            //
            // // router.push(pathname, router.pathname router.asPath.replace(regex, `/${e.target.value}`))
            router.push(pathname)
        },
        [router]
    )

    return (
        <Fragment>
            {/*<select value={locale} onChange={handleLocaleChange}>*/}
            {/*    {locales.map(locale => (*/}
            {/*        <option key={locale} value={locale}>*/}
            {/*            {languageNames[locale]}*/}
            {/*        </option>*/}
            {/*    ))}*/}
            {/*</select>*/}
        </Fragment>
    )
}