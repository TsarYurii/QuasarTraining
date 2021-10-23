<template>
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
</template>

<script>
export default {
    name: "User",
    props: {
    fake: {
      type: Object,
      default() {
        return {};
      },
    },
  },
}
</script>

<style>

</style>