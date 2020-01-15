<template>
  <section class="catalog-guides">

    <catalog-filter/>

    <b-container class="footer-fix mt-5">
      <b-row>
        <b-col cols="12" class="mb-3">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><nuxtLink :to="{ name: 'index' }">Главная</nuxtLink></el-breadcrumb-item>
            <el-breadcrumb-item>
              <nuxtLink :to="{ name: 'country-country', params: { country: pageCity['0'].country_id } }">{{ pageCity['0'].country_name }}</nuxtLink>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <nuxtLink :to="{ name: 'country-country-city-city-excursion', params: { country: pageCity['0'].country_id, city: pageCity['0'].city_id } }">{{ pageCity['0'].city_name }}</nuxtLink>
            </el-breadcrumb-item>
            <el-breadcrumb-item>Гиды</el-breadcrumb-item>
          </el-breadcrumb>
        </b-col>

        <b-col cols="12">
          <div class="card-title mb-4">Частные гиды в городе {{ pageCity[0].city_name }}</div>
        </b-col>



        <b-col cols="12" md="6" v-for="(guide, index) in guides.data" :key="index" class="mb-5">
          <nuxt-link :to="{ name: 'i-id-excursion', params: { id: guide.id } }" class="catalog-guides__item d-flex">
            <div class="catalog-guides__avatar mr-2">
              <el-avatar shape="square" :size="140" :src="guide.avatar"></el-avatar>
            </div>

            <div class="catalog-guides__content d-flex flex-column">
              <div class="catalog-guides__title mb-2">{{ guide.name }}</div>

              <div class="mb-2 catalog-guides__language" v-if="guide.user_language && guide.user_language.length > 0">
                <span class="">Знание языков: </span>
                <span v-for="(language, index) in guide.user_language" :key="index">
                  {{ language.name }}{{ guide.user_language.length > (index + 1) ? '; ' : '' }}
                </span>
              </div>

              <div class="catalog-guides__counts mt-auto d-flex">
                <div class="catalog-guides__count mr-4">
                  {{ guide.tour_count }}
                  <div>{{ declOfNum(guide.tour_count, ['экскурсия', 'экскурсии', 'экскурсий']) }}</div>
                </div>

                <div class="catalog-guides__count">
                  {{ guide.user_comment_count }}
                  <div>{{ declOfNum(guide.user_comment_count, ['отзыв', 'отзыва', 'отзывов']) }}</div>
                </div>
              </div>

            </div>

          </nuxt-link>

        </b-col>

        <b-col cols="12" v-if="guides.data && guides.data.length === 0">
          <el-alert
            title="Ничего не найдено"
            type="warning"
            :closable="false">
          </el-alert>
        </b-col>

      </b-row>
    </b-container>
  </section>
</template>

<script>
    import CatalogFilter from '@/components/Frontend/CatalogFilter'

    export default {
        components: {
            CatalogFilter,
        },

        head() {
            return {
                title: 'Экскурсионный гид город ' + this.pageCity[0].city_name + ' услуги, цены — «Еxcursguide гиды ' + this.pageCity[0].city_name + '»'
            }
        },

        async asyncData({store, params, query, error}) {
            let url_query = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&');

            const {data} = await store.$axios.get(`/front/get/guide/${params.country}/${params.city}?${url_query}`);
            const city = await store.$axios.get(`search/city?sel=${params.city}`);

            if(city.data.data.length < 1) {
                error({ statusCode: 404 });
            }

            return {guides: data.data, pageCity: city.data.data}
        },

        methods: {
            declOfNum(number, titles) {
                let cases = [2, 0, 1, 1, 1, 2];
                return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            }
        }
    }
</script>

<style scoped lang="sass">
  .catalog-guides
    font-size: 0.825rem
    @media screen and (min-width: 768px)
      font-size: 1rem

    &__item
      text-decoration: none
      color: #000
      transition: all ease 0.3s
      &:hover
        box-shadow: 0 0 10px 2px rgba(0,0,0,.05)


    &__content
      padding: 0.5rem

    &__avatar
      line-height: 0

    &__title
      font-size: 1.25em
      font-weight: 500
      line-height: 1.2

    &__language
      font-size: 0.875em
      color: #777777
      line-height: 1.2

    &__counts
      padding-bottom: 0.25rem
    &__count
      font-size: 1.5em
      font-weight: 900
      line-height: 1.3
      & > div
        font-size: 0.875rem
        font-weight: 400
        color: #777777
</style>
