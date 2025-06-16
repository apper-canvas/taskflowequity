import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const hasError = !!error;
  
  const inputClasses = `
    w-full px-4 py-2 font-body text-gray-900 bg-white border rounded-lg 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
    ${hasError 
      ? 'border-semantic-error focus:ring-semantic-error focus:border-semantic-error' 
      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
    }
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium font-body text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-semantic-error font-body">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;