<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="4" lg="3">

      </b-col>

      <b-col cols="12" md="8" lg="9">
        <el-form>
          <div class="shadow-md-25 rounded25 p-md-4 mb-4">
            <div class="card-title mb-4">Основная информация</div>

              <b-row>
                <b-col cols="12" md="4" lg="3">
                  <el-upload
                    class="avatar-uploader rounded25 mb-4 text-center text-md-left"
                    :action="$axios.defaults.baseURL + '/profile/upload-avatar'"
                    :show-file-list="false"
                    v-model="profile.avatar">
                    <img v-if="profile.avatar" :src="profile.avatar" class="avatar rounded25">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </b-col>

                <b-col cols="12" md="8" lg="9">
                  <div class="card-subtitle mb-1">Ваше имя или название компании</div>
                  <el-form-item>
                    <el-input v-model="profile.name" placeholder="Ваше имя или название компании"></el-input>
                  </el-form-item>

                  <div class="card-subtitle mb-1">Владение языками</div>
                  <el-form-item>
                    <el-select v-model="profile.user_language" multiple placeholder="Выберите языки" class="w-100">
                      <el-option v-for="item in initLanguage" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>

                  <div class="card-subtitle mb-1">Ваше местоположение</div>
                  <el-form-item class="w-100 mb-3">
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

                </b-col>
              </b-row>
          </div>

          <div class="shadow-md-25 rounded25 p-md-4 mb-4">
            <div class="card-title mb-4">Услуги</div>
            <el-form-item class="mb-0">
              <el-checkbox-group v-model="profile.user_service" class="d-flex flex-wrap">
                <el-checkbox v-for="service in initService" :key="service.id" :label="service.id">{{ service.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <div class="shadow-md-25 rounded25 p-md-4 mb-4">
            <div class="card-title mb-0">Расскажите туристам о себе</div>
            <div class="card-title-small mb-3">не использовать тексты с других сайтов. Проверить уникальность текста <a href="http://text.ru" target="_blank">text.ru</a></div>
            <el-form-item class="mb-0">
              <el-input type="textarea" :rows="10" class="w-100 rounded25" v-model="profile.about"></el-input>
            </el-form-item>
          </div>

          <div class="shadow-md-25 rounded25 p-md-4 mb-4">
            <div class="card-title mb-0">Лицензия гида</div>
            <div class="card-title-small mb-3">Если у Вас есть лицензия, обязательно покажите ее, это повысит уровень доверия к Вам</div>
            <el-form-item>
              <uploader />
            </el-form-item>
          </div>
        </el-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Uploader from '@/components/Uploaders/Multi';

export default {
    middleware: ['auth'],

    components: {
        Uploader
    },

    async asyncData ({ store }) {
        return store.$axios.get('/profile').then( ({ data }) => {
            return { profile: data.data };
        })
    },

    data() {
        return {
            citySearch: [],
            citySearchLoading: true,
        }
    },

    mounted() {
        this.citySearch = this.profile.user_city;
        this.citySearchLoading = false
    },

    methods: {
        remoteSearch(query) {
            this.citySearchLoading = true;

            clearTimeout(window.timer);

            window.timer = window.setTimeout(() => {
                this.$axios.$get('/search/city', { params: { query: query, sel: this.profile.user_city_ids } })
                    .then(({ data }) => {
                        console.log(data);
                        this.citySearch = data;
                        this.citySearchLoading = false
                    });
            }, 1000);
        },

        handlePreview() {

        },

        handleRemove() {

        }
    },

}
</script>

<style scoped lang="sass">
.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden

.avatar-uploader .el-upload:hover
  border-color: #409EFF

.avatar-uploader-icon
  font-size: 28px
  color: #8c939d
  width: 178px
  height: 178px
  line-height: 178px
  text-align: center

.avatar
  width: 178px
  height: 178px
  display: block

</style>
