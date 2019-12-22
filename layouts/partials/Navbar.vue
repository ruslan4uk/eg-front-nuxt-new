<template>
  <b-navbar toggleable="lg" type="dark" :class="'py-2 mb-5 navigation' + (isBlue ? ' bg--blue' : '')" fixed="top">
    <b-container>
      <b-navbar-brand href="" :to="{ name: 'index' }" class="logo">EG</b-navbar-brand>

      <b-navbar-nav class="ml-4">
        <b-nav-item href="#" class="navigation__link d-none d-md-block">О нас</b-nav-item>
        <b-nav-item href="#" class="navigation__link d-none d-md-block">Обратная связь</b-nav-item>
      </b-navbar-nav>

      <!-- is not Auth -->
      <b-navbar-nav class="ml-auto d-none d-md-block" v-if="!$auth.loggedIn">
        <nuxt-link :to="{ name: 'auth-login' }" class="mr-3">
          <el-button round>Вход</el-button>
        </nuxt-link>
        <nuxt-link :to="{ name: 'auth-register' }" class="">
          <el-button round>Регистрация</el-button>
        </nuxt-link>
      </b-navbar-nav>

      <!-- is not Auth -->
      <b-navbar-nav class="ml-auto d-md-none" v-if="!$auth.loggedIn">
        <el-dropdown trigger="click" class="navigation-user">
              <span class="el-dropdown-link d-flex align-items-center">
                <div class="navigation__burger">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push({ name: 'auth-login'})">Вход</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({ name: 'auth-register'})">Регистрация</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </b-navbar-nav>

      <!-- is Auth -->
      <b-navbar-nav class="ml-auto d-flex align-items-center flex-row" v-if="$auth.loggedIn">

        <nuxtLink :to="{ name: 'profile-index-messenger' }">
          <el-badge v-if="$auth.user && initUnread" :value="initUnread" :max="99" class="item mr-4 navigation__favorite-badge">
            <i class="far fa-envelope"></i>
          </el-badge>
        </nuxtLink>

        <nuxtLink :to="{ name: 'profile-index-favorite' }">
          <el-badge v-if="$auth.user && $auth.user.favorite_tour" :value="$auth.user.favorite_tour.length" :max="99" class="item mr-4 navigation__favorite-badge">
            <i class="far fa-heart"></i>
          </el-badge>
        </nuxtLink>

        <el-dropdown trigger="click" class="navigation-user">
              <span class="el-dropdown-link d-flex align-items-center">
                <span class="mr-2 navigation-user__name">{{ $auth.user.name }}</span>
                <el-avatar :src="$auth.user.avatar" shape="circle" :size="48">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push({ name: 'profile-index'})">Настройка профиля</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({ name: 'i-id', params: { id: $auth.user.id } })">Мой профиль</el-dropdown-item>


            <el-dropdown-item divided @click.native="$router.push({ name: 'profile-index-change-password'})">Сменить
              пароль
            </el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({ name: 'profile-index-messenger'})">Мессенджер</el-dropdown-item>

            <el-dropdown-item @click.native="$router.push({ name: 'profile-index-favorite' })">
              Избранное <span v-if="$auth.user && $auth.user.favorite_tour">({{ $auth.user.favorite_tour.length }})</span>
            </el-dropdown-item>

            <el-dropdown-item divided @click.native="handleCreateTour"
                              v-if="$auth.user.role === null || $auth.user.role === 'guide'">Новая экскурсия
            </el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({ name: 'profile-index-tours'})"
                              v-if="$auth.user.role === null || $auth.user.role === 'guide'">Список экскурсий
            </el-dropdown-item>

            <el-dropdown-item divided @click.native="logout">Выход</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </b-navbar-nav>

    </b-container>
  </b-navbar>
</template>

<script>
    export default {

        data() {
            return {
              isBlue: null,
            }
        },

        methods: {
            logout() {
                this.$auth.logout();
            },

            handleCreateTour() {
                this.$axios.get('/profile/tours/create').then(({data}) => {
                    this.$router.push({name: 'profile-index-tours-id', params: {id: data.data}})
                })
            },

            handleScroll () {
                if (process.browser) {
                    this.isBlue = !(window.scrollY < 100 && this.$route.name === 'index');
                }
            },
        },

        mounted() {
            this.handleScroll();
        },
        created () {
            if (process.browser) {
                window.addEventListener('scroll', this.handleScroll);
            }
        },
        destroyed () {
            if (process.browser) {
                window.removeEventListener('scroll', this.handleScroll);
            }
        }
    }
</script>

<style scoped lang="sass">
  .navigation
    transition: all ease 0.25s
    &__burger
      width: 100%
      & div
        display: block
        height: 2px
        background-color: #ffffff
        margin: 6px 0
        width: 2rem

    &__favorite-badge
      transition: all ease 0.25s
      &:hover
        opacity: 0.75
      & i
        color: #ffffff
        font-size: 1.25rem
        margin-right: 0.25rem

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
