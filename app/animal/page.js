import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import AnimalCard from "../componentes/animalCard";

export const metadata = {
  title: 'Animais Disponíveis - Selvagem Animal',
  description: 'Veja todos os animais disponíveis para adoção virtual',
};

function getAnimalsData() {
  const animalsDirectory = path.join(process.cwd(), 'animal');
  const filenames = fs.readdirSync(animalsDirectory);
  
  const animals = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(animalsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        ...data,
        id: filename.replace(/\.mdx$/, ''),
      };
    });
  
  return animals;
}

export default function AnimalPage() {
  const animals = getAnimalsData();
  
  return (
    <>
      <h2 className="titulo">Animais Disponíveis:</h2>
      <div className="animal-grid">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </>
  );
}
