import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import axios from 'src/boot/axios'
import { api } from 'src/boot/axios'
import db from "../boot/firebase"
import { collection, query, onSnapshot } from "firebase/firestore"

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    state: {
      fakeData: [],
      filteredData: [],
      isShowModal: false,
      searchBy: "by Name",
      usersPerPage: 10,
    //   paginatedUsers: [],
      pageNumber: 1,
      fakeIndex: ''
  },
  mutations: {
      updateFakeData(state, data) {
          state.fakeData = data;
          state.filteredData = state.fakeData
      },
      updateFakeDataFB(state, userChange){
        state.fakeData.unshift(userChange)
        state.filteredData = state.fakeData
      },
      changeShowModal(state) {
          state.isShowModal = !state.isShowModal
      },
      pushNewUser(state, newUser) {
          state.fakeData.unshift(newUser)
          state.filteredData = state.fakeData
      },
      updateSearchBy(state) {
          if (state.searchBy === "by Name") {
              state.searchBy = "by Email"
          }
          else if (state.searchBy === "by Email") {
              state.searchBy = "by Name"
          }
      },
      mutPageNumber(state, currentPage) {
          state.pageNumber = currentPage
      },
      mutEditUser(state, editedUser) {
          state.filteredData.splice(state.fakeIndex, 1, editedUser)
          state.fakeIndex = null
      },
      mutEditUserIcon(state, editedUserIcon) {
          state.filteredData.splice(state.fakeIndex, 1, editedUserIcon)
          state.fakeIndex = null
      },
    //   mutPaginatedUsers(state){
    //         let from = (state.pageNumber - 1) * state.usersPerPage
    //         let to = from + state.usersPerPage
    //         state.paginatedUsers = state.filteredData.slice(from, to)
    //   }
  },
  getters: {
      allFilteredData(state) {
          return state.filteredData
      },
      tableData(state){
        return state.filteredData[1]
      },
      changedShowModal(state) {
          return state.isShowModal
      },
      searchBy(state) {
          return state.searchBy
      },
      getPages(state) {
          return Math.ceil(state.filteredData.length / state.usersPerPage)
      },
      getPaginatedUsers(state) {
        let from = (state.pageNumber - 1) * state.usersPerPage
        let to = from + state.usersPerPage
        return state.filteredData.slice(from, to)
      },
      getPageNumber(state) {
          return state.pageNumber
      },
    //   getSortByName(state) {
    //       state.filteredData.sort((a, b) => a.name.localeCompare(b.name))
    //   },
    //   getSortByNameReverse(state) {
    //       state.filteredData.sort((a, b) => a.name.localeCompare(b.name)).reverse()
    //   },
    //   getSortByCity(state) {
    //       state.filteredData.sort((a, b) => a.city.localeCompare(b.city))
    //   },
    //   getSortByCityReverse(state) {
    //       state.filteredData.sort((a, b) => a.city.localeCompare(b.city)).reverse()
    //   },
      getUsersFilter: (state) => (search) => {
          state.pageNumber = 1
          if (state.searchBy === "by Name") {
              state.filteredData = state.fakeData.filter(data => {
                  return data.name.toLowerCase().includes(search.toLowerCase())
              })
          } else if (state.searchBy === "by Email") {
              state.filteredData = state.fakeData.filter(data => {
                  return data.email.toLowerCase().includes(search.toLowerCase())
              })
          }
      },
      getUserIndex: (state) => (fake) => {
          return state.filteredData.indexOf(fake)
          
      }
  },


  actions: {
      async fetchFakeData(context) {
          api.get("https://my-json-server.typicode.com/TsarYurii/JsonServer/db").then((response) => {
              const data = response.data.users                
              context.commit("updateFakeData", data)
          })
      },
      getFakeData(context){
        const q = query(collection(db, 'users'));
        let users = []
        const unsubscribe = onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach(change => {
          let userChange = change.doc.data()
          if (change.type === 'added') {
              console.log('New user: ', userChange)
            users.unshift(userChange)
            context.commit("updateFakeDataFB", userChange)
            
          }
          if (change.type === 'modified') {
              console.log('Modified user: ', userChange)
          }
          if (change.type === 'removed') {
              console.log('Removed user: ', userChange)
          }
          console.log(users)
        });
      })
      },
      showModal(context) {
          context.commit("changeShowModal")
      },
      addNewUser(context, newUser) {
          context.commit("pushNewUser", newUser)
          context.commit("changeShowModal")
      },
      changeSearchBy(context) {
          context.commit("updateSearchBy")
      },
      onClickPage(context, currentPage) {
          context.commit("mutPageNumber", currentPage)
      },
      letEditUser(context, editedUser) {
          // console.log("Action fake: " + fake)
          context.commit("mutEditUser", editedUser)
      },
      letEditIcon(context, editedUserIcon) {
          context.commit("mutEditUserIcon", editedUserIcon)
      },
      letMutatePagUsers(context){
        context.commit("mutPaginatedUsers")
      }
  },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
