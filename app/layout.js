import "./layout.css"
import Footer from "./componentes/footer";
import Header from "./componentes/header";

export const metadata = {
    title: 'Adote Virtualmente um Animal Selvagem',
    description: 'Transforme sua curiosidade em cuidado',
}

export default function RootLayout({children}) { 

    return (
        <html lang="pt-BR">
            <body>
                <main className="layout">
                    <Header title="Estudos de NextJS"></Header>
                    <div className="main">
                        {children}
                    </div>
                    <Footer copyrightYear={2025} />
                </main>
            </body>
        </html>
    )
}