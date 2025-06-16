import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  pulse = false,
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium font-body rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    high: 'bg-gradient-to-r from-semantic-error to-red-500 text-white',
    medium: 'bg-gradient-to-r from-accent to-yellow-500 text-white', 
    low: 'bg-gradient-to-r from-semantic-success to-green-500 text-white',
    category: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white'
  };
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const badgeContent = (
    <span className={badgeClasses}>
      {children}
    </span>
  );

  if (pulse) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
};

export default Badge;