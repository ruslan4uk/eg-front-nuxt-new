<template>
  <b-container>
    <b-row class="user-profile mt-5 mt-md-0 pt-3 pt-md-0">

      <guide-left-panel :user="user"></guide-left-panel>

      <b-col class="12" md="9">
        <!-- test -->
        <b-navbar toggleable="lg" type="light" fixed="top"
                  class="user-profile-navbar user-profile-navbar--testing d-md-none my-4">
          <b-navbar-nav class="d-flex flex-row justify-content-between w-100">
            <b-nav-item :to="{ name: 'i-id', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
              <i class="el-icon-info"></i><div>Обо мне</div>
            </b-nav-item>
            <b-nav-item :to="{ name: 'i-id-excursion', params: { id: $route.params.id } }" class="text-center user-profile-navbar__link">
              <i class="el-icon-picture"></i><div>Экскурсии</div>
            </b-nav-item>
            <b-nav-item :to="{ name: 'i-id-responses', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
              <i class="el-icon-s-comment"></i><div>Отзывы</div>
            </b-nav-item>
            <b-nav-item :to="{ name: 'i-id-contact', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
              <i class="el-icon-share"></i><div>Контакты</div>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
        <!-- end test -->

        <div class="mb-2 rounded25 shadow-md-25 p-md-4 mb-4">

          <nuxt-child :user="user"></nuxt-child>

        </div>

      </b-col>
    </b-row>

    <!-- Bottom navbar -->
    <b-navbar toggleable="lg" type="dark" fixed="bottom" class="d-none bg--blue user-profile-navbar">
        <b-navbar-nav class="d-flex flex-row justify-content-between w-100">
          <b-nav-item :to="{ name: 'i-id', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
            <i class="el-icon-info"></i>
            <div>Обо мне</div>
          </b-nav-item>
          <b-nav-item :to="{ name: 'i-id-excursion', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
            <i class="el-icon-picture"></i>
            <div>Экскурсии</div>
          </b-nav-item>
          <b-nav-item :to="{ name: 'i-id-responses', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
            <i class="el-icon-s-comment"></i>
            <div>Отзывы</div>
          </b-nav-item>
          <b-nav-item :to="{ name: 'i-id-contact', params: { id: $route.params.id } }" exact class="text-center user-profile-navbar__link">
            <i class="el-icon-share"></i>
            <div>Контакты</div>
          </b-nav-item>
        </b-navbar-nav>
    </b-navbar>

  </b-container>
</template>

<script>
import GuideLeftPanel from "@/components/Frontend/GuideLeftPanel";
export default {
    scrollToTop: true,
    validate ({ params }) {
        return /^\d+$/.test(params.id)  // Must be a number
    },

    components: {
        GuideLeftPanel
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
.user-profile-navbar
  &__link i
    font-size: 1.125rem

  &--testing
    background-color: #f4f4f4
    box-shadow: 0 0 10px 2px rgba(0,0,0,.2)
    //margin-left: -1rem
    //margin-right: -1rem
    top: 3.875rem
    padding: 0 1rem
</style>
