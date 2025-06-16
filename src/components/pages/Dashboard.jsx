import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { isToday, parseISO } from 'date-fns';
import { taskService, categoryService } from '@/services';
import ProgressWidget from '@/components/organisms/ProgressWidget';
import TaskList from '@/components/organisms/TaskList';
import AddTaskForm from '@/components/molecules/AddTaskForm';
import SearchBar from '@/components/molecules/SearchBar';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import ApperIcon from '@/components/ApperIcon';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [tasksData, categoriesData] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ]);
        setTasks(tasksData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter tasks based on search and category
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(task => task.category === 
        categories.find(c => c.Id === activeCategory)?.name
      );
    }

    return filtered;
  }, [tasks, searchQuery, activeCategory, categories]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const todayTasks = tasks.filter(task => 
      task.dueDate && isToday(parseISO(task.dueDate))
    ).length;

    return { totalTasks, completedTasks, todayTasks };
  }, [tasks]);

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.Id === updatedTask.Id ? updatedTask : task
    ));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.Id !== taskId));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="h-full p-6 space-y-6">
        {/* Progress Widget Skeleton */}
        <div className="animate-pulse bg-gray-200 rounded-xl h-40"></div>
        
        {/* Controls Skeleton */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="animate-pulse bg-gray-200 rounded-lg h-10 flex-1"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-10 w-64"></div>
        </div>

        {/* Task List Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-semantic-error mx-auto mb-4" />
          <h3 className="text-lg font-display font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-500 font-body mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Progress Overview */}
        <ProgressWidget
          totalTasks={stats.totalTasks}
          completedTasks={stats.completedTasks}
          todayTasks={stats.todayTasks}
        />

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search tasks..."
            className="w-full lg:w-96"
          />
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Add Task Form */}
        <AddTaskForm
          categories={categories}
          onTaskAdded={handleTaskAdded}
        />

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600 font-body">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}
          
          <TaskList
            tasks={filteredTasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            groupByCategory={!searchQuery && !activeCategory}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;