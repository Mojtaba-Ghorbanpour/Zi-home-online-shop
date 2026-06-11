import FaqAccordion from "@/components/accordion-components/faq-accordion";

export default async function FaqPage() {
  return (
    <section className="flex flex-col items-center gap-10">
      <h2 className="text-2xl font-medium">سوالات شما :</h2>
      <FaqAccordion />
    </section>
  );
}
