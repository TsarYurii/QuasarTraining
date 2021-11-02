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
      <!-- <div class="fit row justify-between">
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
      </div> -->

        <!-- <q-list class="user-list">
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
          <User2 v-for="fake in getPaginatedUsers" :key="fake.id" :fake="fake"/>
          </transition-group>
        </q-list> -->

        <q-table title="Водители"
          :rows="allFilteredData"
          row-key="name"
          :columns="columns"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{props.row.id}}
              </q-td>
              <q-td key="name" :props="props">
                {{props.row.name}}
              </q-td>
              <q-td key="gender" :props="props">
                {{props.row.gender}}
              </q-td>
              <q-td key="langId" :props="props">
                {{props.row.langId}}
              </q-td>
              <q-td key="birthDate" :props="props">
                {{props.row.birthDate}}
              </q-td>
              <q-td key="emails" :props="props">
                <div v-for="email in props.row.emails" :key="email.email" :email="email">
                  {{email.email}}
                </div>
              </q-td>
              <q-td key="phone" :props="props">
                {{props.row.phone}}
              </q-td>
              <q-td key="city" :props="props">
                {{props.row.city}}
              </q-td>
              <q-td key="car" :props="props">
                <q-expansion-item
                  expand-separator
                  :label="'ID авто: ' + props.row.car.carId"
                >
                  <div>Марка авто: {{props.row.car.carBrand}}</div>
                  <div>Класс авто: {{props.row.car.carClass}}</div>
                  <div>Цвет: {{props.row.car.carColor}}</div>
                  <div>Модель: {{props.row.car.carModel}}</div>
                  <div>Комплектация: {{props.row.car.carOptions}}</div>
                  <div>Дата производства: {{props.row.car.factoryDate}}</div>
                  <div>Срок действия страховки: {{props.row.car.insuranceExpireDate}}</div>
                  <div>Номер страховки: {{props.row.car.insuranceNumber}}</div>
                  <div>Регистрационный номер: {{props.row.car.regNumber}}</div>
                  <div>Номер техпаспорта: {{props.row.car.techPassportNumber}}</div>
                </q-expansion-item>
              </q-td>
              <q-td key="carsAmount" :props="props">
                {{props.row.carsAmount}}
              </q-td>
              <q-td key="documents" :props="props">
                <q-expansion-item
                 expand-separator
                    label="Документы">
                  <q-expansion-item
                  v-for="docs in props.row.documents" :key="docs.id" :docs="docs" 
                    expand-separator
                    :label="'Тип документа: ' + docs.driverDocTypeName"
                  >
                  <div>ID: {{docs.id}}</div>
                  <div>Статус принятия: {{docs.acceptanceStatus}}</div>
                  <div>Дата создания: {{docs.createdAt}}</div>
                  <div>Коментарий: {{docs.comment}}</div>
                  </q-expansion-item>
                </q-expansion-item>
              </q-td>
              <q-td key="driverStatusName" :props="props">
                {{props.row.driverStatusName}}
              </q-td>
              <q-td key="drivingExperience" :props="props">
                {{props.row.drivingExperience}}
              </q-td>
              <q-td key="hireDate" :props="props">
                {{props.row.hireDate}}
              </q-td>
              <q-td key="currentRating" :props="props">
                {{props.row.currentRating}}
              </q-td>
              <q-td key="isBlocked" :props="props">
                {{props.row.isBlocked}}
              </q-td>
            </q-tr>  
          </template>
        </q-table>
        <!-- <pagination/> -->
    </q-page-container>
    <!-- <new-user/> -->
  </q-layout>
</template>

<script>
// import db from "../boot/firebase"
// import { collection, query, onSnapshot } from "firebase/firestore";


// import User2 from "../components/User2.vue"
// import NewUser from "../components/NewUser.vue"
// import Pagination from "../components/Pagination.vue"
import { mapGetters, mapActions } from "vuex";
import {ref} from "vue"



export default {
  components: {
    // User2,
    // Pagination,
    // NewUser
  },
  data(){
    return{
      search: "",
      sortName: "a-z",
      sortCity: "a-z",
      columns : [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name', align: 'center', label: 'name', field: 'name', sortable: true },
  { name: 'gender', label: 'gender', field: 'gender'},
  { name: 'langId', label: 'langId', field: 'langId' },
  { name: 'birthDate', label: 'birthDate', field: 'birthDate' },
  { name: 'emails', label: 'emails', field: 'emails' },
  { name: 'phone', label: 'phone', field: 'phone'},
  { name: 'city', label: 'city', field: 'city', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'car', align: 'center', label: 'car', field: 'car'},
  { name: 'carsAmount', label: 'carsAmount', field: 'carsAmount'},
  { name: 'documents', label: 'documents', field: 'documents' },
  { name: 'driverStatusName', label: 'driverStatusName', field: 'driverStatusName' },
  { name: 'drivingExperience', label: 'drivingExperience', field: 'drivingExperience' },
  { name: 'hireDate', label: 'hireDate', field: 'hireDate'},
  { name: 'currentRating', label: 'currentRating', field: 'currentRating'},
  { name: 'isBlocked', label: 'isBlocked', field: 'isBlocked'}
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
  // async mounted() {
  //   this.fetchFakeData()
  // },
  async mounted(){
    // this.getFakeData()
    this.fetchFakeData()
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
.q-td{
  background-color: #08c;
}
</style>