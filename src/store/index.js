import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import axios from 'src/boot/axios'
import { api } from 'src/boot/axios'
import db from "../boot/firebase"
import { collection, query, onSnapshot, addDoc, updateDoc, doc, setDoc} from "firebase/firestore"
import state from './module-example/state'

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
          console.log(state.fakeIndex)
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
        //   console.log(state.fakeIndex)
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
      getSortByName(state) {
          state.filteredData.sort((a, b) => a.name.localeCompare(b.name))
      },
      getSortByNameReverse(state) {
          state.filteredData.sort((a, b) => a.name.localeCompare(b.name)).reverse()
      },
      getSortByCity(state) {
          state.filteredData.sort((a, b) => a.city.localeCompare(b.city))
      },
      getSortByCityReverse(state) {
          state.filteredData.sort((a, b) => a.city.localeCompare(b.city)).reverse()
      },
      getUsersFilter: (state) => (search) => {
          state.pageNumber = 1
          console.log(search)
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
          console.log(state.filteredData.indexOf(fake))
          return state.fakeIndex = state.filteredData.indexOf(fake)
          
      }
  },


  actions: {
      async fetchFakeData(context) {
          api.get("https://157.90.168.151:8080/api/v1/drivers/all").then((response) => {
              const data = response.data.data
              console.log(data)                
              context.commit("updateFakeData", data)
          })
      },
      getFakeData(context){
        const q = query(collection(db, 'users'));
        // let users = []
        const unsubscribe = onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach(change => {
          let userChange = change.doc.data()
          userChange.id = change.doc.id
          if (change.type === 'added') {
              console.log('New user: ', userChange)
            // users.unshift(userChange)
            context.commit("updateFakeDataFB", userChange)
            
          }
          if (change.type === 'modified') {
              console.log('Modified user: ', userChange)
              context.commit("mutEditUser", userChange)
          }
          if (change.type === 'removed') {
              console.log('Removed user: ', userChange)
          }
        });
      })
      },
      showModal(context) {
          context.commit("changeShowModal")
      },
       addNewUser(context, newUser) {
        //   context.commit("pushNewUser", newUser)
          context.commit("changeShowModal")

          const docRef = addDoc(collection(db, "users"), newUser);
        // setDoc(doc(db, "users", newUser.id), newUser)
          console.log("Document written with ID: ", docRef.id);
      },
      changeSearchBy(context) {
          context.commit("updateSearchBy")
      },
      onClickPage(context, currentPage) {
          context.commit("mutPageNumber", currentPage)
      },
      letEditUser(context, editedUser) {
          // console.log("Action fake: " + fake)
        //   context.commit("mutEditUser", editedUser)
          const washingtonRef = doc(db, "users", editedUser.id);

            // Set the "capital" field of the city 'DC'
             updateDoc(washingtonRef, {
                name: editedUser.name,
                email: editedUser.email,
                street: editedUser.street,
                city: editedUser.city ,
                zip: editedUser.zip,
            });
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
    strict: false
  })
//   process.env.DEBUGGING
  return Store
})
