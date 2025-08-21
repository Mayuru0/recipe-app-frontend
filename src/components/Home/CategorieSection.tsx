import React from "react";
import { CategoriesGrid } from "../Categories/categories-grid";

const CategorieSection = () => {
  return (
    <section className="py-16 px-4" data-aos="fade-up">
      <div className="container mx-auto">
        <div className="text-center mb-12" data-aos="fade-down" data-aos-delay="100">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Recipe Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From quick weeknight dinners to elaborate weekend treats, find the perfect recipe for any occasion
          </p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <CategoriesGrid />
        </div>
      </div>
    </section>
  );
};

export default CategorieSection;
