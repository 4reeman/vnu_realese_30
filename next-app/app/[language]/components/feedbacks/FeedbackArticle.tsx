import Picture from "@/app/[language]/components/Image/Picture";
import getNode from "@/lib/getNode";
import {feedbacksNode} from "@/types";
// import useTranslation from "@/hooks/useTranslation";

type Prop = {
    nid: string,
    view_mode: string
}

export default async function AboutUsArticle({ nid, view_mode }: Prop) {
    // const { locale } = useTranslation()

    const nodeData: Promise<feedbacksNode> = getNode(nid, view_mode, 'en')

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                value: body,
                summary: summary
            },
            field_feedbacks_image: image,
            field_stude: student_position
        }
    } = node

    return (
        <article className={'flex flex-col flex-[1_1_50%] gap-y-4 spx-14'}>
            <Picture img={image} img_styles={'rounded-full'} styles={'w-20'}/>
            <div className={'text-base font-medium'}>{body}</div>
            <div className={'font-light text-2xl'}>{title}</div>
            <div className={'text-base font-light text-gray-700'}>{student_position}</div>
        </article>
    )

}

