<template>
  <b-container>
    <b-row class="user-profile tour-full-info">

      <guide-left-panel :user="user" class="d-none d-md-block"></guide-left-panel>

      <b-col class="12" md="9">

        <div class="mb-2 rounded25 shadow-md-25 p-md-4 mb-4">
          <div class="tour-info position-relative">
            <favorite type="tour" :id="tour.id"></favorite>
            <b-carousel
              :interval="4000"
              controls
              indicators
              fade
              background="#ababab"
              class="mb-4 rounded25">
              <b-carousel-slide :img-src="image.image" v-for="(image, index) in tour.tour_image" :key="index"></b-carousel-slide>
            </b-carousel>

            <div class="h5 mb-4">Экскурсия "{{ tour.name }}"</div>

            <el-divider class="d-md-none"></el-divider>

            <nuxt-link :to="{ name: 'i-id', params: { id: user.id } }" class="d-flex d-md-none align-items-center mb-4 tour-full-info__guide">
              <el-avatar :src="user.avatar" :size="58" class="mr-3"></el-avatar>
              <div>
                <p class="mb-1 tour-full-info__guide-username">{{ user.name }}</p>
                <p class="mb-0">(Ваш персональный гид)</p>
              </div>
            </nuxt-link>

            <el-divider class="d-md-none"></el-divider>
            <!--    <div class="h5 mb-3">Основнаяа информация</div>-->
            <b-row class="mb-1">
              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-map-location mb-1"></i>
                <p class="mb-0 tour-info__group-title">Место проведения</p>
                <p v-for="city in tour.tour_city_new">{{ city.name }}, {{ city.city_country }}</p>
              </b-col>

              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-watch mb-1"></i>
                <p class="mb-0 tour-info__group-title">Длительность</p>
                <p v-for="timing in tour.tour_timing">{{ timing.name }}</p>
              </b-col>

              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-user mb-1"></i>
                <p class="mb-0 tour-info__group-title">Группа</p>
                <p>до {{ tour.people_count }} человек</p>
              </b-col>

              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-money mb-1"></i>
                <p class="mb-0 tour-info__group-title">Стоимость</p>
                <p>
                  {{ tour.currency_id === 1 ? '₽' : '' }} {{ tour.currency_id === 2 ? '$' : '' }} {{ tour.currency_id === 3 ? '€' : '' }}
                  {{ tour.price }}
                  <span v-for="i in tour.tour_price_type">
            / {{ i.name }}
          </span>
                </p>
              </b-col>

              <b-col cols="12">
                <el-divider class="mt-1"></el-divider>
              </b-col>

              <b-col cols="12" md="6" class="tour-info__group mb-3" v-if="tour.tour_route">
                <p class="mb-0 tour-info__group-title">Маршрут</p>
                <p>{{ tour.tour_route }}</p>
              </b-col>

              <b-col cols="12" md="6" class="tour-info__group mb-3" v-if="tour.tour_other">
                <p class="mb-0 tour-info__group-title">Что с собой взять</p>
                <p>{{ tour.tour_other }}</p>
              </b-col>

              <b-col cols="12" class="tour-info__group mb-3" v-if="tour.tour_more">
                <p class="mb-0 tour-info__group-title">Дополнительные расходы</p>
                <p>{{ tour.tour_more }}</p>
              </b-col>

            </b-row>

            <el-divider class="mt-0"></el-divider>

            <div class="h5 mb-3">Описание экскурсии</div>
            <div class="user-profile__about">{{ tour.about }}</div>

          </div>
        </div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GuideLeftPanel from "@/components/Frontend/GuideLeftPanel";
import Favorite from "@/components/Favorite";
export default {
    validate ({ params }) {
        return /^\d+$/.test(params.id)  // Must be a number
    },

    head() {
        return {
            title: 'Экскурсия частного гида: "' + this.tour.name + '" город ' + this.tour.tour_city_new[0].name + ' — «Еxcursguide ' + this.tour.tour_city_new[0].name + '»'
        }
    },

    components: {
        GuideLeftPanel,
        Favorite
    },

    asyncData({ store, route, error }) {
        return store.$axios.get(`/front/excursion/${route.params.id}`).then(({ data }) => {
            return {
                tour: data.data,
                user: data.user,
            }
        }).catch(e => {
          error({ statusCode: 404 });
        });
    },
}
</script>

<style scoped lang="sass">
.tour-info
  &__group
    & p
      font-size: 0.875rem
    & i
      font-size: 1.5rem
  &__group-title
    color: #777777
    font-weight: 300

.tour-full-info
  &__guide
    display: block
    &:hover
      text-decoration: none
  &__guide p
    color: #777777
    line-height: 1.2
    font-size: 0.825rem
  &__guide-username
    color: #000000 !important
    font-size: 1rem !important
    font-weight: 500

</style>
