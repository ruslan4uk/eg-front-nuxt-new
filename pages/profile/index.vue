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
            <li><nuxt-link :to="{ name: 'profile-index-favorite' }" exact >
              Избранное <span v-if="$auth.user && $auth.user.favorite_tour">({{ $auth.user.favorite_tour.length }})</span>
            </nuxt-link></li>
          </ul>
        </div>

        <!-- Guide tour list and new tour -->
        <div v-if="$auth.user.role === null || $auth.user.role === 'guide'">
          <h6 class="mb-3">Экскурсии</h6>
          <div class="left-navigation mb-4">
            <ul>
              <li><a href="" @click.prevent="handleCreateTour" :class="!handleAllowProfile ? 'disabled' : ''">Новый тур</a></li>
              <li><nuxt-link :to="{ name: 'profile-index-tours' }" exact :class="!handleAllowProfile ? 'disabled' : ''">Список туров</nuxt-link></li>
            </ul>
          </div>
        </div>

      </b-col>

      <b-col cols="12" md="8" lg="9">
        <el-alert
          v-if="!handleAllowProfile"
          class="profile-alert mb-4"
          title="Внимание! Необходимо заполнить профиль"
          description="Для создания и редактирования экскурсий необходимо заполнить профиль"
          type="error"
          effect="dark"
          show-icon
          :closable="false">
        </el-alert>

        <nuxt-child />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
    head() {
        return {
            title: 'Настройка профиля - ExcursGuide'
        }
    },

    scrollToTop: true,

    middleware: ['auth'],

    methods: {
        handleCreateTour() {
            this.$axios.get('/profile/tours/create').then( ({ data }) => {
                this.$router.push({ name: 'profile-index-tours-id', params: { id: data.data } })
            })
        },
    },
    computed: {
        handleAllowProfile() {
          return (this.$auth.user.role === 'guide' && this.$auth.user.active > 0)
        }
    }
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
