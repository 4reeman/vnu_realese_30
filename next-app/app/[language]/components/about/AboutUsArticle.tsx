import Picture from "@/app/[language]/components/Image/Picture";
import getNode from "@/lib/getNode";
import type { aboutNode } from "@/types";
import Link from "next/link";
// import useTranslation from "@/hooks/useTranslation";

type Prop = {
    nid: string,
    view_mode: string,
    styles: any
}

export default async function AboutUsArticle({ nid, view_mode, styles }: Prop) {
    // const { locale } = useTranslation()

    const nodeData: Promise<aboutNode> = getNode(nid, view_mode, 'en')

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                summary: summary
            },
            field_about_image: image
        }
    } = node

    const {
        title: s_title,
        summary: s_summary,
        image_order: s_order,
    } = styles

    return (
        <article className={'flex flex-col flex-[1_1_50%] gap-y-20 px-14'}>
                <div className={'order-1 flex flex-col'}>
                    <h2 className={`${s_title}`}>{title}</h2>
                    <a href={`/about-us/${nid}`} className={'my-6'}>
                        <span className={`${s_summary}`}>{summary}</span>
                    </a>
                    <Link href={`/about-us/${nid}`} className={'block max-w-fit rounded-md bg-blue px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}>
                        Learn More
                    </Link>
                </div>
                <div className={`${s_order} relative`}>
                    <div className={'w-fit relative mx-auto shadow-3xl'}>
                        <div className={'w-[90%] h-[90%] absolute bg-light-green-100 -top-10 -left-[50px]'}></div>
                        <Picture img={image} styles={'relative z-10 sepia-5'}/>
                        <div className={'w-[60%] h-[80%] absolute bg-blue -right-[50px] bottom-[10%]'}></div>
                    </div>
                </div>
        </article>
    )

}

