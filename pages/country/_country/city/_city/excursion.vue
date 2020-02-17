<template>
  <section class="catalog">

    <catalog-filter @change="handleChangeCategory"/>

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
            <el-breadcrumb-item>Экскурсии</el-breadcrumb-item>
          </el-breadcrumb>
        </b-col>

        <b-col cols="12">
          <div class="card-title mb-4">Экскурсии в городе {{ pageCity[0].city_name }}</div>
        </b-col>
        <b-col cols="12" md="6" lg="4" v-for="(tour, index) in tours.data" :key="index">
          <tour-item :item="tour" class="mb-4"></tour-item>
        </b-col>


        <b-col v-if="tours.data && tours.data.length === 0">
          <el-alert
            title="Ничего не найдено"
            type="warning"
            :closable="false">
          </el-alert>
        </b-col>

        <b-col cols="12" class="d-flex justify-content-center">
          <el-pagination
            v-if="tours.total > 0"
            class="mt-5 mb-3"
            background
            layout="prev, pager, next"
            :total="tours.total"
            :page-size="tours.per_page"
            :current-page="tours.current_page"
            @current-change="handleCurrentChange">
          </el-pagination>
        </b-col>

      </b-row>
    </b-container>
  </section>
</template>

<script>
    import CatalogFilter from '@/components/Frontend/CatalogFilter'
    import TourItem from '@/components/Items/Tour';

    export default {
        validate({params}) {
            return /^\d+$/.test(params.city)
        },

        head() {
            return {
                title: 'Экскурсии в городе ' + this.pageCity[0].city_name + ' цены и описания — «Еxcursguide экускурсии ' + this.pageCity[0].city_name + '»'
            }
        },

        watchQuery: true,

        components: {
            CatalogFilter,
            TourItem
        },

        async asyncData({store, params, query, error}) {
            let url_query = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&');

            const {data} = await store.$axios.get(`/front/get/tour/${params.country}/${params.city}?${url_query}`);
            const city = await store.$axios.get(`search/city?sel=${params.city}`);

            if(city.data.data.length < 1) {
              error({ statusCode: 404 });
            }

            return {tours: data.data, pageCity: city.data.data}
        },

        data() {
            return {
                loading: false,
            }
        },

        methods: {
            handleCurrentChange(val) {
                window.scrollTo(0, 0);
                if(this.$route.query.catalogCategory) {
                    this.$router.push({ query: { page: val, catalogCategory: this.$route.query.catalogCategory } });
                } else {
                    this.$router.push({ query: { page: val } });
                }
            },

            handleChangeCategory(val) {
                console.log(val);
                console.log('Stringify: ', JSON.stringify(val));
                window.scrollTo(0, 0);
                this.$router.push({ query: { catalogCategory: JSON.stringify(val) } });
            }
        },

    }
</script>


<style scoped lang="sass">

</style>
