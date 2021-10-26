<template>
  <q-dialog
      v-model="changedShowModal"
    >
    <q-card>
        <q-card-section>
          <div class="text-h6">New User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <Form @onSubmitForm="onSubmitForm"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="showModal"></q-btn>
        </q-card-actions>
      </q-card>
    
    </q-dialog>
</template>

<script>
import Form from "../components/Form.vue"
import { mapGetters, mapActions } from "vuex";
export default {
    name: "NewUser",
    components: {
    Form
  },
  computed: {
      ...mapGetters([
          "changedShowModal",
          "allFilteredData"
      ])
  },
  methods: {
      ...mapActions([
          "showModal",
          "addNewUser"
      ]),
      onSubmitForm(data){
          const newUser = {
            name: data.name,
            email: data.email,
            street: data.street,
            city: data.city,
            zip: data.zip,
            icon: "https://cdn.quasar.dev/img/boy-avatar.png",
          }
          this.addNewUser(newUser)
      }
  }
}
</script>

<style>

</style>