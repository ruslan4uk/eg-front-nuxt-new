<template>
  <b-navbar toggleable="lg" type="dark" class="py-2 mb-5 bg--blue" fixed="top">
    <b-container>
      <b-navbar-brand href="" :to="{ name: 'index' }" class="logo">EG</b-navbar-brand>

        <b-navbar-nav class="ml-4">
          <b-nav-item href="#" class="navigation__link d-none d-md-block">О нас</b-nav-item>
          <b-nav-item href="#" class="navigation__link d-none d-md-block">Обратная связь</b-nav-item>
        </b-navbar-nav>

        <!-- is not Auth -->
        <b-navbar-nav class="ml-auto" v-if="!$auth.loggedIn">
          <nuxt-link :to="{ name: 'auth-login' }" class="mr-3"><el-button round>Вход</el-button></nuxt-link>
          <nuxt-link :to="{ name: 'auth-register' }" class=""><el-button round>Регистрация</el-button></nuxt-link>
        </b-navbar-nav>

        <!-- is Auth -->
        <b-navbar-nav class="ml-auto" v-if="$auth.loggedIn">

          <el-dropdown trigger="click" class="navigation-user">
              <span class="el-dropdown-link d-flex align-items-center">
                <span class="mr-2 navigation-user__name">{{ $auth.user.name }}</span>
                <el-avatar :src="$auth.user.avatar" shape="circle" :size="48">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push({ name: 'profile-index'})">Настройка профиля</el-dropdown-item>

              <el-dropdown-item divided @click.native="$router.push({ name: 'profile-index-change-password'})">Сменить пароль</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push({ name: 'profile-index-messenger'})">Мессенджер</el-dropdown-item>

              <el-dropdown-item divided @click.native="handleCreateTour" v-if="$auth.user.role === null || $auth.user.role === 'guide'">Новая экскурсия</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push({ name: 'profile-index-tours'})" v-if="$auth.user.role === null || $auth.user.role === 'guide'">Список экскурсий</el-dropdown-item>

              <el-dropdown-item divided @click.native="logout">Выход</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  methods: {
      logout() {
          this.$auth.logout();
      },

      handleCreateTour() {
          this.$axios.get('/profile/tours/create').then( ({ data }) => {
              this.$router.push({ name: 'profile-index-tours-id', params: { id: data.data } })
          })
      }
  }
}
</script>

<style scoped lang="sass">
.navbar-dark .navbar-nav .nav-link
  color: #ffffff
  font-size: 1rem
  font-weight: 300
  &:hover
    opacity: 0.75

.navigation-user
  cursor: pointer
  &__name
    color: #ffffff
</style>
