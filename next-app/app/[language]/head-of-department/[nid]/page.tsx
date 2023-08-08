import getNode from "@/lib/getNode";
import {headOfTheDepartmentNode} from "@/types";
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

    const nodeData: Promise<headOfTheDepartmentNode> = getNode(nid, viewMode, language)

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                value: body
            },
            field_department_head_image: image,
            field_position_of_professor: position
        }
    } = node

    return (
        <article className={'w-fit'}>
            <p className={'text-3xl pb-10'}>{title}</p>
            <p className={'text-xl pb-10'}>{position}</p>
            <Picture img={image} styles={'sepia-5 w-fit float-left mr-7 mb-5'} img_styles={'rounded-3xl shadow-3xl'}/>
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </article>
    )

}