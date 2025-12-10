import * as footerStyles from "./footer.module.css"

export default function Footer({copyrightYear}) {
    return (
        <p className={footerStyles.footer}>
            © {copyrightYear} Estudos de Gastsby. Todos os direitos reservados.
        </p>
    )
}