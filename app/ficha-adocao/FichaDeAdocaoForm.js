'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FichaDeAdocaoForm() {
  const searchParams = useSearchParams();
  
  const [animal, setAnimal] = useState(null);
  const [inputs, setInputs] = useState({
    nome: "",
    email: "",
    animal: "",
    mensagem: ""
  });

  useEffect(() => {
    const nome = searchParams.get('nome');
    const nomeCientifico = searchParams.get('nomeCientifico');
    const hero_image = searchParams.get('hero_image');
    const hero_image_alt = searchParams.get('hero_image_alt');

    if (nome) {
      const animalData = {
        nome,
        nomeCientifico,
        hero_image,
        hero_image_alt
      };
      setAnimal(animalData);
      setInputs(prev => ({ ...prev, animal: nome }));
    } else {
      // Redireciona apenas no cliente
      if (typeof window !== "undefined") {
        alert("Nenhum animal foi selecionado para adoção. Você será redirecionado para a página de animais.");
        window.location.href = "/animal";
      }
    }
  }, [searchParams]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Envia para o Netlify Forms
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "form-react", ...inputs })
    })
    .then(() => {
      alert("Em breve daremos uma resposta de seu contato! Obrigado(a)!");
      setInputs({ nome: "", email: "", animal: animal?.nome || "", mensagem: "" });
    })
    .catch(error => {
      console.error('Form submission error:', error);
      alert("Erro ao enviar formulário. Tente novamente.");
    });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setInputs({ nome: "", email: "", animal: animal?.nome || "", mensagem: "" });
  };

  if (!animal) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h3 className="titulo">Ficha de Adoção - {animal.nome}</h3>
      <div className="flex-container ficha-container">
        <div className="col-1">
          <form
            name="form-react"
            method="post"
            onSubmit={handleSubmit}
            onReset={handleReset}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="form-react" />
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="animal" value={inputs.animal} />
            <br />
            <label className="label">
              <span className="span-nome">
                Animal: {inputs.animal}
              </span>
            </label>
            <br />
            <label className="label">
              <span>Nome Completo do Adotante:</span>
              <input
                type="text"
                name="nome"
                value={inputs.nome}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              <span>E-mail de contato:</span>
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="label">
              Por que você deseja adotar este animal?
            </label>
            <textarea
              name="mensagem"
              rows={5}
              value={inputs.mensagem}
              onChange={handleChange}
            />
            <br />
            <br />
            <br />
            <nav className="botoes-animal">
              <input type="submit" value="Enviar" />
              <input type="reset" value="Limpar" />
              <Link href="/animal">Ver outros animais</Link>
            </nav>
          </form>
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
