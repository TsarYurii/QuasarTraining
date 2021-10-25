<template>
  <q-pagination
  v-if="allFilteredData.length > 10"
      v-model="currentPage"
      :max="getPages"
      @click="onClickPage(currentPage)"
    ></q-pagination>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {ref} from "vue"
export default {
  name: "Pagination",
  computed: {
    ...mapGetters(["allFilteredData", "getPages"])
  },
  methods: { ...mapActions(["onClickPage"]) },
  setup(){
    return{
      currentPage: ref(1)
    }
  }
};
</script>

<style>
    
</style>