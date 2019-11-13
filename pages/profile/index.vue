<template>
  <b-container class="footer-fix">
    <b-row>
      <b-col cols="12" md="4" lg="3" class="d-none d-md-block">
        <h6 class="mb-3">Личный кабинет</h6>
        <div class="left-navigation mb-4">
          <ul>
            <li><nuxt-link :to="{ name: 'profile-index' }" exact >Настроки профиля</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'profile-index-change-password' }" exact >Сменить пароль</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'profile-index-messenger' }" exact >Мессенджер</nuxt-link></li>
          </ul>
        </div>

        <div v-if="$auth.user.role === null || $auth.user.role === 'guide'">
          <h6 class="mb-3">Экскурсии</h6>
          <div class="left-navigation mb-4">
            <ul>
              <li><a href="" @click.prevent="handleCreateTour" >Новый тур</a></li>
              <li><nuxt-link :to="{ name: 'profile-index-tours' }" exact >Список туров</nuxt-link></li>
            </ul>
          </div>
        </div>
      </b-col>

      <b-col cols="12" md="8" lg="9">
        <nuxt-child />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
    scrollToTop: true,
    methods: {
        handleCreateTour() {
            this.$axios.get('/profile/tours/create').then( ({ data }) => {
                this.$router.push({ name: 'profile-index-tours-id', params: { id: data.data } })
            })
        }
    },
}
</script>

<style scoped lang="sass">
.left-navigation
  & ul
    margin: 0
    padding: 0
    & li
      list-style: none
      & a
        font-size: 0.875rem
        padding: 0.5rem 1rem
        display: block
        text-decoration: none
        transition: all ease 0.2s
        color: #405089
        &:hover, &.active
          background-color: #f4f4f4

</style>
