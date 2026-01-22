import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import RecipeCard from "./RecipeCard";
import { Clock, Loader } from "lucide-react";

const RecipeSlider = ({ title, fetchUrl }) => {
  const { data, loading } = useFetch(fetchUrl);
  const meals = data?.meals || [];

  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Responsive cards per view
  useEffect(() => {
    const updateCards = () => {
      const width = window.innerWidth; 
      if (width >= 1280) setCardsPerView(5);
      else if (width >= 1024) setCardsPerView(4);
      else if (width >= 640) setCardsPerView(3);
      else setCardsPerView(2);
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const totalSlides = Math.ceil(meals.length / cardsPerView);

  // Auto slide
  useEffect(() => {
    if (!meals.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 2000); // 3 seconds

    return () => clearInterval(interval);
  }, [meals.length, totalSlides]);

  if (loading) {
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-blue-400" />
        Loading {title}...
      </div> 
    );
  } 

  return (
    <section className="mt-2 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight border-1-4 border-yellow-400 pl-4 flex items-center">
        <Clock className="w-6 h-6 mr-3 text-blue-500" />
        {title}
      </h2>

      <div className="overflow-hidden w-[90%] mx-auto">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / cardsPerView)}%)`,
          }}
        >
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="flex justify-center px-1 sm:px-1.5 lg:px-3 xl:px-2 min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4"
            >
              <RecipeCard meal={meal} />
            </div> 
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeSlider;
