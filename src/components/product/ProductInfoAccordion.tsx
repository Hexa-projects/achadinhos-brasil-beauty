import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props {
  benefits?: string[];
  howToUse?: string[];
  technicalSpecs?: Record<string, string>;
}

export function ProductInfoAccordion({ benefits, howToUse, technicalSpecs }: Props) {
  return (
    <Accordion type="multiple" className="w-full">
      {benefits && benefits.length > 0 && (
        <AccordionItem value="benefits">
          <AccordionTrigger className="text-sm font-semibold">Benefícios</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1.5">
              {benefits.map((b, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{b}</li>)}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
      {howToUse && howToUse.length > 0 && (
        <AccordionItem value="howToUse">
          <AccordionTrigger className="text-sm font-semibold">Como Usar</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
              {howToUse.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </AccordionContent>
        </AccordionItem>
      )}
      {technicalSpecs && Object.keys(technicalSpecs).length > 0 && (
        <AccordionItem value="specs">
          <AccordionTrigger className="text-sm font-semibold">Especificações</AccordionTrigger>
          <AccordionContent>
            <dl className="space-y-1.5">
              {Object.entries(technicalSpecs).map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-foreground">{v}</dd></div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
