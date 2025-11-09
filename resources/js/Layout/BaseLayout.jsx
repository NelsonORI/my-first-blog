import { Link } from "@inertiajs/react";

export default function BaseLayout({ children }) {
    return (
        <div>
            <header className="p-4 border-b">
                <nav>
                    <ul className="flex gap-8">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}