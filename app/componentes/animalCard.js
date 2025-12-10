import Link from "next/link";
import "./animalCard.css"; 

export default function AnimalCard({ animal }) {
    return (
        <article className="animal-card">
            <div className="nome-animal">
                <h3>{animal.nome}</h3>
                <span>({animal.nomeCientifico})</span>
            </div>
            {animal.hero_image && (
                <img
                    src={animal.hero_image}
                    alt={animal.hero_image_alt || "Imagem do animal"}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            )}
            <nav className="botoes-animal">
                <Link href={`/${animal.slug}`}>Ver mais sobre</Link>
                <Link
                    href={`/ficha-adocao?nome=${encodeURIComponent(animal.nome)}&nomeCientifico=${encodeURIComponent(animal.nomeCientifico)}&hero_image=${encodeURIComponent(animal.hero_image)}&hero_image_alt=${encodeURIComponent(animal.hero_image_alt || '')}`}
                >
                    Preencher Ficha de Adoção
                </Link>
            </nav>
        </article>
    );
}