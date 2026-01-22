import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { Clock, Loader2 as Loader } from "lucide-react";


import { Link } from "react-router-dom";

const TrendingRecipe = ({ title, fetchUrl }) => {
  const { data, loading } = useFetch(fetchUrl);
  const meals = data?.meals || [];

  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Responsive cards per view
  useEffect(() => {
    const updateCards = () => {
      const width = window.innerWidth;
      if (width >= 1280) setCardsPerView(7);
      else if (width >= 1024) setCardsPerView(6);
      else if (width >= 768) setCardsPerView(5);
      else setCardsPerView(5);
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
    }, 3000);

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
    <section className="mt-6 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight pl-4 flex items-center border-l-4 border-yellow-400">
        <Clock className="w-6 h-6 mr-3 text-blue-500" />
        {title}
      </h2>

      <div className="overflow-hidden w-full mx-auto">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / cardsPerView)}%)`,
          }}
        >
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className={`flex justify-center px-2`}
              style={{ flex: `0 0 ${100 / cardsPerView}%` }} 
            > 
            <Link to = {`/recipe/${meal.idMeal}/`}> 
              <div className="w-[150px] h-[150px] mx-auto bg-gray-900 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-blue-500/50 border border-gray-800">
                <img
                  src={meal?.strMealThumb}
                  alt={meal?.strMeal}
                  className="w-full h-full object-cover"
                />
              </div> 
              </Link>
            </div> 
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingRecipe;
