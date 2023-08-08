"use client"
import {answerNode} from "@/types";
import getNode from "@/lib/getNode";
import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/20/solid";
// import useTranslation from "@/hooks/useTranslation";

type Prop = {
    id: string,
    view_mode: string
}

export default async function QuickAnswerArticle({id, view_mode}: Prop) {
    // const { locale } = useTranslation()

    const nodeData: Promise<answerNode> = getNode(id, view_mode, 'en')

    const node = await nodeData

    const {
        base_fields: {
            title: title
        },
        config_fields: {
            body: {
                summary: summary
            }
        }
    } = node

    return (
        <article className={'my-2'}>
            <Disclosure>
                {({ open }) => (
                    // <div className={`${open ? 'max-h-96' : 'max-h-9'} transition-max-height max-h-9 duration-1000 ease-linear `}>
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-grey-900 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>{title}</span>
                            <ChevronUpIcon
                                className={`${
                                    open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-black`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className='pl-4 pr-8 py-2 text-sm text-gray-500'>
                            {summary}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </article>
    )
}

