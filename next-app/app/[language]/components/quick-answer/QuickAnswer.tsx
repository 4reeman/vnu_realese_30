import QuickAnswerMain from "@/app/[language]/components/quick-answer/QuickAnswerMain";
import QuickAnswerArticle from "@/app/[language]/components/quick-answer/QuickAnswerArticle";
import Modal from "@/app/[language]/components/quick-answer/Modal";

export default function QuickAnswer() {
    const main = '24'

    const quick = ['25', '26', '27', '28']

    const viewMode = 'teaser'

    return (
        <section className={'max-w-7xl mx-auto p-14'}>
            <p className={'text-4xl py-10 mx-auto w-fit font-bold tracking-tight text-gray-900'}>
                Quick Question
            </p>
            <div className={'flex flex-col lg:flex-row gap-20'}>
                <div className={'flex-[1_1_50%]'}>
                    {/* @ts-expect-error Server Component */}
                    <QuickAnswerMain id={main} view_mode={viewMode}/>
                </div>
                <div className={'flex-[1_1_50%] bg-gray-100 p-10 rounded-md'}>
                    {quick.map((id, index) => (
                        <>
                            {/* @ts-expect-error Server Component */}
                            <QuickAnswerArticle key={index} id={id} view_mode={viewMode}/>
                        </>
                    ))}
                </div>
            </div>
        </section>
    )
}