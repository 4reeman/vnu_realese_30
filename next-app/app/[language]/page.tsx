import AboutUs from "@/app/[language]/components/about/AboutUs";
import Achievement from "@/app/[language]/components/achievement/Achievement";
import HeadDepartment from "@/app/[language]/components/head-of-department/HeadDepartment";
import QuickAnswer from "@/app/[language]/components/quick-answer/QuickAnswer";
import Feedback from "@/app/[language]/components/feedbacks/Feedbacks"

export default function Home() {
    return (
        <>
            <main className={''}>
                {/* @ts-expect-error Async Server Component  */}
                <AboutUs/>
                {/* @ts-expect-error Async Server Component  */}
                <Achievement/>
                {/* @ts-expect-error Async Server Component  */}
                <HeadDepartment/>
                <QuickAnswer/>
                {/* @ts-expect-error Async Server Component  */}
                <Feedback/>
            </main>
        </>
    )
}