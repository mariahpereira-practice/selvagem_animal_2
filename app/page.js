import Image from "next/image";

export default function Home() {
  return (
      <div className="flex-container">
      <div className="col-1">
        <h1 className="titulo">Adote Virtualmente um Animal Selvagem</h1> 
        <br></br>     
          <div>
              <h3>Transforme sua curiosidade em cuidado</h3>
              <p>Você sabia que pode ajudar na proteção de animais selvagens sem sair de casa? Com a adoção virtual, você escolhe um animal para acompanhar de perto e contribui diretamente para sua preservação.</p>
          </div>
          <div>
            <h3>Como Funciona?</h3>
            <p>Escolha seu animal favorito: Gato-selvagem, Girafa, macaco-japonês e até mesmo Panda! Cada espécie
                tem uma história única e um papel essencial na natureza.</p>
          </div>
          <div>
            <h3>Receba conteúdos exclusivos</h3>
            <p>Ao ter sua adoção aprovada, você recebe um kit digital com:</p>
                <ul>
                    <li>Certificado de adoção personalizado.</li>
                    <li>Ficha informativa sobre o animal.</li>
                    <li>Vídeos e fotos atualizadas.</li>
                    <li>Curiosidades e alertas sobre ameaças à espécie.</li>
                    <li>Apoie a conservação.</li>
                    <li>Parte do valor da adoção é destinada a ONGs e projetos sérios que atuam na proteção da fauna brasileira.</li>
                </ul>
          </div>
          <div>
            <h3>Compartilhe sua causa</h3>
            <p>Mostre seu apoio nas redes sociais com artes exclusivas e incentive mais pessoas a se conectarem com a natureza.</p>
          </div>
          <div>
            <h3>Por que adotar virtualmente?</h3>
            <ul>
                <li>Não envolve posse ou contato físico com o animal.</li>
                <li>É uma forma ética e educativa de apoiar a biodiversidade.</li>
                <li> Ideal para crianças, escolas, amantes da natureza e curiosos.</li>
            </ul>
        </div>
        </div>
          <Image
          src="/images/gato_porco_urso.png"
          alt="Gato, porco e urso"
          className="col-2"
          width={800}
          height={800}
          style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
      </div>
  );
}
