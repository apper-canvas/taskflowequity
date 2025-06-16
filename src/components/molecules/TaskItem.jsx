import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isPast, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { taskService } from '@/services';

const TaskItem = ({ 
  task, 
  onTaskUpdate, 
  onTaskDelete,
  className = '' 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const updatedTask = await taskService.update(task.Id, {
        completed: !task.completed
      });
      onTaskUpdate(updatedTask);
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;
    
    setIsUpdating(true);
    try {
      const updatedTask = await taskService.update(task.Id, {
        title: editTitle.trim()
      });
      onTaskUpdate(updatedTask);
      setIsEditing(false);
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskService.delete(task.Id);
      onTaskDelete(task.Id);
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const dueDate = parseISO(task.dueDate);
    if (isPast(dueDate) && !isToday(dueDate)) {
      return 'overdue';
    } else if (isToday(dueDate)) {
      return 'today';
    }
    return 'upcoming';
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`
        bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200
        ${task.completed ? 'opacity-75' : ''}
        ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isUpdating}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveEdit}
                autoFocus
                className="font-body"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h3 
                className={`
                  font-body font-medium cursor-pointer break-words
                  ${task.completed 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-900 hover:text-primary-600'
                  }
                `}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-2 flex-wrap">
                <Badge variant={task.priority} size="xs">
                  {task.priority}
                </Badge>
                
                <Badge variant="category" size="xs">
                  {task.category}
                </Badge>
                
                {task.dueDate && (
                  <div className={`
                    text-xs font-body px-2 py-1 rounded-full
                    ${dueDateStatus === 'overdue' 
                      ? 'bg-semantic-error text-white' 
                      : dueDateStatus === 'today'
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    <ApperIcon name="Calendar" size={12} className="inline mr-1" />
                    {format(parseISO(task.dueDate), 'MMM d')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 flex items-center space-x-1">
          {!isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon="Edit2"
                onClick={() => setIsEditing(true)}
                className="p-1.5"
              />
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={handleDelete}
                className="p-1.5 text-semantic-error hover:text-semantic-error"
              />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;