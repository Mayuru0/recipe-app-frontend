import ButtomHero from "@/components/Home/ButtomHero";
import CategorieSection from "@/components/Home/CategorieSection";
import Hero1 from "@/components/Home/Hero1";
import Stats from "@/components/Home/Stats";



export default function Home() {
  return (
   
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/2 ">
      <section className="w-full h-screen">
        <Hero1 />
      </section>
      <section className="w-full ">
      <Stats />
      </section>
      <section className="w-full ">
        <CategorieSection />
      </section>
      <section className="w-full">
        <ButtomHero />
      </section>

    </main>
  );
}
