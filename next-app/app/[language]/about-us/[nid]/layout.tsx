import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div className={'max-w-7xl mx-auto flex gap-x-20 py-20 px-12'}>
            <main className={'flex-[1_1_70%]'}>{children}</main>
            <aside className={'flex-[1_0_25%] collapse lg:visible bg-light-green-200'}></aside>
        </div>
    )
}