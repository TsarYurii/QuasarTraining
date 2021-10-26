<template>
<div @dblclick="onEditUser(), getUserIndex(fake)">
  <q-item class="fit row justify-center">
            <q-item-section avatar class="col-1 content-center" @click="changeIcon(), getUserIndex(fake)">
              <q-avatar basic size="60px">
                <img :src="fake.icon">
                
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.name }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.email }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.street }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.city }}</q-item-section>
            <q-item-section class="col-2 content-center">{{ fake.zip }}</q-item-section>
  </q-item>
  <q-dialog
      v-model="showModal"
    >
    <q-card>
        <q-card-section>
          <div class="text-h6">Edit User</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
         <Form @onSubmitForm="onSubmitForm" :fake="fake"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="close"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="showModalIcon"
    >
      <q-uploader
        url="http://localhost:4444/upload"
        style="max-width: 300px"
      ></q-uploader>
    </q-dialog>
  </div>
</template>

<script>
import Form from "../components/Form.vue"
import { mapActions, mapGetters } from "vuex";
export default {
    name: "User",
    components:{
      Form
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
  computed: {
    ...mapGetters(["getUserIndex"])
  }
}
</script>

<style>

</style>