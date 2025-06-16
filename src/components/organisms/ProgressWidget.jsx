import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProgressWidget = ({ 
  totalTasks = 0, 
  completedTasks = 0, 
  todayTasks = 0,
  className = '' 
}) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className={`bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold">Daily Progress</h2>
        <div className="p-2 bg-white/10 rounded-lg">
          <ApperIcon name="Target" size={24} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-2xl font-display font-bold"
          >
            {completedTasks}
          </motion.div>
          <div className="text-sm opacity-90 font-body">Completed</div>
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-2xl font-display font-bold"
          >
            {pendingTasks}
          </motion.div>
          <div className="text-sm opacity-90 font-body">Pending</div>
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-2xl font-display font-bold"
          >
            {todayTasks}
          </motion.div>
          <div className="text-sm opacity-90 font-body">Due Today</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-body">
          <span>Overall Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressWidget;