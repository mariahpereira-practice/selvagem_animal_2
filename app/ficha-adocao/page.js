import { Suspense } from "react";
import FichaDeAdocaoForm from "./FichaDeAdocaoForm";

export const metadata = {
  title: 'Ficha de Adoção - Selvagem Animal',
  description: 'Preencha o formulário de adoção virtual',
};

export default function FichaDeAdocaoPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <FichaDeAdocaoForm />
    </Suspense>
  );
}


