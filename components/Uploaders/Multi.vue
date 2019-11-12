<template>
  <div>
    <el-upload
      :action="$axios.defaults.baseURL + url"
      :headers="$axios.defaults.headers.common"
      multiple
      accept="image"
      :auto-upload="true"
      :on-success="onSuccessLicenseUpload"
      :before-upload="beforeLicenseUpload"
      :show-file-list="false"
      class="multi-uploader w-100 mb-3">
      <el-button type="primary" class="w-100"><i class="el-icon-upload"></i> Загрузить</el-button>
    </el-upload>

    <el-alert
      v-if="errors.multiUpload"
      :title="errors.multiUpload"
      type="error"
      class="mb-3">
    </el-alert>

    <b-row class="m-0" v-loading="loading">
      <b-col cols="6" md="4" lg="3" class="p-1" v-if="fileList.length > 0" v-for="(image,index) in fileList" :key="index">
        <div class="multi-uploader__list position-relative">
          <el-image fit="cover" :src="image.image_crop"></el-image>
          <div class="multi-uploader__overlay">
            <i class="el-icon-delete" @click="handleRemove(image)"></i>
          </div>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
    props: ['files', 'url'],
    data() {
        return {
            fileList: this.files || [],
            disabled: false,
            loading: false,
        };
    },
    methods: {
        handleRemove(file) {
            this.$confirm('Уверены, что хотите удалить изображение?', 'Внимание!', {
                confirmButtonText: 'Да',
                cancelButtonText: 'Отмена',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.url + '/delete', { id: file.id }).then( ({ data }) =>{
                    this.fileList = this.fileList.filter(x => x.id !== file.id);
                    this.$emit('change', this.fileList);
                });
            }).catch(() => {});
        },

        beforeLicenseUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt10M = file.size / 1024 / 1024 < 11;

            if (!isJPG) {
                this.$store.dispatch('validation/setErrors', {multiUpload: 'Изображение должно быть формата JPG или PNG!'} );
            } else if (!isLt10M) {
                this.$store.dispatch('validation/setErrors', {multiUpload: 'Изображение не должно превышать 10мб!'} );
            } else if (this.fileList.length > 5) {
                this.$store.dispatch('validation/setErrors', {multiUpload: 'Максимальное колличество фото - 6 штук'} );
            }
            if(isJPG && isLt10M && !this.fileList.length < 7) this.loading = true;
            return isJPG && isLt10M && this.fileList.length < 7;
        },
        onSuccessLicenseUpload(response, file, fileList) {
            this.fileList.push(response.data);
            this.$emit('change', this.fileList);
            this.loading = false
        },
    }
}
</script>

<style scoped lang="sass">
.multi-uploader
  &__list
    line-height: 0
  &__overlay
    position: absolute
    top: 0
    display: flex
    justify-content: center
    align-items: center
    font-size: 1.5rem
    color: #ffffff
    background-color: rgba(0,0,0,.5)
    width: 100%
    height: 100%
    opacity: 0
    transition: all ease 0.3s
    & i
      cursor: pointer
  &__list:hover &__overlay
    opacity: 1

</style>
