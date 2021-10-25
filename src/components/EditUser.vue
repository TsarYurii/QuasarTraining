<template>
  <q-dialog
    >
    <q-card>
        <q-card-section>
          <div class="text-h6">New User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <Form />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary"></q-btn>
        </q-card-actions>
      </q-card>
    
    </q-dialog>
</template>

<script>
export default {
    name: "EditUser",

}
</script>

<style>

</style>