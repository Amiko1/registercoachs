<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name=""
        id="frontend"
        @change="setFilter"
        checked
      />
      <label for="frontend"> FRONTEND</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" name="" id="backend" @change="setFilter" checked />
      <label for="backend"> backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" name="" id="career" @change="setFilter" checked />
      <label for="career"> career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        fontend: true,
        backend: true,
        career: true,
      },
    };
  },

  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      console.log(inputId);
      const isActive = event.target.checked;
      console.log(isActive);
      const updateFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updateFilters;
      console.log(this.filters);
      this.$emit("change-filter", updateFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
