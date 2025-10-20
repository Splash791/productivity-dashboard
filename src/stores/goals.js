import { defineStore } from 'pinia';

export const useGoalStore = defineStore('goals', {
  state: () => ({
    nextId: 4, 
    goals: [
      { 
        id: 1, 
        text: 'Learn Next.js App Router', 
        status: 'In Progress', 
        dueDate: 'Sep 29, 2024' 
      },
      { 
        id: 2, 
        text: 'Deploy a full-stack cloud application', 
        status: 'In Progress', 
        dueDate: 'Dec 30, 2024' 
      },
      { 
        id: 3, 
        text: 'Read 5 books on software architecture', 
        status: 'Completed', 
        dueDate: null 
      },
    ],
  }),
  actions: {
    addGoal(text, dueDate) {
      this.goals.push({
        id: this.nextId++, 
        text,
        status: 'In Progress', 
        dueDate,
      });
    },
    removeGoal(goalId) {
        this.goals = this.goals.filter(goal => goal.id !== goalId);
    },
    completeGoal(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (goal && goal.status === 'In Progress') {
            goal.status = 'Completed';
            goal.dueDate = null; 
        }
    }
  },
  getters: {
    inProgressGoals: (state) => state.goals.filter(g => g.status === 'In Progress'),
    completedGoals: (state) => state.goals.filter(g => g.status === 'Completed'),
  }
});