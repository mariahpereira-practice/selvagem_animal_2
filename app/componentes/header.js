import Link from "next/link";
import * as headerStyles from "./header.module.css";
import AuthButton from "./AuthButton";
import { verifySession } from "@/lib/session";

export default async function Header({title}) {

    const session = await verifySession();

    return (
        <div className={headerStyles.header}>
            <h3 style={{ color: "white", marginLeft: "15px" }}>{title}</h3>
            <nav className={headerStyles.topnav}>
                <Link href="/">Início</Link>
                <Link href="/about">Sobre nós</Link>
                <AuthButton user={session} />
            </nav>
        </div>
    );
}