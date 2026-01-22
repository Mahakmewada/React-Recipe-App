import React from 'react'
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
const CategorySelection = ({filterByCategory}) => {  
  // console.log("CategorySelection rendered");
  
    const featuredCategories = [
      "Chicken",
      "Dessert",
      "Seafood",
      "Vegetarian",
      "Breakfast",
      "Pasta",
      "Goat",
      "Pork",
      "Lamb",
    ];
  return (
    <>
        <section className="mt-20">
      <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight pl-4 flex items-center border-l-4 border-yellow-400">
        <Utensils className="w-6 h-6 mr-3 text-blue-500" />
        Quick Filter by Primary Ingredient 
      </h2>  

<div className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6' > 
{featuredCategories.map((cat) => ( <Link to = {`/search/${cat}`} key = {cat} onClick = {() => filterByCategory?.(cat)}
className = 'bg-gray-800 sm:p-5 p-4 rounded-xl shadow-xl shadow-black transition duration-300 text-center font-semibold text-gray-100 border border-gray-700 hover:border-blue hover:text-blue-400 transform hover:scale-[1.05] hover:bg-gray-700/50'> 
{cat} 



</Link> ))}
</div>
      </section>
    </>
  )
}

export default CategorySelection