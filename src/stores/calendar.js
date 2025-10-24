import { defineStore } from 'pinia';
import axios from 'axios';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; //add this in later
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    accessToken: null,
    events: [],
    loading: false,
    error: null,
    isAuthenticated: false,
  }),
  actions: {
    initGoogleAuth() {
        if (!window.google) {
            console.error('Google Identity Services script not loaded.');
            return;
        }

        this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: CALENDAR_SCOPE,
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    this.setAccessToken(tokenResponse.access_token);
                    this.isAuthenticated = true;
                    this.fetchGoogleEventsForCurrentMonth();
                } else {
                    console.error('Failed to get access token:', tokenResponse);
                    this.isAuthenticated = false;
                }
            },
        });
    },

    requestAccessToken() {
        if (this.tokenClient) {
            this.tokenClient.requestAccessToken();
        } else {
            console.error('Google Auth client not initialized.');
        }
    },

    setAccessToken(token) {
        this.accessToken = token;
    },

    async fetchGoogleEventsForCurrentMonth() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        await this._fetchEvents(startOfMonth, endOfMonth);
    },

    async _fetchEvents(timeMin, timeMax) {
        if (!this.accessToken) {
            console.warn('Authentication required to fetch events.');
            return;
        }
        
        this.loading = true;
        this.error = null;
        
        const calendarId = 'primary';
        const URL = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;

        try {
            const response = await axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                params: {
                    timeMin: timeMin.toISOString(), 
                    timeMax: timeMax.toISOString(), 
                    singleEvents: true,
                    orderBy: 'startTime'
                }
            });
            
            this.events = response.data.items.map(item => {
                const date = new Date(item.start.dateTime || item.start.date);
                const summary = item.summary || 'No Title';
                
                let type = 'Low';
                if (summary.toLowerCase().includes('deadline') || summary.toLowerCase().includes('urgent')) {
                    type = 'High';
                }

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
            this.error = 'Failed to load events. Token might be expired or permissions denied.';
            this.isAuthenticated = false;
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