import Picture from "@/app/[language]/components/Image/Picture";
import getFullBundle from "@/lib/getAllBundle";
import {aboutNode} from "@/types";

export default async function AboutUsList() {
    const bundleData: Promise<[]> = getFullBundle('about_us','teaser', 10, 'en')

    const bundle = await bundleData

    return (
        <section className="bg-blue-400">
        {bundle?.map((node:aboutNode, index) => {
            return (
                <>
                    <article className="bg-blue-400">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Department Name</h2>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                <div key={index} className="group relative">
                                    <h3 className="text-sm text-gray-700">
                                        <a href={`/about-us/${node.base_fields.nid}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {node.base_fields.title}
                                        </a>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-900">{node.config_fields.body.summary}</p>
                                    <span>Body  {node.config_fields.body.value}</span>
                                    <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <Picture img={node.config_fields.field_about_image}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </>
            )
        })}
        </section>
    )
}