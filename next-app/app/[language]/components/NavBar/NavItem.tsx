import Link from "next/link";

type Prop = {
    text: string,
    href: string,
    active: boolean,
}

export default function NavItem({ text, href, active }: Prop) {
    return (
        <Link href={href} className={`nav__item ${
            active ? "active" : ""
        }`}>
            {text}
        </Link>
    );
};