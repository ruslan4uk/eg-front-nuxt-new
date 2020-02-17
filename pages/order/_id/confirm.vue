<template>
  <section class="auth">
    <b-container>
      <b-row class="footer-fix align-items-center">
        <b-col cols="12" md="8" lg="6" class="my-4">
          <img src="~assets/images/confirm.png" alt="">
        </b-col>

        <b-col cols="12" lg="6" class="mb-5" v-if="!$route.query.hash">
          <div class="auth__title mb-2">Заказ в обработке!</div>
          <div class="auth__subtitle mb-3">Письмо с подтверждением успешно отправлено гиду!</div>
        </b-col>

        <b-col cols="12" lg="6" class="mb-5" v-else>
          <div class="auth__title mb-2">Заказ подтвержден!</div>
          <div class="auth__subtitle mb-3">Письмо с подтверждением успешно отправлено туристу!</div>
        </b-col>

      </b-row>
    </b-container>
  </section>
</template>

<script>

  export default {
    asyncData({ store, query, route, error }) {
      if(!query.hash) return;
      return store.$axios.post(`/front/orders/${route.params.id}/confirm`, { hash: query.hash }).then( () => {
        return { confirm: true }
      }).catch(e => {
        error({ statusCode: 404 });
      });
    }
  }
</script>

<style scoped lang="sass">

</style>
