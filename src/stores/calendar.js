import { defineStore } from 'pinia';
import axios from 'axios';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    accessToken: null,
    events: [],
    loading: false,
    error: null,
    isAuthenticated: false,
    tokenClient: null,
  }),
  actions: {
    async waitForGoogleScript() {
        return new Promise(resolve => {
            if (window.google) {
                resolve();
            } else {
                window.onload = resolve;
            }
        });
    },

    async initGoogleAuth() {
        await this.waitForGoogleScript(); 
        if (!window.google) return; 
        if (this.tokenClient) return;

        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: CALENDAR_SCOPE,
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    this.setAccessToken(tokenResponse.access_token);
                    this.isAuthenticated = true;
                    this.fetchGoogleEventsForCurrentMonth();
                } else {
                    this.isAuthenticated = false;
                }
            },
        });
    },

    requestAccessToken() {
        if (this.tokenClient) {
            this.tokenClient.requestAccessToken();
        } else {
            console.error('Google Auth client not initialized. Retrying init...');
            this.initGoogleAuth();
        }
    },

    setAccessToken(token) {
        this.accessToken = token;
    },

    async fetchGoogleEventsForCurrentMonth(startOfMonth, endOfMonth) {
        if (!this.isAuthenticated) return;
        
        this.loading = true;
        this.error = null;
        
        const calendarId = 'primary';
        const URL = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;

        try {
            const response = await axios.get(URL, {
                headers: { 'Authorization': `Bearer ${this.accessToken}` },
                params: {
                    timeMin: startOfMonth.toISOString(), 
                    timeMax: endOfMonth.toISOString(), 
                    singleEvents: true,
                    orderBy: 'startTime'
                }
            });
            
            this.events = response.data.items.map(item => {
                const date = new Date(item.start.dateTime || item.start.date);
                const summary = item.summary || 'No Title';
                let type = (summary.toLowerCase().includes('deadline') || summary.toLowerCase().includes('urgent')) ? 'High' : 'Low';

                return {
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    summary: summary,
                    type: type 
                };
            });
            
        } catch (error) {
            console.error('Error fetching Google Calendar events:', error);
            this.error = 'Failed to load events.';
            if (error.response && error.response.status === 401) {
                this.isAuthenticated = false;
                this.accessToken = null;
            }
        } finally {
            this.loading = false;
        }
    }
  },
  getters: {
    getEventsForMonth: (state) => (month, year) => {
      return state.events.filter(e => e.month === month && e.year === year);
    }
  }
});