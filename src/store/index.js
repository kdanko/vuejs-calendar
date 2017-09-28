import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store ({
    state: {
        currentYear: 2017,
        currentMonth: 9,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [
              { description: 'Random event 1', date: moment('2017-09-11', 'YYYY-MM-DD') },
              { description: 'Random event 2', date: moment('2017-09-13', 'YYYY-MM-DD') },
              { description: 'Random event 3', date: moment() }
        ],
        eventFormDate: moment()
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            let event = {
                description: payload,
                date: state.eventFormDate
            };
            state.events.push(event);
            Axios.post('/add_event', event);
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    }
});