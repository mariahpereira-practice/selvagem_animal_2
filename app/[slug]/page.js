import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import Link from "next/link";

export async function generateStaticParams() {
  const animalsDirectory = path.join(process.cwd(), 'animal');
  const filenames = fs.readdirSync(animalsDirectory);
  
  return filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(animalsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug,
      };
    });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const animalsDirectory = path.join(process.cwd(), 'animal');
  const filenames = fs.readdirSync(animalsDirectory);
  
  const filename = filenames.find(fn => {
    const filePath = path.join(animalsDirectory, fn);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data.slug === slug;
  });
  
  if (!filename) {
    return { title: 'Animal não encontrado' };
  }
  
  const filePath = path.join(animalsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  
  return {
    title: `${data.nome} - Selvagem Animal`,
    description: `Conheça o ${data.nome} (${data.nomeCientifico}) e faça sua adoção virtual`,
  };
}

export default async function AnimalPost({ params }) {
  const { slug } = await params;
  const animalsDirectory = path.join(process.cwd(), 'animal');
  const filenames = fs.readdirSync(animalsDirectory);
  
  const filename = filenames.find(fn => {
    const filePath = path.join(animalsDirectory, fn);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data.slug === slug;
  });
  
  if (!filename) {
    return <div>Animal não encontrado</div>;
  }
  
  const filePath = path.join(animalsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: animal } = matter(fileContents);
  
  return (
    <>
      <h2 className="titulo">{animal.nome}</h2>
      <div className="flex-container">
        <div className="col-1">
          <p><b>Nome Científico:</b> {animal.nomeCientifico}</p>
          <p><b>Habitat</b>: {animal.habitat}</p>
          <p><b>Dieta:</b> {animal.dieta}</p>
          <p><b>Curiosidade:</b> {animal.curiosidade}</p>
          <nav className="botoes-animal">
            <Link
              href={`/ficha-adocao?nome=${encodeURIComponent(animal.nome)}&nomeCientifico=${encodeURIComponent(animal.nomeCientifico)}&hero_image=${encodeURIComponent(animal.hero_image)}&hero_image_alt=${encodeURIComponent(animal.hero_image_alt || '')}`}
            >
              Preencher Ficha de Adoção
            </Link>
            <Link href="/animal" className="botoes-animal">
              Ver outros animais
            </Link>
          </nav>
        </div>
        <div className="col-2">
          {animal.hero_image && (
            <img
              className="imagem-sobre-animal"
              src={animal.hero_image}
              alt={animal.hero_image_alt || "Imagem do animal"}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
    </>
  );
}
