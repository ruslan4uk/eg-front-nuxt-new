<template>
  <div>
    <section class="main-top">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" md="9">
            <h1 class="main-top__title mb-4 mb-md-3">Все совершенно просто!</h1>
            <h3 class="main-top__subtitle mb-5">Выберите город и начните путешествие прямо сейчас</h3>

            <el-form class="d-flex bg--white rounded25 overflow-hidden">
              <el-form-item class="mb-0 w-100">
                <el-select
                   filterable
                   remote
                   :remote-method="remoteSearch"
                   reserve-keyword
                   class="w-100"
                   :loading="citySearchLoading"
                   v-model="form.city_id"
                   loading-text="Загрузка..."
                   no-data-text="Не найдено"
                   placeholder="Выберите город">
                  <el-option v-for="item in citySearch" :key="item.id" :label="item.name + ', ' + item.city_country" :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="mb-0 d-flex">
                <el-button type="info" class="bg--orange">Начать поиск</el-button>
              </el-form-item>
            </el-form>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="main-last mt-5">
      <b-container>
        <b-row>
          <b-col cols="12"><div class="h3 text-center mb-5">Только что добавленные экскурсии</div></b-col>

          <b-col cols="12" md="4" v-for="(item,index) in lastTour" :key="index" class="mb-5">
            <tour-item :item="item"></tour-item>
          </b-col>

        </b-row>
      </b-container>
    </section>

  </div>
</template>

<script>
import TourItem from "@/components/Items/Tour";

export default {
    layout: 'main',

    components: {
        TourItem
    },

    asyncData({ store }) {
        return store.$axios.get('/front/main').then(( { data } ) => {
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
                this.$axios.$get('/search/city', { params: { query: query } })
                    .then(({ data }) => {
                        this.citySearch = data;
                        this.citySearchLoading = false
                    });
            }, 300);
        },
    },

}
</script>

<style scoped lang="sass">
.main-top
  padding: 12rem 0 9rem
  color: #ffffff
  min-height: 40vh
  background-image: url(~assets/images/main-bg.jpg)
  background-position: center center
  background-size: cover
  &__title
    font-size: 2.75rem
    font-weight: 500
    line-height: 1
    color: #ffffff
  &__subtitle
    font-size: 1rem
    color: #ffffff

  & .el-input__inner
    font-size: 1.25rem !important
    height: auto
    padding: 0.5rem 1rem

.main-prefooter
  &__title
    color: #585f76
    font-size: 1.75rem
  &__text
    font-weight: 300
    color: #585f76
</style>

