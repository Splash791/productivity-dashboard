import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    nextId: 6, 
    tasks: [
      { id: 1, text: 'more', priority: 'Medium', completed: false },
      { id: 2, text: 'more', priority: 'Medium', completed: false },
      { id: 3, text: 'drink water', priority: 'Medium', completed: false },
      { id: 4, text: 'Review project proposal', priority: 'High', completed: false },
      { id: 5, text: 'Schedule team meeting', priority: 'Medium', completed: false },
      { id: 6, text: 'Water the plants', priority: 'Low', completed: true },
    ],
  }),
  actions: {
    addTask(text, priority) {
      this.tasks.push({
        id: ++this.nextId,
        text,
        priority,
        completed: false,
      });
    },
    toggleCompletion(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  getters: {
    pendingTasks: (state) => state.tasks.filter(t => !t.completed),
    completedTasks: (state) => state.tasks.filter(t => t.completed),
  }
});