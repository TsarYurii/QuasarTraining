<template>
  <q-pagination
  v-if="allFilteredData.length > 10"
    
      :max="getPages"
    ></q-pagination>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pagination",
  computed: mapGetters(["allFilteredData", "getPages", "getPageNumber"]),
  methods: { ...mapActions(["onClickPage", "letMutatePagUsers"]) },
  
};
</script>

<style>
    
</style>