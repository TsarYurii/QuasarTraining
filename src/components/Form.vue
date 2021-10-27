<template>
    <q-form
      @submit="onSubmitForm"
      @reset="onReset"
    >
      <q-input
        filled
        v-model="name"
        :label="$t('userListName')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      ></q-input>
      <q-input
        filled
        v-model="email"
        :label="$t('userListEmail')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      ></q-input>
      <q-input
        filled
        v-model="street"
        :label="$t('userListStreet')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      ></q-input>
      <q-input
        filled
        v-model="city"
        :label="$t('userListCity')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      ></q-input>
      <q-input
        filled
        v-model="zip"
        :label="$t('userListZip')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      ></q-input>
      <div>
        <q-btn :label="$t('btnSbm')" type="submit" color="primary"></q-btn>
        <q-btn :label="$t('btnReset')" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
      </div>
    </q-form>


</template>

<script>
import {ref} from "vue"
export default {
    name: "Form",
    props: {
    fake: {
      type: Object,
      default() {
        return {};
      },
    },
  },
    data(){
      return {
        name: this.fake.name ? this.fake.name : "",
        email: this.fake.email ? this.fake.email : "",
        street: this.fake.street ? this.fake.street : "",
        city: this.fake.city ? this.fake.city : "",
        zip: this.fake.zip ? this.fake.zip : "",
      }
    },
    methods:{
      onSubmitForm(){
        this.$emit("onSubmitForm",
            {
              name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
              email: this.email,
              street: this.street.charAt(0).toUpperCase() + this.street.slice(1),
              city: this.city.charAt(0).toUpperCase() + this.city.slice(1),
              zip: this.zip,
            }
          )
      },
      onReset () {
        this.name = null
        this.email = null
        this.street = null
        this.city = null
        this.zip = null
        this.accept = false
      }
    },
    setup () {
    const accept = ref(false)

    return {
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          }) 
        }
      },
    }
  }

}
</script>

<style>

</style>