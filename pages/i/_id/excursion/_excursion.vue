<template>
  <div class="tour-info">

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
</template>

<script>
export default {
    validate ({ params }) {
        return /^\d+$/.test(params.excursion)  // Must be a number
    },

    asyncData({ store, route }) {
        return store.$axios.get(`/front/excursion/${route.params.id}/${route.params.excursion}`).then(({ data }) => {
            return { tour: data.data }
        })
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
</style>
