<template>
  <div>
    <section class="main-top">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" md="9">
            <h1>Все совершенно просто!</h1>
            <h3 class="mb-5">Выберите город и начните путешествие прямо сейчас</h3>

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
          <b-col cols="12"><div class="h2 text-center mb-5">Только что добавленные экскурсии</div></b-col>

          <b-col cols="12" md="4" v-for="(item,index) in lastTour" :key="index" class="mb-5">
            <tour-item :item="item"></tour-item>
          </b-col>

        </b-row>
      </b-container>
    </section>

    <div class="main-prefooter mt-5">
      <b-container>
        <b-row>
          <b-col cols="12"><div class="h2 text-center mb-3 mt-4">Кому необходим ExcursGuide?</div></b-col>
        </b-row>
      </b-container>
      <div class="container">
        <div class="row flex-lg-row-reverse justify-content-between align-items-center">
          <div class="col-12 col-lg-6 mb-4">
            <img src="~assets/images/main/main_1.jpg" alt="">
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="main-prefooter__title mb-3">Вы гид?</div>
            <p class="main-prefooter__text">Замечательно! Регистрируйтесь бесплатно на сайте,
              выкладывайте свои экскурсии с описанием и фотографиями,
              привлекая туристов со всего Мира! Не жалейте слов и фотографий,
              потому что яркое описание и привлекательные изображения
              обязательно приведут туристов именно к вам</p>
          </div>
        </div>

        <!-- 2col -->
        <div class="row justify-content-between align-items-center">
          <div class="col-12 col-lg-6 mb-4">
            <img src="~assets/images/main/main_2.jpg" alt="">
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="main-prefooter__title mb-3">Ооо! Да вы турист!</div>
            <p class="main-prefooter__text">Собрались отправиться в отпуск? Хочется приключений?
              Начните свое путешествие прямо сейчас. Просто выберете
              интересующий вас город в поиске и отправляйтесь в тур
              по гидам, найдя самую интересную экскурсию, которая сделает
              ваш отдых еще более увлекательным</p>
          </div>
        </div>

        <!-- 3col -->
        <div class="row flex-lg-row-reverse justify-content-between align-items-center">
          <div class="col-12 col-lg-6 mb-4">
            <img src="~assets/images/main/main_4.jpg" alt="">
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="main-prefooter__title mb-3">Можно все! И даже чуточку больше</div>
            <p class="main-prefooter__text mb-4">Размещайте не только свои интересные экскурсии! Добавьте
              авторские туры, аренду авто, а может быть даже проведение
              свадебной церемонии. И это еще не весь список!</p>
          </div>
        </div>

        <!-- 4col -->
        <div class="row flex-lg-row-reverse justify-content-between align-items-center mt-5">
          <div class="col-12 col-lg-6 mb-4">
            <img src="~assets/images/main/main_3.jpg" alt="">
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="main-prefooter__title mb-3">Держим курс только вперед!</div>
            <p class="main-prefooter__text mb-4">И будьте уверены, мы не останавливаемся на достигнутом.
              Мы обязательно будем совершенствоваться, для того, чтобы вам
              было удобнее и приятнее пользоваться нашим сервисом Excursguide.</p>

            <p class="main-prefooter__text">От винта, друзья!</p>
          </div>
        </div>
      </div>
    </div>
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

