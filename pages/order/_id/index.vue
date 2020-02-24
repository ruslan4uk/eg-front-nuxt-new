<template>
  <b-container>
    <b-row>
      <!-- Right column -->
      <b-col cols="12" md="9">
        <div class="tour-info mb-2 rounded25 shadow-md-25 p-md-4 mb-4">
            <div class="order-block__title mb-4">Заказ экскурсии "{{ tour.name }}"</div>

            <b-row class="mb-1 order-block">
              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-map-location mb-1"></i>
                <p class="tour-info__title mb-0">Место проведения</p>
                <p v-for="city in tour.tour_city_new">{{ city.name }}, {{ city.city_country }}</p>
              </b-col>

              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-watch mb-1"></i>
                <p class="tour-info__title mb-0 ">Длительность</p>
                <p v-for="timing in tour.tour_timing">{{ timing.name }}</p>
              </b-col>

              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-user mb-1"></i>
                <p class="tour-info__title mb-0">Группа</p>
                <p>до {{ tour.people_count }} человек</p>
              </b-col>

              <b-col cols="6" md="3" class="tour-info__group mb-3">
                <i class="el-icon-money mb-1"></i>
                <p class="tour-info__title mb-0">Стоимость</p>
                <p>
                  {{ tour.currency_id === 1 ? '₽' : '' }} {{ tour.currency_id === 2 ? '$' : '' }} {{ tour.currency_id === 3 ? '€' : '' }}
                  {{ tour.price }}
                  <span v-for="i in tour.tour_price_type">
                    / {{ i.name }}
                  </span>
                </p>
              </b-col>

              <b-col cols="12" class="d-none d-md-block">
                <el-divider class="mt-1"></el-divider>
              </b-col>

              <b-col cols="12" md="6" class="tour-info__group mb-3 d-none d-md-block" v-if="tour.tour_route">
                <p class="tour-info__title mb-0">Маршрут</p>
                <p>{{ tour.tour_route }}</p>
              </b-col>

              <b-col cols="12" md="6" class="tour-info__group mb-3 d-none d-md-block" v-if="tour.tour_other">
                <p class="tour-info__title mb-0">Что с собой взять</p>
                <p>{{ tour.tour_other }}</p>
              </b-col>

              <b-col cols="12" class="tour-info__group mb-3 d-none d-md-block" v-if="tour.tour_more">
                <p class="tour-info__title mb-0">Дополнительные расходы</p>
                <p>{{ tour.tour_more }}</p>
              </b-col>

            </b-row>

            <div class="h5 my-4">Оформление заказа</div>

          <el-form :model="form" :rules="rules" ref="orderForm">
            <b-row>
              <b-col cols="12" class="mb-2">
                <!-- Radio switch date format -->
                <el-form-item prop="dateType" class="mb-2">
                  <el-radio-group v-model="form.date_type" size="medium" class="el-radio-group el-radio-group--full-width">
                    <el-radio-button label="1">Знаю точную дату</el-radio-button>
                    <el-radio-button label="2">Не знаю точную дату</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </b-col>

              <!-- Date start or date start and end -->
              <b-col cols="12" md="8">
                <div class="card-subtitle mb-2">Дата проведения экскурсии</div>
                <div class="d-flex">
                  <el-form-item prop="date_start" class="w-100">
                    <el-date-picker
                      v-model="form.date_start"
                      type="date"
                      placeholder="Выберите дату"
                      class="w-100"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptionsStart">
                    </el-date-picker>
                  </el-form-item>
                  <div v-if="form.date_type === '2'" class="order-block__date-divider"> - </div>
                  <el-form-item prop="date_end" v-if="form.date_type === '2'" class="w-100">
                    <el-date-picker
                      v-model="form.date_end"
                      type="date"
                      placeholder="Выберите дату"
                      class="w-100"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </b-col>

              <!-- People count -->
              <b-col cols="12" md="4">
                <div class="card-subtitle mb-2">Сколько вас будет человек?</div>
                <el-form-item prop="peopleCount">
                  <el-input-number
                    v-model="form.people_count"
                    :min="1"
                    :max="10"
                    class="w-100"></el-input-number>
                </el-form-item>
              </b-col>
            </b-row>

            <el-divider class="mb-5"></el-divider>

            <b-row>
              <!-- Name -->
              <b-col cols="12" md="6">
                <div class="card-subtitle mb-2">Как вас зовут?</div>
                <el-form-item prop="name">
                  <el-input v-model="form.name" placeholder="Петров Иван"></el-input>
                </el-form-item>
              </b-col>

              <!-- Email -->
              <b-col cols="12" md="6">
                <div class="card-subtitle mb-2">Ваш Email</div>
                <el-form-item prop="email">
                  <el-input v-model="form.email" placeholder="example@site.com"></el-input>
                </el-form-item>
              </b-col>

              <!-- Phone -->
              <b-col cols="12" md="6">
                <div class="card-subtitle mb-2">Ваш телефон</div>
                <el-form-item prop="phone">
                  <el-input v-model="form.phone" placeholder="+7 (999) 888 77 66"></el-input>
                </el-form-item>
              </b-col>

              <!-- Messenger -->
              <b-col cols="12" md="6">
                <div class="card-subtitle mb-2">Номер WhatsApp/Viber/Telegram для связи</div>
                <el-form-item prop="messenger">
                  <el-input v-model="form.messenger" placeholder="+7 (999) 888 77 66"></el-input>
                </el-form-item>
              </b-col>

              <!-- Comment -->
              <b-col cols="12">
                <div class="card-subtitle mb-2">Вопросы и комментарии</div>
                <el-form-item prop="comment">
                  <el-input type="textarea" :rows="12" class="w-100 rounded25" v-model="form.comment"></el-input>
                </el-form-item>
              </b-col>
            </b-row>

            <div class="pb-3">
              <el-divider></el-divider>
            </div>

            <div class="order-block__footer">
              <div class="order-block__btn">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-check" native-type="submit" @click.prevent="handleSendOrder('orderForm')" >Отправить</el-button>
                </el-form-item>
              </div>
              <div class="order-block__text">
                Стоимость экскурсии —
                {{ tour.currency_id === 1 ? '₽' : '' }} {{ tour.currency_id === 2 ? '$' : '' }} {{ tour.currency_id === 3 ? '€' : '' }}
                {{ tour.price }}
                <span v-for="i in tour.tour_price_type">
                    / {{ i.name }}
                  </span>. Вы сможете сразу забронировать экскурсию, либо задать вопросы гиду до оплаты.
              </div>
            </div>
          </el-form>
        </div>
      </b-col>

      <!-- Left column -->
      <b-col cols="12" md="3" class="d-none d-md-block order-block__left">
        <div class="h5 mt-4 pt-1 mb-4">Важная информация</div>
        <p>
          Команда Excursguide настоятельно не рекомендует перечислять гиду любую оплату до даты экскурсии.
          Платите после получения услуги*
        </p>
        <p>
          Рады сообщить, что для вашего удобства в скором времени мы добавим возможность проведения
          безопасной сделки на сайте для гарантии выполнения обязательств с двух сторон.
        </p>
        <p>
          Подтверждение экскурсии гидом придёт на вашу электронную почту.
          Не забудьте проверить почтовый ящик!
        </p>
        <p>
          <small>
            * ЕG не несёт ответственность за все финансовые операции, совершенные между заказчиком и исполнителем.
            EG - информационная платформа, которая не гарантирует получения или оплаты услуг.
            Настоятельно рекомендуем не совершать любую финансовую операцию до получения услуги.
          </small>
        </p>
        <p>
          С заботой о Вас 🤗
          Ваш Excursguide
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
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

  data() {
    return {
      rules: {
        date_start: [
          { required: true, message: 'Выберите дату', trigger: ['blur', 'change'] }
        ],
        date_end: [
          { required: true, message: 'Выберите дату', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
          { min: 3, max: 40, message: 'Минимум 3 букв и максимум 40', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
          { min: 3, max: 40, message: 'Минимум 3 букв и максимум 40', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
          { min: 3, max: 40, message: 'Минимум 3 букв и максимум 40', trigger: ['blur', 'change'] }
        ],
        messenger: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
          { min: 3, max: 40, message: 'Минимум 3 букв и максимум 40', trigger: ['blur', 'change'] }
        ],
      },
      form: {
        date_type: "1",
        date_start: '',
        date_end: '',
        people_count: 1,
        name: '',
        email: '',
        phone: '',
        messenger: '',
        comment: '',
      },
      pickerOptionsStart: {
        disabledDate(time) {
          return Date.now() > time.getTime();
        }
      },
      pickerOptionsEnd: {
        disabledDate: this.handleDateEnd
      }
    }
  },

  methods: {
    handleDateEnd(time) {
      if(this.form.date_start)
        return Date.parse(this.form.date_start) > time.getTime();

      return time.getTime() < Date.now();
    },
    handleSendOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(`/front/orders/${this.$route.params.id}`, this.form).then((res) => {
            this.$router.push({ name: 'order-id-confirm', params: { id: this.$route.params.id } })
          }).catch(err => {
            this.$notify({ title: 'Ошибка!', message: 'Ошибка! Попробуйте позже!', type: 'error', duration: 5000 });
          })
        } else {
          this.$notify({ title: 'Ошибка!', message: 'Не правильно заполнены поля!', type: 'error', duration: 5000 });
          return false;
        }
      });
    }
  }
}
</script>

<style lang="sass">

</style>
