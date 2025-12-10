import Link from "next/link"
import * as headerStyles from "./header.module.css"

export default function Header({title}) {

    return (
        <div className={headerStyles.header}>
                <h3 style={{ color: "white", marginLeft: "15px" }}>{title}</h3>
                <nav className={headerStyles.topnav}>
                    <Link href="/">Início</Link>
                    <Link href="/animal">Ver Animais</Link>
                    <Link href="/about">Sobre nós</Link>
                </nav>
        </div>
    )
}