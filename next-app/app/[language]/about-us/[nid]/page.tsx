import getNode from "@/lib/getNode";
import {aboutNode} from "@/types";
import Link from "next/link";
import Picture from "@/app/[language]/components/Image/Picture";

type Params = {
    params: {
        language: string,
        nid: string
    }
}

export default async function About({ params: { language, nid } }: Params) {

    const viewMode = 'default'

    const nodeData: Promise<aboutNode> = getNode(nid, viewMode, language)

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                value: body
            },
            field_about_image: image
        }
    } = node

    return (
        <article className={'w-fit'}>
            <p className={'text-3xl pb-10'}>{title}</p>
            <Picture img={image} styles={'sepia-5 w-fit float-left mr-7 mb-5'} img_styles={'rounded-3xl shadow-3xl'}/>
            <span>{body}</span>
        </article>
    )

}