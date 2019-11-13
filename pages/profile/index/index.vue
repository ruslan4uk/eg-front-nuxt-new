<template>
  <el-form :model="profile" :rules="profile.role === 'tourist' ? rulesTourist : rules" ref="profileForm">
    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-4">Основная информация</div>

      <b-row class="align-items-center pb-3">
        <b-col cols="12" md="4" lg="3" class="justify-content-center">

          <avatar circle="true" url="/profile/upload-avatar" :avatar="profile.avatar" @change="changeAvatar" class="d-flex justify-content-center" />

        </b-col>

        <b-col cols="12" md="8" lg="9">
          <div class="card-subtitle mb-1">Ваше имя или название компании</div>
          <el-form-item  prop="name">
            <el-input v-model="profile.name" placeholder="Ваше имя или название компании"></el-input>
          </el-form-item>

          <div v-if="profile.role === null || profile.role === 'guide'">
            <div class="card-subtitle mb-1">Владение языками</div>
            <el-form-item prop="user_language" class="mb-0">
              <el-select v-model="profile.user_language" multiple placeholder="Выберите языки" class="w-100">
                <el-option v-for="item in initLanguage" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>

        </b-col>
      </b-row>

      <el-divider v-if="profile.role === null || profile.role === 'guide'"></el-divider>

      <div v-if="profile.role === null || profile.role === 'guide'">
        <div class="card-subtitle mb-1 mt-2">Ваше местоположение</div>
        <el-form-item class="w-100 mb-3" prop="user_city_ids">
          <el-select
            v-model="profile.user_city_ids"
            filterable
            multiple
            remote
            :remote-method="remoteSearch"
            reserve-keyword
            placeholder="Введите место вашего проживания"
            class="w-100"
            :loading="citySearchLoading"
            loading-text="Загрузка..."
            no-data-text="Не найдено">
            <el-option v-for="item in citySearch" :key="item.id" :label="item.name + ', ' + item.city_country" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div v-if="profile.role === null || profile.role === 'guide'">
        <div class="card-subtitle mb-1 mt-2">Какие услуги вы предоставляете?</div>
        <el-form-item prop="user_service">
          <el-select v-model="profile.user_service" multiple placeholder="Выберите услуги" class="w-100">
            <el-option v-for="service in initService" :key="service.id" :label="service.name" :value="service.id"></el-option>
          </el-select>
        </el-form-item>
      </div>

    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4 profile-contacts">
      <div class="card-title mb-4">Контактная информация</div>

      <div class="d-flex mb-0" v-for="(contact, index) in profile.user_contact" :key="index">

        <el-form-item class="profile-contacts__type mr-2"
                :prop="'user_contact.' + index + '.type'"
                :rules="{ required: true, message: 'Выберите', trigger: ['blur', 'change'] }">
          <el-select v-model="contact.type">
            <el-option v-for="contact_type in initContactType" :key="contact_type.id" :label="contact_type.name" :value="contact_type.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="w-100"
                :prop="'user_contact.' + index + '.text'"
                :rules="{ required: true, message: 'Обязательно для заполнения', trigger: ['blur', 'change'] }">
          <el-input v-model="contact.text"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-close" type="text" class="ml-2"
                     v-if="index !== 0"
                     @click="deleteContact(index)"></el-button>
        </el-form-item>

      </div>
      <el-button icon="el-icon-plus"
                 v-if="profile.user_contact.length < 5"
                 @click="pushContact"
                  type="text"
                class="d-block">Добавить еще контакты</el-button>
      <el-alert :title="errors.userContact" v-if="errors.userContact" type="error"></el-alert>
    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4" v-if="profile.role === null || profile.role === 'guide'">
      <div class="card-title mb-0">Расскажите туристам о себе</div>
      <div class="card-title-small mb-3">не использовать тексты с других сайтов. Проверить уникальность текста <a href="http://text.ru" target="_blank">text.ru</a></div>
      <el-form-item prop="about">
        <el-input type="textarea" :rows="12" class="w-100 rounded25" v-model="profile.about"></el-input>
      </el-form-item>
    </div>

    <div class="shadow-md-25 rounded25 p-md-4 mb-4" v-if="profile.role === null || profile.role === 'guide'">
      <div class="card-title mb-0">Лицензия гида</div>
      <div class="card-title-small mb-3">Если у Вас есть лицензия, обязательно покажите ее, это повысит уровень доверия к Вам</div>
      <el-form-item class="mb-0">
        <uploader :files="profile.user_license" url="/profile/upload" @change="onChangeLicense" />
      </el-form-item>
    </div>

    <el-divider class="d-md-none"></el-divider>

    <el-form-item class="text-center">
      <el-button type="primary" icon="el-icon-check" native-type="submit" @click.prevent="saveProfile('profileForm')">Сохранить профиль</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
    import Avatar from "@/components/Uploaders/Avatar";
    import Uploader from '@/components/Uploaders/Multi';

    export default {
        middleware: ['auth'],

        components: {
            Uploader,
            Avatar
        },

        async asyncData ({ store }) {
            return store.$axios.get('/profile').then( ({ data }) => {
                if(data.data.user_contact.length < 1) data.data.user_contact.push({ type: 1, text: ''});
                return {
                    profile: data.data
                };
            })
        },

        data() {
            return {
                loading: true,
                citySearch: [],
                citySearchLoading: true,

                rules: {
                    name: [
                        { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
                        { min: 6, max: 40, message: 'Минимум 6 букв и максимум 40', trigger: ['blur', 'change'] }
                    ],
                    user_language: [
                        { type: 'array', required: true, message: 'Необходимо выбрать хотя бы один язык', trigger: ['blur', 'change'] }
                    ],
                    user_city_ids: [
                        { type: 'array', required: true, message: 'Необходимо выбрать хотя бы один город', trigger: ['blur', 'change'] }
                    ],
                    user_service: [
                        { type: 'array', required: true, message: 'Необходимо выбрать хотя бы одну услугу из списка', trigger: ['blur', 'change'] }
                    ],
                    about: [
                        { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
                        { min: 50, max: 2500, message: 'Минимум 50 букв и максимум 2500', trigger: ['blur', 'change'] }
                    ]
                },

                rulesTourist: {
                    name: [
                        { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
                        { min: 6, max: 40, message: 'Минимум 6 букв и максимум 40', trigger: ['blur', 'change'] }
                    ],
                }
            }
        },

        mounted() {
            this.citySearch = this.profile.user_city;
            this.citySearchLoading = false
        },

        methods: {
            changeAvatar(url) {
                this.profile.avatar = url;
                this.$auth.fetchUser();
            },
            /**
             * Search city
             *
             * @param query
             */
            remoteSearch(query) {
                this.citySearchLoading = true;

                clearTimeout(window.timer);

                window.timer = window.setTimeout(() => {
                    this.$axios.$get('/search/city', { params: { query: query, sel: this.profile.user_city_ids } })
                        .then(({ data }) => {
                            this.citySearch = data;
                            this.citySearchLoading = false
                        });
                }, 1000);
            },

            onChangeLicense(arr) {
                this.profile.user_license = arr
            },


            pushContact() {
                if( this.profile.user_contact.length > 4 ) {
                    this.$store.dispatch('validation/setErrors', {userContact: 'Максимум 5 контактов'});
                    return false
                }
                this.profile.user_contact.push({ type: 1, text: '' })
            },
            deleteContact(index) {
                this.profile.user_contact = this.profile.user_contact.filter( (x,i) => i !== index);
                this.$store.dispatch('validation/clearErrors')
            },

            /**
             * Save and validate user profile form
             *
             * @param formName
             */
            saveProfile(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/profile', this.profile).then( ({ data }) => {
                            this.$notify({ title: 'Отлично!', message: 'Профиль успешно сохранен!', type: 'success', duration: 5000 });
                            this.$auth.fetchUser()
                        }).catch(() => {
                            this.$notify({ title: 'Ошибка!', message: 'Что то пошло не так', type: 'error', duration: 5000 });
                        })
                    } else {
                        this.$notify({ title: 'Ошибка!', message: 'Не правильно заполнены поля!', type: 'error', duration: 5000 });
                        return false;
                    }
                });
            }
        },

    }
</script>

<style scoped lang="sass">
  .profile-contacts
    &__type
      flex: 0 0 7.5rem
      max-width: 7.5rem

</style>
