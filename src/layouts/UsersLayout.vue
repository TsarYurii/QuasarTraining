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

    <q-page-container class="q-ma-lg">
      <div class="fit row justify-between">
        <div class="col-6">
          <div class="fit row">
            <q-input
            :placeholder="$t('search')"
            class="col-6"
            type="text"
            v-model="search"
            @update:model-value="getUsersFilter(search)"
            />
            <q-btn 
            color="primary"
            no-caps
            type="button"
            class="col-3"
            @click="changeSearchBy"
            :label="searchBy === 'by Name' ? $t('searchByName') : $t('searchByEmail')"
            >
            </q-btn>
          </div>
        </div>
        <q-btn color="primary" no-caps @click="showModal">{{$t('newUserBtn')}}</q-btn>
          <q-btn-group>
            <q-btn :class="{'selected' : $i18n.locale === 'ru'}" @click="$i18n.locale = 'ru'">ru</q-btn>
            <q-btn :class="{'selected' : $i18n.locale === 'en-US'}" @click="$i18n.locale = 'en-US'">en</q-btn>
          </q-btn-group>  
      </div>
      
        <q-list class="user-list">
          <q-item class="fit row justify-center">
            <q-item-section avatar class="col-1 content-center">
              {{$t('userListIcon')}}
            </q-item-section>
            <q-item-section  class="col-2 content-center"><q-btn unelevated no-caps @click="onSortByName">{{ $t('userListName') }}</q-btn></q-item-section>
            <q-item-section class="col-2 content-center">{{ $t('userListEmail') }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ $t('userListStreet') }}</q-item-section>
            <q-item-section class="col-2 content-center"><q-btn unelevated no-caps @click="onSortByCity">{{ $t('userListCity') }}</q-btn></q-item-section>
            <q-item-section class="col-2 content-center">{{ $t('userListZip') }}</q-item-section>
  </q-item>
          <transition-group
          appear
            mode="out-in"
            name="user"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
          <user v-for="fake in getPaginatedUsers" :key="fake.id" :fake="fake"/>
          </transition-group>
        </q-list>
        <pagination/>
    </q-page-container>
    <new-user/>
  </q-layout>
</template>

<script>
// import db from "../boot/firebase"
// import { collection, query, onSnapshot } from "firebase/firestore";


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
      search: "",
      sortName: "a-z",
      sortCity: "a-z",
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
  // async mounted() {
  //   this.fetchFakeData()
  // },
  mounted(){
    this.getFakeData()
  },
  methods: {
    ...mapActions([
      "fetchFakeData",
      "getFakeData",
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
.user-move{
  transition: transform 0.5s;
}
.selected{
  background-color: rgb(45,118,210);
  color: white;
}
</style>