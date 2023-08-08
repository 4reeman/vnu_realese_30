import getFullBundle from "@/lib/getAllBundle";
import {headOfTheDepartmentNode} from "@/types";
import getNode from "@/lib/getNode";
import Link from "next/link";
import Picture from "@/app/[language]/components/Image/Picture";
// import useTranslation from "@/hooks/useTranslation";

export default async function HeadDepartment() {
    // const { locale } = useTranslation()

    const nid = '23'

    const viewMode = 'teaser'

    const nodeData: Promise<headOfTheDepartmentNode> = getNode(nid, viewMode, 'en')

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                summary: summary
            },
            field_department_head_image: image,
            field_position_of_professor: position
        }
    } = node

    return (
        <section className={'bg-gray-200 relative'}>
            <div className={'flex flex-col items-center lg:flex-row max-w-7xl mx-auto px-14 gap-x-12'}>
                <div className={'flex justify-center py-40  flex-[1_1_50%]'}>
                    <div className={'bg-blue absolute -z-1 h-full sm:w-52 w-28 top-0'}></div>
                    <Picture img={image} styles={'sepia-5 shadow-3xl'}/>
                </div>
                <div className={'relative flex-[1_1_50%] self-center lg:self-end max-w-[550px] lg:pb-24 py-40'}>
                    <div className={'rounded-full w-40 h-40 bg-white absolute -top-16 left-1/2'}></div>
                    <div className={'bg-white p-10'}>
                        <p className={'text-4xl font-bold tracking-tight text-gray-900 py-2'}>{title}</p>
                        <p className={'font-light text-2xl py-2'}>{position}</p>
                        <p className={'text-base font-light text-gray-700 py-2'}>{summary}</p>
                        <Link href={`/head-of-department/${nid}`} className={'block mt-5 max-w-fit rounded-md border-4 border-blue hover:border-black px-3.5 py-2.5 text-center text-sm font-semibold text-blue shadow-sm hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}>
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}