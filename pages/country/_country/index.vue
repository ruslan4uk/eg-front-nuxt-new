<template>
  <section class="catalog-cities footer-fix">
    <b-container>
      <b-row>

        <b-col cols="12">
          <div class="card-title mb-4" v-if="cities.data">{{ cities.data[0].city_country }}</div>
        </b-col>

        <b-col cols="6" md="4" lg="3" v-if="cities.data" v-for="(city, index) in cities.data" :key="index">
          <nuxtLink class="el-link el-link--primary" :to="{ name: 'country-country-city-city-excursion', params: { country: $route.params.country, city: city.id } }">{{ city.name }}</nuxtLink>
        </b-col>

        <b-col cols="12" class="d-flex justify-content-center">
          <el-pagination
            v-if="cities.total > 0"
            class="mt-5 mb-3"
            background
            layout="prev, pager, next"
            :total="cities.total"
            :page-size="cities.per_page"
            :current-page="cities.current_page"
            @current-change="handleCurrentChange">
          </el-pagination>
        </b-col>

      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {

  watchQuery: true,



  validate({params}) {
    return /^\d+$/.test(params.country)
  },

  asyncData({store, query, params}) {
    console.log(query);
    return store.$axios.get(`search/city-list/${params.country}?page=${query.page}`).then( ({ data }) => {
      return { cities: data.data }
    } )
  },

  methods: {
    handleCurrentChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
}
</script>

<style scoped lang="sass">

</style>
