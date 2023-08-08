import {answerNode} from "@/types";
import getNode from "@/lib/getNode";
import Modal from "@/app/[language]/components/quick-answer/Modal";
// import useTranslation from "@/hooks/useTranslation";

type Prop = {
    id: string,
    view_mode: string
}

export default async function QuickAnswerMain({id, view_mode}: Prop) {
    // const { locale } = useTranslation()

    const nodeData: Promise<answerNode> = getNode(id, view_mode, 'en')

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                value: body,
                summary: summary
            }
        }
    } = node

    return (
        <article className={''}>
            <p className={'pb-6 text-xl font-medium text-gray-900'}>{summary}</p>
            <Modal title={title} body={body}/>
        </article>
    )
}

