<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev"
        >Prev Page</router-link
      >&nbsp;|
    </template>
    <template v-if="event.totalEvents > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next"
        >Next Page</router-link
      >
    </template>
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page,
    });
  },
  computed: {
    page() {
      return Number(this.$route.query.page) || 1;
    },
    ...mapState(['event', 'user']),
  },
};
</script>
