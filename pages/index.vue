<template>
  <div>
    <section class="main-top">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" md="8">
            <h1 class="main-top__title mb-4 mb-md-3">Все совершенно просто!</h1>
            <h3 class="main-top__subtitle mb-5">Выберите город и начните путешествие прямо сейчас</h3>

            <el-form class="d-flex" :model="form">
              <el-form-item class="mb-0 w-100 position-relative">
                <div class="position-absolute main-search-panel-icon">
                  <i class="el-icon-search"></i>
                </div>
                <el-select
                  v-model="form.city_id"
                  filterable
                  remote
                  :remote-method="remoteSearch"
                  class="w-100 main-search-panel"
                  :loading="citySearchLoading"
                  loading-text="Загрузка..."
                  no-data-text="Не найдено"
                  placeholder="Выберите город">
                  <el-option v-for="item in citySearch" :key="item.city_id" :label="item.city_name + ', ' + item.country_name"
                             :value="item.city_id"
                            @click.native="changeSearch(item)"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </b-col>
        </b-row>
      </b-container>
    </section>


    <section class="main-last mt-5">
      <b-container>
        <b-row>
          <b-col cols="12">
            <div class="h3 text-center mb-5">Только что добавленные экскурсии</div>
          </b-col>

          <b-col cols="12" md="4" v-for="(item,index) in lastTour" :key="index" class="mb-5">
            <tour-item :item="item"></tour-item>
          </b-col>

        </b-row>
      </b-container>
    </section>

  </div>
</template>

<script>
  import SelectUi from "@/components/SelectUi";
    import TourItem from "@/components/Items/Tour";

    export default {
        head() {
            return {
                title: 'Excursguide - найти экскурсию и гида - легко!',
                meta: [{
                  name: 'description',
                  content: 'Собрались отправиться в отпуск? Хочется приключений? Начните свое путешествие прямо сейчас. Просто выберете интересующий вас город в поиске и отправляйтесь в тур по гидам, найдя самую интересную экскурсию'
                }, {
                  name: 'keywords',
                  content: 'Гиды, туры, excursguide, excursguide.ru, отправится в путешествие'
                }],
            }
        },

        layout: 'main',

        components: {
            SelectUi,
            TourItem
        },

        asyncData({store}) {
            return store.$axios.get('/front/main').then(({data}) => {
                return {
                    lastTour: data.data.last_tour
                }
            })
        },

        data() {
            return {
                citySearchLoading: false,
                citySearch: [],

                form: {
                    city_id: ''
                }
            }
        },

        methods: {
            remoteSearch(query) {
                this.citySearchLoading = true;

                clearTimeout(window.timer);

                window.timer = window.setTimeout(() => {
                    this.$axios.$get('/search/city', {params: {query: query}})
                        .then(({data}) => {
                            this.citySearch = data;
                            this.citySearchLoading = false
                        });
                }, 300);
            },

            changeSearch(geo) {
                this.$router.push({ name: 'country-country-city-city-excursion', params: { country: geo.country_id, city: geo.city_id } })
            },

        },

    }
</script>

<style scoped lang="sass">

</style>

