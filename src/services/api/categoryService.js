import categoriesData from '../mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let categories = [...categoriesData];

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id, 10));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    const newCategory = {
      Id: maxId + 1,
      ...categoryData,
      order: categories.length
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    const updatedCategory = { 
      ...categories[index], 
      ...updates,
      Id: categories[index].Id
    };
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    const deletedCategory = { ...categories[index] };
    categories.splice(index, 1);
    return deletedCategory;
  }
};

export default categoryService;