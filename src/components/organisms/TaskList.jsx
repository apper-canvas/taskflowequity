import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/molecules/TaskItem';
import ApperIcon from '@/components/ApperIcon';

const TaskList = ({ 
  tasks = [], 
  onTaskUpdate, 
  onTaskDelete,
  groupByCategory = true,
  className = '' 
}) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center py-12 ${className}`}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="CheckSquare" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-display font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-2 text-gray-500 font-body">Create your first task to get started on your productivity journey</p>
      </motion.div>
    );
  }

  if (!groupByCategory) {
    return (
      <div className={`space-y-3 ${className}`}>
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskItem
                task={task}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  const groupedTasks = tasks.reduce((groups, task) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }
    groups[task.category].push(task);
    return groups;
  }, {});

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-display font-semibold text-gray-900 capitalize">
              {category}
            </h3>
            <div className="text-sm text-gray-500 font-body">
              {categoryTasks.length} task{categoryTasks.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {categoryTasks
                .sort((a, b) => a.order - b.order)
                .map((task, index) => (
                  <motion.div
                    key={task.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TaskItem
                      task={task}
                      onTaskUpdate={onTaskUpdate}
                      onTaskDelete={onTaskDelete}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;