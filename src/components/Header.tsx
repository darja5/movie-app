import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full px-4 md:px-8 pt-4 bg-transparent">
            <Link href="/" className="inline-block hover:opacity-80 transition">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="hover:opacity-80 transition"
                />
            </Link>
        </header>
    );
}