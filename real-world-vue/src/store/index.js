import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import event from '@/store/modules/event';
import notification from '@/store/modules/notification';

Vue.use(Vuex);

console.log(user);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification,
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
});
