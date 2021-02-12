<template>
<div>
<base-dialog :show="!!error" title="an error" @close="handleError">
  <p>{{error}}</p>
</base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"> </coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches(true)" mode="outline"> Refresh </base-button>
        <base-button v-if="!isCoach && !isLoading" link to="register">
          Register as Coach
        </base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h2 v-else>No coaches found.</h2>
    </base-card>
  </section>
</div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    
    return {
      isLoading: true,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoadin && this.$store.getters["coaches/hasCoaches"];
    },
  },

  created() {
    this.loadCoaches();
  },

  methods: {
    setFilters(updautedFilters) {
      this.activeFilters = updautedFilters;
    },

   async loadCoaches(refresh = false) {
     
     this.isLoading = true;
     
     try {
       await this.$store.dispatch('coaches/loadCoaches', {forceRefresh : refresh });
     } catch (error) {
       this.error = error.message || "Something went wrong!";
       
     }
     this.isLoading = false;
    },

    handleError() {
      this.error = null;
    }


  },


};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
