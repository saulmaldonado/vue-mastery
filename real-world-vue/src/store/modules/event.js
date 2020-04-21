/* eslint-disable no-shadow */
import EventService from '@/services/EventService';

const namespaced = true;

const state = {
  events: [],
  totalEvents: null,
  event: {},
};

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, { events, totalEvents }) {
    state.totalEvents = totalEvents;
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'You event has been created',
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: `There was a problem creating your event: ${err.message}`,
        };
        dispatch('notification/add', notification, { root: true });
        throw err;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        const totalEvents = response.headers['x-total-count'];
        commit('SET_EVENTS', { totalEvents, events: response.data });
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${err.message}`,
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id);

    if (event) {
      commit('SET_EVENT', event);
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data);
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching the event: ${err.message}`,
          };
          dispatch('notification/add', notification, { root: true });
        });
    }
  },
};

const getters = {
  catLength: state => {
    return state.categories.length;
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
