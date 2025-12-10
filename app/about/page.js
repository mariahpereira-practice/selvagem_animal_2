export const metadata = {
  title: 'Sobre o Projeto - Selvagem Animal',
  description: 'Saiba mais sobre o projeto de adoção virtual de animais selvagens',
};

export default function About() {
  return (
    <>
      <h1 className="titulo">Sobre o projeto</h1>
      <p>Este é um projeto para um curso de FullStack em Desenvolvimento com Next.js.</p>
      <p>
        O objetivo é criar um site informativo sobre animais, utilizando Next.js para gerar 
        páginas estáticas a partir de arquivos MDX.
      </p>
      <p>Nada aqui é real, é tudo fictício e criado apenas para fins educacionais.</p>
    </>
  );
}
