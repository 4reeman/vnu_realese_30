import FeedbackArticle from "@/app/[language]/components/feedbacks/FeedbackArticle";


export default async function AboutUs() {
    const nids = ['29', '30']

    const viewMode = 'teaser'

    return (
        <section className={'bg-gray-200'}>
            <div className={'max-w-7xl mx-auto py-28'}>
                <p className={'text-3xl sm:text-4xl text-center font-bold mb-8'}>
                    Що говорять наші студенти
                </p>
                <div className={'flex flex-col lg:flex-row gap-20 px-14'}>
                    {nids?.map((nid, index) => (
                        <>
                            {/* @ts-expect-error Async Server Component  */}
                            <FeedbackArticle key={index} nid={nid} view_mode={viewMode}/>
                        </>
                    ))}
                </div>
            </div>
        </section>
    )

}
