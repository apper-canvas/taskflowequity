import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';

const CategoryFilter = ({ 
  categories = [], 
  activeCategory = null, 
  onCategoryChange,
  className = '' 
}) => {
  const allCategory = { Id: null, name: 'All', color: '#6B7280' };
  const filterCategories = [allCategory, ...categories];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filterCategories.map((category) => {
        const isActive = activeCategory === category.Id;
        
        return (
          <motion.button
            key={category.Id || 'all'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange && onCategoryChange(category.Id)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium font-body transition-all duration-200
              ${isActive 
                ? 'text-white shadow-md' 
                : 'text-gray-600 bg-white border border-gray-200 hover:border-gray-300'
              }
            `}
            style={isActive ? { 
              background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` 
            } : {}}
          >
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;