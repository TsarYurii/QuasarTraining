<template>
<div @dblclick="onEditUser(), getUserIndex(fake)">
  <q-item class="fit row justify-center">
            <q-item-section avatar class="col-1 content-center">
              <q-avatar basic size="75px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.name }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.email }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.street }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.city }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.zip }}</q-item-section>
  </q-item>
  <edit-user v-if="showModal === true" @onSubmitForm="onSubmitForm" :fake="fake"/>
  </div>
</template>

<script>
import EditUser from "../components/EditUser.vue"
import { mapActions, mapGetters } from "vuex";
export default {
    name: "User",
    components:{
      EditUser
    },
    data(){
      return {
        showModal: false,
        showModalIcon: false,
        userIconSrc: "",
        dropzoneFile: "",
      }
    },
    props: {
      fake: {
        type: Object,
        default() {
          return {};
        },
      },
  },
  methods: {
    ...mapActions(["letEditUser", "letEditIcon"]),
    onEditUser() {
      this.showModal = !this.showModal;
    },
    onSubmitForm(data) {
      const editedUser = {
        name: data.name !== "" ? data.name : this.fake.name,
        email: data.email !== "" ? data.email : this.fake.email,
        street: data.street !== "" ? data.street : this.fake.street,
        city: data.city !== "" ? data.city : this.fake.city,
        zip: data.zip !== "" ? data.zip : this.fake.zip,
        id: this.fake.id,
        icon: this.fake.icon,
      };

      this.letEditUser(editedUser);
      this.showModal = !this.showModal;
    },

  },
  computed: {
    ...mapGetters(["getUserIndex"])
  }
}
</script>

<style>

</style>