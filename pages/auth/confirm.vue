<template>
  <section class="auth">
    <b-container>
      <b-row class="footer-fix align-items-center">
        <b-col cols="12" md="8" lg="6" class="my-4">
          <img src="~assets/images/confirm.png" alt="">
        </b-col>

        <b-col cols="12" lg="6" class="mb-5" v-if="$route.query.type === 'register'">
          <div class="auth__title mb-2">Осталось еще чуть-чуть</div>
          <div class="auth__subtitle mb-1">Чтобы завершить регистрацию подтвердите свой эл.адрес</div>
          <div class="auth__subtitle mb-3">На эл.адрес отправленно письмо с подтверждением</div>
        </b-col>

        <b-col cols="12" lg="6" class="mb-5" v-else-if="confirm">
          <div class="auth__title mb-2">Ура!</div>
          <div class="auth__subtitle mb-3">Эл. адрес успешно подтвержден, теперь можете войти в личный кабинет</div>
          <el-button type="primary" round @click="$router.push({ name: 'auth-login' })">Вход в личный кабинет</el-button>
        </b-col>

        <b-col cols="12" lg="6" class="mb-5" v-else>
          <div class="auth__title mb-2">Ошибка!</div>
          <div class="auth__subtitle mb-3">Что то пошло не так, либо вы случайно попали на эту страницу</div>
        </b-col>

      </b-row>
    </b-container>
  </section>
</template>

<script>

export default {
    middleware: ['confirmRedirect'],

    asyncData({ store, query }) {
        return store.$axios.post('/auth/confirm', { email: query.email, hash: query.hash }).then( () => {
            return { confirm: true }
        }).catch( () => {
            return { confirm: false }
        })
    }
}
</script>

<style scoped lang="sass">

</style>
