import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto tempo leva para o pedido chegar?",
    a: "Despachamos em até 1 dia útil. A entrega varia de 2 a 7 dias úteis para a maior parte do Brasil, com rastreio em tempo real enviado por e-mail e WhatsApp.",
  },
  {
    q: "Como é feita a curadoria dos produtos?",
    a: "Trabalhamos só com marcas e fornecedores oficiais. Cada produto passa por avaliação editorial — composição, performance e custo-benefício real para o público brasileiro.",
  },
  {
    q: "É seguro pagar no site?",
    a: "Sim. Todo o pagamento é processado por gateway certificado (cartão, Pix ou boleto), com criptografia ponta a ponta. Não armazenamos dados sensíveis no nosso sistema.",
  },
  {
    q: "Posso trocar ou devolver?",
    a: "Você tem 7 dias corridos a partir do recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor. Lacre violado em produtos cosméticos pode limitar a troca por questões sanitárias.",
  },
  {
    q: "Os produtos são originais?",
    a: "100% originais, com nota fiscal e procedência rastreável. Caso receba algo fora do esperado, resolvemos imediatamente.",
  },
];

export function PremiumFAQ() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        <div className="md:col-span-1">
          <p className="editorial-eyebrow">Dúvidas frequentes</p>
          <h2 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
            Tudo que você precisa saber
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Compra segura, entrega acompanhada e suporte humano. Se ainda restar dúvida, fale com a gente.
          </p>
        </div>
        <div className="md:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-b-0">
                <AccordionTrigger className="py-5 text-left text-[14px] font-semibold text-foreground hover:no-underline sm:text-[15px]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
