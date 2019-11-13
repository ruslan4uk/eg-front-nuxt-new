<template>
  <b-container>
    <b-row class="user-profile">
      <b-col cols="12" md="3" class="">
        <b-row>
          <b-col cols="4" md="12">
            <el-image :src="user.avatar" fit="cover" class="mb-3 rounded25 shadow25 d-flex justify-items-center user-profile__avatar">
              <template slot="placeholder">
                <div class="d-flex justify-content-center image-loading w-100">
                  <i class="el-icon-loading"></i>
                </div>
              </template>
            </el-image>
          </b-col>

          <b-col cols="8" md="12" class="pl-0 pl-md-3">
            <div class="h5 font-weight-bold mb-0">{{ user.name }}</div>

            <div class="user-profile__info-group mb-3 d-md-none" v-if="user.user_city && user.user_city.length > 0">
              <span v-for="(city, index) in user.user_city" :key="index" class="d-block my-1">
                <span :class="'mr-1 flag-icon flag-icon-' + city.iso_code.toLowerCase()" v-if="city.iso_code"></span>
                {{ city.name }}, {{ city.city_country.name }}{{ user.user_city.length > (index + 1) ? '; ' : '' }}
              </span>
            </div>
          </b-col>
        </b-row>

        <el-divider class="d-md-none mb-4"></el-divider>

        <!-- Navigation -->
        <div class="user-profile__navbar my-4 py-2 d-none d-md-block">
          <ul>
            <li><nuxt-link :to="{ name: 'i-id', params: { id: $route.params.id } }" exact>Обо мне</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'i-id-excursion', params: { id: $route.params.id } }">Экскурсии</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'i-id-responses', params: { id: $route.params.id } }" exact>Отзывы</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'i-id-contact', params: { id: $route.params.id } }" exact>Контакты</nuxt-link></li>
          </ul>
        </div>

        <div class="user-profile__info d-none d-md-block">
          <div class="user-profile__info-group mb-3" v-if="user.user_city && user.user_city.length > 0">
            <div>Город проживания</div>
            <span v-for="(city, index) in user.user_city" :key="index" class="d-block my-1">
            <span :class="'mr-1 flag-icon flag-icon-' + city.iso_code.toLowerCase()" v-if="city.iso_code"></span>
              {{ city.name }}, {{ city.city_country.name }}{{ user.user_city.length > (index + 1) ? '; ' : '' }}
            </span>
          </div>

          <div class="user-profile__info-group mb-3" v-if="user.user_language && user.user_language.length > 0">
            <div>Знание языков</div>
            <span v-for="(language, index) in user.user_language" :key="index">
              {{ language.name }}{{ user.user_language.length > (index + 1) ? '; ' : '' }}
            </span>
          </div>

          <div class="user-profile__info-group mb-3" v-if="user.user_service && user.user_service.length > 0">
            <div>Услуги</div>
            <span class="d-block" v-for="(service, index) in user.user_service" :key="index">
              {{ service.name }}{{ user.user_service.length > (index + 1) ? '; ' : '' }}
            </span>
          </div>

          <div class="user-profile__info-group mb-3" v-if="user.user_contact && user.user_contact.length > 0">
            <div>Контакты</div>
            <span v-for="(contact, index) in user.user_contact" :key="index" class="pb-1 d-block">
            {{ contact.text }}
            (<span v-for="(contact_type, index) in initContactType" :key="index">{{contact_type.id === contact.type ? contact_type.name : ''}}</span>){{ user.user_contact.length > (index + 1) ? '; ' : '' }}
          </span>
          </div>
        </div>

      </b-col>

      <b-col class="12" md="9">
        <div class="mb-2 rounded25 shadow-md-25 p-md-4 mb-4">

          <nuxt-child :user="user"></nuxt-child>

        </div>

      </b-col>
    </b-row>

    <!-- Bottom navbar -->
    <b-navbar toggleable="lg" type="light" fixed="bottom" class="d-md-none bg--white border-top">
        <b-navbar-nav class="d-flex flex-row justify-content-between w-100">
          <b-nav-item :to="{ name: 'i-id', params: { id: $route.params.id } }" exact>Обо мне</b-nav-item>
          <b-nav-item :to="{ name: 'i-id-excursion', params: { id: $route.params.id } }" exact>Экскурсии</b-nav-item>
          <b-nav-item :to="{ name: 'i-id-responses', params: { id: $route.params.id } }" exact>Отзывы</b-nav-item>
          <b-nav-item :to="{ name: 'i-id-contact', params: { id: $route.params.id } }" exact>Контакты</b-nav-item>
        </b-navbar-nav>
    </b-navbar>

  </b-container>
</template>

<script>

export default {
    scrollToTop: true,
    validate ({ params }) {
        return /^\d+$/.test(params.id)  // Must be a number
    },

    asyncData({ store, route, error }) {
        return store.$axios.get(`/front/user/${route.params.id}`).then(({ data }) => {
            return { user: data.data }
        }).catch((e) => {
            return error({ statusCode: 404, message: 'Page not found' })
        })
    },
}
</script>

<style scoped lang="sass">

</style>
