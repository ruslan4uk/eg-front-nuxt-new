<template>
  <el-form :model="form" :rules="rules" ref="tourForm">
    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-4">{{ form.name ? form.name : 'Новая экскурсия' }}</div>

      <el-alert title="На модерации" type="warning" :closable="false" v-if="form.active === 1" class="mb-4"></el-alert>

      <b-row class="align-items-center pb-3">
        <b-col cols="12" md="4" lg="3" class="justify-content-center">
          <el-form-item prop="avatar" class="mb-0 text-center" :error="errors.avatar ? errors.avatar[0] : ''">
            <avatar circle :url="'/profile/tours/uploader/avatar/' + $route.params.id" :avatar="form.avatar" @change="changeAvatar" class="d-flex justify-content-center" />
          </el-form-item>
        </b-col>

        <b-col cols="12" md="8" lg="9">
          <div class="card-subtitle mb-1">Введите название экскурсии</div>
          <el-form-item  prop="name">
            <el-input v-model="form.name" placeholder="Введите название экскурсии"></el-input>
          </el-form-item>

          <div class="card-subtitle mb-0">Город проведения экскурсии</div>
          <el-form-item class="w-100 mb-3" prop="city_id">
            <el-select
              filterable
              remote
              :remote-method="remoteSearch"
              reserve-keyword
              placeholder="Город проведения экскурсии"
              class="w-100"
              :loading="citySearchLoading"
              v-model="form.city_id"
              loading-text="Загрузка..."
              no-data-text="Не найдено">
              <el-option v-for="item in citySearch" :key="item.id" :label="item.name + ', ' + item.city_country" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

        </b-col>
      </b-row>

      <el-divider></el-divider>

      <div class="card-subtitle mb-1">Маршрут экскурсии</div>
      <div class="card-title-small mb-1">(Введите краткое описание маршрута, напр. Колизей — Ватикан — Вилла Д’Эсте)</div>
      <el-form-item  prop="tour_route">
        <el-input v-model="form.tour_route" placeholder="Маршрут экскурсии"></el-input>
      </el-form-item>

      <div class="card-subtitle mb-1">Выберите языки</div>
      <el-form-item prop="tour_language">
        <el-select v-model="form.tour_language" multiple placeholder="Выберите языки" class="w-100">
          <el-option v-for="item in initLanguage" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-4">Стоимость</div>

      <b-row>
        <b-col cols="12" md="4">
          <div class="card-subtitle mb-1">Стоимость экскурсии</div>
          <el-form-item prop="price">
            <el-input v-model.number="form.price" placeholder="Стоимость экскурсии"></el-input>
          </el-form-item>
        </b-col>

        <b-col cols="12" md="4">
          <div class="card-subtitle mb-1">Валюта</div>
          <el-form-item prop="currency_id">
            <el-select v-model="form.currency_id" placeholder="Валюта" class="w-100">
              <el-option v-for="item in initCurrency" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </b-col>

        <b-col cols="12" md="4">
          <div class="card-subtitle mb-1">С человека или группы</div>
          <el-form-item prop="price_type_id">
            <el-select v-model="form.price_type_id" placeholder="С человека или группы" class="w-100">
              <el-option v-for="item in initPriceType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </b-col>
      </b-row>
    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <b-row>
        <b-col cols="12" md="4">
          <div class="card-subtitle mb-1">Колличество участников</div>
          <el-form-item prop="people_count">
            <el-input v-model="form.people_count" placeholder="Колличество участников"></el-input>
          </el-form-item>
        </b-col>

        <b-col cols="12" md="8">
          <div class="card-subtitle mb-1">Длительность экскурсии</div>
          <el-form-item prop="timing_id">
            <el-select v-model="form.timing_id" placeholder="Длительность экскурсии" class="w-100">
              <el-option v-for="item in initTiming" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="6">
          <div class="card-subtitle mb-1">Категория экскурсии</div>
          <el-form-item prop="category_id">
            <el-select v-model="form.category_id" placeholder="Категория экскурсии" class="w-100">
              <el-option v-for="item in initCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </b-col>

        <b-col cols="12" md="6">
          <div class="card-subtitle mb-1">Категория доступности</div>
          <el-form-item prop="people_category_id">
            <el-select v-model="form.people_category_id" placeholder="Категория доступности" class="w-100">
              <el-option v-for="item in initPeopleCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </b-col>
      </b-row>
    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-4">Дополнительно</div>
      <b-row>
        <b-col cols="12" md="6">
          <div class="card-subtitle mb-1">Дополнительные расходы</div>
          <el-form-item>
            <el-input v-model="form.tour_more" placeholder="Дополнительные расходы"></el-input>
          </el-form-item>
        </b-col>

        <b-col cols="12" md="6">
          <div class="card-subtitle mb-1">Что с собой взять</div>
          <el-form-item>
            <el-input v-model="form.tour_other" placeholder="Что с собой взять"></el-input>
          </el-form-item>
        </b-col>
      </b-row>
    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-0">Расскажите туристам о себе</div>
      <div class="card-title-small mb-3">не использовать тексты с других сайтов. Проверить уникальность текста <a href="http://text.ru" target="_blank">text.ru</a></div>
      <el-form-item prop="about">
        <el-input type="textarea" :rows="12" class="w-100 rounded25" v-model="form.about"></el-input>
      </el-form-item>
    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-0">Фотографии экскурсии</div>
      <div class="card-title-small mb-3">Можно загрузить картинку в формате png, jpg и gif. Размеры не меньше 200 × 200 точек, объём файла не больше 7 МБ</div>
      <el-form-item prop="tour_image" :error="errors.tour_image ? errors.tour_image[0] : ''">
        <uploader :files="form.tour_image" :url="'/profile/tours/uploader/multi/' + $route.params.id" @change="onChangeImage" />
      </el-form-item>
    </div>

    <el-divider class="d-md-none"></el-divider>

    <el-form-item class="text-center">
      <el-button type="primary" icon="el-icon-check" native-type="submit" @click.prevent="saveTour('tourForm')">Сохранить экскурсию</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import Avatar from "@/components/Uploaders/Avatar";
import Uploader from "@/components/Uploaders/Multi";
export default {
    components: {
        Avatar,
        Uploader,
    },

    data() {
        return {
            rules: {
                avatar: [
                    { required: true, message: 'Загрузите обложку экскурсии' , trigger: ['blur', 'change'] }
                ],
                name: [
                    { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
                    { min: 6, max: 40, message: 'Минимум 6 букв и максимум 40', trigger: ['blur', 'change'] }
                ],
                city_id: [
                    { required: true, message: 'Необходимо выбрать город', trigger: ['blur', 'change'] }
                ],
                tour_route: [
                    { required: true, message: 'Необходимо заполнить маршрут', trigger: ['blur', 'change'] }
                ],
                price: [
                    { required: true, message: 'Обязательное поле' , trigger: ['blur', 'change'] }
                ],
                currency_id: [
                    { required: true, message: 'Обязательное поле' , trigger: ['blur', 'change'] }
                ],
                price_type_id: [
                    { required: true, message: 'Обязательное поле' , trigger: ['blur', 'change'] }
                ],
                timing_id: [
                    { required: true, message: 'Обязательное поле' , trigger: ['blur', 'change'] }
                ],
                category_id: [
                    { required: true, message: 'Обязательное поле' , trigger: ['blur', 'change'] }
                ],
                tour_language: [
                    { type: 'array', required: true, message: 'Необходимо выбрать хотя бы один язык', trigger: ['blur', 'change'] }
                ],
                people_count: [
                    { required: true, message: 'Обязательное поле' , trigger: ['blur', 'change'] }
                ],
                about: [
                    { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
                    { min: 50, max: 2500, message: 'Минимум 50 букв и максимум 2500', trigger: ['blur', 'change'] }
                ],
                tour_image: [
                    { type: 'array', required: true, message: 'Необходимо загрузить фотографии экскурсии', trigger: ['blur', 'change'] }
                ]
            },

            citySearchLoading: false,
            citySearch: [],

            form: {
                id: null,
                user_id: null,
                name: null,
                avatar: null,
                country_id: null,
                city_id: null,
                tour_route: null,
                category_id: null,
                people_category_id: null,
                people_count: null,
                timing_id: null,
                price: null,
                currency_id: null,
                price_type_id: null,
                tour_services: null,
                tour_more: null,
                tour_other: null,
                about: null,
                active: null,
                status: null,
                properties: null,
                created_at: null,
                updated_at: null,
                deleted_at: null,
                tour_language: [],
                tour_image: []
            }
        }
    },

    async asyncData( { store, route } ) {
        return store.$axios.get(`/profile/tours/${route.params.id}`).then( ({ data }) => {
            return { form: data.data }
        } )
    },

    methods: {
        changeAvatar(url) {
            this.form.avatar = url;
        },

        onChangeImage(arr) {
            this.form.tour_image = arr
        },

        remoteSearch(query) {
            this.citySearchLoading = true;

            clearTimeout(window.timer);

            window.timer = window.setTimeout(() => {
                this.$axios.$get('/search/city', { params: { query: query } })
                    .then(({ data }) => {
                        this.citySearch = data;
                        this.citySearchLoading = false
                    });
            }, 1000);
        },

        /**
         * Save and validate tour form
         *
         * @param formName
         */
        saveTour(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.put(`/profile/tours/${this.$route.params.id}`, this.form).then( ({ data }) => {
                        this.$notify({ title: 'Отлично!', message: 'Экскурсия успешно сохранена!', type: 'success', duration: 5000 });
                        this.$auth.fetchUser()
                    })
                } else {
                    this.$notify({ title: 'Ошибка!', message: 'Не правильно заполнены поля!', type: 'error', duration: 5000 });
                    return false;
                }
            });
        }
    },

    mounted() {
        this.citySearch = this.form.tour_city_new;
        this.citySearchLoading = false;
    },
}
</script>

<style scoped lang="sass">

</style>
