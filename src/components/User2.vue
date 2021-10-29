<template>
<div @dblclick="onEditUser(), getUserIndex(fake)" class="user">
  <q-item class="fit row justify-center">
            <q-item-section class="col-2 content-center">{{ fake.name }}</q-item-section>
            <q-item-section class="col-2 content-center">
                <q-item-section class="row" v-for="email in fake.emails" :email="email" :key="email.email">{{email.email}}</q-item-section>
            </q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.car.carId }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.city }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.zip }}</q-item-section>
  </q-item>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "User2",
    components:{
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
    changeIcon() {
      this.showModalIcon = !this.showModalIcon;
      this.dropzoneFile = "";
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
    close() {
      this.showModal = !this.showModal;
    },

  },
}
</script>

<style>
.user:hover{
  background-color: rgb(45,118,210);
  cursor: pointer;
}
</style>