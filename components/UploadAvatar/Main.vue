<template>
  <div class="component-avatar-uploader">
    <div :class="circle ? 'component-avatar-uploader__wrap component-avatar-uploader__wrap--circle' : 'component-avatar-uploader__wrap'">
      <img src="~assets/images/empty.jpg" v-if="!image">
      <img :src="image" alt="" v-if="image">
      <!--  Overflow  -->
      <div class="component-avatar-overflow" @click="openModal">
        <i class="el-icon-upload"></i>
      </div>
    </div>


    <div class="component-avatar-crop-modal" v-if="isOpenModal">
      <div class="component-avatar-crop-modal__over" @click="closeModal"></div>
      <div class="component-avatar-crop-modal__wrap">
        <div class="component-avatar-crop-modal__header">
          Изменить аватар
          <span class="component-avatar-crop-modal__close" @click="closeModal">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div class="component-avatar-crop-modal__body">
          <div class="component-avatar-crop-modal__empty text-center" v-if="!isCropperActive">
            <p class="mb-4">
              Пожалуйста, загрузите реальную фотографию себя, чтобы туристы могли узнать вас.<br/>
              Мы поддерживаем файлы JPG, GIF или PNG.
            </p>
            <el-button type="primary" icon="el-icon-upload" @click.prevent="handleUploadImage">Выберите фотографию</el-button>
          </div>

          <div :class="isCropperActive ? 'component-avatar-crop-modal__not-empty' : 'd-none'">
            <p class="text-center mb-4">
              Теперь обрежьте изображение, чтобы создать эскиз.<br/>
              Миниатюра появится рядом с вашими сообщениями, личными сообщениями и комментариями.
            </p>
            <div class="d-flex flex-wrap flex-sm-nowrap justify-content-center">
              <vue-cropper
                class="component-avatar-crop-modal__cropper"
                ref="cropper"
                :aspect-ratio="1 / 1"
                accept="image/*"
                :view-mode="3"
                :guides="true"
                drag-mode="crop"
                preview=".crop-preview"
              >
              </vue-cropper>

              <div class="component-avatar-crop-modal__cropper-preview">
                <div class="crop-preview"></div>
                <div class="crop-preview crop-preview--circle"></div>
              </div>
            </div>

            <div class="text-center mt-4">
              <el-button type="primary" icon="el-icon-check" @click.prevent="updateAvatar" :loading="loadingBtn">Сохранить</el-button>
            </div>

          </div>

          <!--  Input hidden  -->
          <input
            id="avatarUpload"
            class="component-avatar-uploader__input"
            type="file"
            accept="image/jpeg,image/png"
            @change="setImage($event)">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import VueCropper from 'vue-cropperjs';
  import 'cropperjs/dist/cropper.css';
  import Compressor from 'compressorjs';


  export default {
    props: ['avatar', 'circle', 'url'],

    components: { VueCropper },

    data() {
      return {
        image: this.avatar || '',
        uploadUrl: this.url || '',

        isOpenModal: false,
        isCropperActive: false,
        cropImg: null,

        validate: '',
        loadingBtn: false
      }
    },

    methods: {
      // Открываем скрытый инпут для выбора файла для загрузки
      handleUploadImage() {
        let input = document.getElementById('avatarUpload');
        input.click()
      },

      // Получаем изображение / дожимаем / кропаем
      setImage(e) {
        const file = e.target.files[0];

        if (file.type.indexOf('image/') === -1) {
          this.validate = 'Файл не является изображением';
          return;
        }

        new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.8,
            maxWidth: 1280,
            maxHeight: 900,
            minWidth: 400,
            minHeight: 400,
            success: resolve,
            error: reject,
          });
        }).then((result) => {
          this.isCropperActive = true;
          this.$refs.cropper.replace(URL.createObjectURL(result));
        }).catch((err) => {
          console.log(err.message)
        });
      },

      updateAvatar() {
        this.loadingBtn = true;

        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {

          const formData = new FormData();
          formData.append('userAvatar', blob);

          this.$axios.post(`${this.url}`, formData).then(({ data }) => {
            this.$emit('change', data.data);
            this.image = data.data;
            this.loadingBtn = false;
            this.isOpenModal = false;
          }).catch(err => {
            this.isOpenModal = false;
            this.isOpenModal = false;
            this.$notify({ title: 'Ошибка!', message: 'Обратитесь в службу поддрежки!', type: 'error', duration: 5000 });
          })
        },'image/png', 0.95);
      },

      openModal() {
        this.isOpenModal = true;
        this.isCropperActive = false;
      },

      closeModal() {
        this.isOpenModal = false;
        this.isCropperActive = false
      },
    },



  }
</script>

<style lang="sass">

</style>
