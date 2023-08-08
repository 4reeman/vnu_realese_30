"use client"

import getNode from "@/lib/getNode";
import {answerNode} from "@/types";

type Params = {
    params: {
        language: string,
        nid: string
    }
}

export default async function QuickAnswer({ params: { language, nid }}: Params) {

    const viewMode = 'default'

    const nodeData: Promise<answerNode> = getNode(nid, viewMode, language)

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
        }
    } = node

    return (
        <article className={'w-fit'}>

        </article>
    )
}