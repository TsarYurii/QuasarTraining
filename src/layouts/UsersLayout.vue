<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Optilogo.png/800px-Optilogo.png">
          </q-avatar>
          Коллс
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="fit row justify-between">
        <div class="col-6">
          <div class="fit row">
            <q-input class="col-9"/>
            <q-btn class="col-3">
              по Имени
            </q-btn>
          </div>
        </div>
        <q-btn @click="showModal">Новый пользователь</q-btn>
          <q-btn-group>
            <q-btn>ru</q-btn>
            <q-btn>en</q-btn>
            <q-btn>pl</q-btn>
          </q-btn-group>  
      </div>
      
        <q-list class="user-list">
          <user v-for="fake in getPaginatedUsers" :key="fake.id" :fake="fake"/>
        </q-list>
        <pagination/>



        <!-- <q-table
          :rows="allFilteredData"
          row-key="id"
        >
        </q-table> -->

        
    </q-page-container>

    <!-- <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <new-user/>

    

  </q-layout>
</template>

<script>
import User from "../components/User.vue"
import NewUser from "../components/NewUser.vue"
import Pagination from "../components/Pagination.vue"
import { mapGetters, mapActions } from "vuex";
import {ref} from "vue"



export default {
  components: {
    User,
    Pagination,
    NewUser
  },
  data(){
    return{
      columns: [

      ]
    }
  },
  computed: {
    ...mapGetters([
      "changedShowModal",
      "allFilteredData",
      "searchBy",
      "getPaginatedUsers",
      "getUsersFilter",
      "getSortByName",
      "getSortByNameReverse",
      "getSortByCity",
      "getSortByCityReverse",
      "tableData"
    ]),
  },
  async mounted() {
    this.fetchFakeData()
  },
  methods: {
    ...mapActions([
      "fetchFakeData",
      "showModal",
      "changeSearchBy",
      "sortByName",
      "sortByCity",
      "letMutatePagUsers"
    ]),
    onSortByName() {
      if (this.sortName === "a-z") {
        this.sortName = "z-a";
        return this.getSortByName;
      } else if (this.sortName === "z-a") {
        this.sortName = "a-z";
        return this.getSortByNameReverse;
      }
    },
    onSortByCity() {
      if (this.sortCity === "a-z") {
        this.sortCity = "z-a";
        return this.getSortByCity;
      } else if (this.sortCity === "z-a") {
        this.sortCity = "a-z";
        return this.getSortByCityReverse;
      }
    },
  },
  setup(){
    return{
      showNewUser : ref(false)
    }
  }
  
}
</script>

<style>
/* .user-list{
  height: 70%;
} */
</style>