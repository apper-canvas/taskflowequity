import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import React from "react";

const CategoryFilter = ({ 
  categories = [], 
  activeCategory = null, 
  onCategoryChange,
  className = '' 
}) => {
const allCategory = { Id: null, Name: 'All', color: '#6B7280' };
  const filterCategories = [allCategory, ...categories];

  return (
    <motion.div 
      className={`flex flex-wrap gap-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {filterCategories.map((category) => (
        <Badge
          key={category.Id}
          variant={activeCategory === category.Id ? 'primary' : 'secondary'}
          onClick={() => onCategoryChange?.(category.Id)}
          className="cursor-pointer hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: activeCategory === category.Id ? category.color : undefined,
            borderColor: category.color 
          }}
        >
          {category.Name}
        </Badge>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;