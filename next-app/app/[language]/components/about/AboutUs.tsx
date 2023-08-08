import AboutUsArticle from "@/app/[language]/components/about/AboutUsArticle";

export default async function AboutUs() {

    const nids = ['17', '18']

    const viewMode = 'teaser'

    const styles = [
        {
            title: 'text-4xl font-bold tracking-tight text-gray-900',
            summary: 'text-base font-medium text-gray-900',
            image_order: 'order-2',
        },
        {
            title: 'font-light text-2xl',
            summary: 'text-base font-light text-gray-700',
            image_order: 'order-0',
        }
    ]
    return (
        <section className={'max-w-7xl mx-auto py-28 flex flex-col lg:flex-row gap-52 lg:gap-0'}>
                {nids?.map((nid, index) => (
                    <>
                        {/* @ts-expect-error Async Server Component  */}
                        <AboutUsArticle key={index} nid={nid} view_mode={viewMode} styles={styles[index]}/>
                    </>
                ))}
        </section>
    )

}
