import Link from "next/link";

export default function NavBar() {
    return (
        <div className={`wrapper`}>
            <div className={`content`}>
                <Link href={'/'} className={`block__header-2`}>
                    На главную
                </Link>
            </div>
        </div>
    );
};
