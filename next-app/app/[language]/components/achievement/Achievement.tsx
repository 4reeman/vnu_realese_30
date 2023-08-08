import {achievementNode} from "@/types";
import getFullBundle from "@/lib/getAllBundle";
// import useTranslation from "@/hooks/useTranslation";

export default async function Achievement() {
    // const { locale } = useTranslation()

    const bundle_name = 'achievement'

    const view_mode = 'default'

    const bundleData: Promise<[]> = getFullBundle(bundle_name, view_mode, 4, 'en')

    const bundle = await bundleData

    return (
        <section  className={'bg-zinc-900'}>
            <div className={'grid max-w-7xl mx-auto py-20 px-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12'}>
                {bundle?.map((node: achievementNode, index) => {
                    return (
                        <div key={index} className={'text-white flex flex-col text-center text-xl'}>
                            <div><span>+</span><span>{node.config_fields.field_quantity.value}</span></div>
                            <p>{node.config_fields.field_achievement.value}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}