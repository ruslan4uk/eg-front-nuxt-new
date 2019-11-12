<template>
  <div class="d-flex flex-md-column">
    <el-upload
      v-loading.lock="loadingAvatarUpload"
      :headers="$axios.defaults.headers.common"
      :action="$axios.defaults.baseURL + uploadUrl"
      :on-success="onSuccessAvatarUpload"
      :on-error="onErrorAvatarUpload"
      :before-upload="beforeAvatarUpload"
      :show-file-list="false"
      class="avatar-uploader rounded25 position-relative mb-4 mb-md-0"
      name="userAvatar"
      v-model="image">
      <img v-if="image" :src="image" :class="'avatar' + (border ? ' el-avatar--circle' : ' avatar--bordered')">
      <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" :class="'avatar' + (border ? ' el-avatar--circle' : 'avatar--bordered')"/>
      <div :class="'position-absolute avatar-uploader-icon' + (border ? ' el-avatar--circle' : ' avatar--bordered')">
        <i class="el-icon-upload"></i>
      </div>
    </el-upload>
    <div class="text-danger text-center avatar-uploader-error" v-if="errors.comAvatar">{{ errors.comAvatar }}</div>
  </div>
</template>

<script>
export default {
    props: ['avatar', 'circle', 'url'],

    data() {
        return {
            image: this.avatar || '',
            loadingAvatarUpload: false,
            border: this.circle || false,
            uploadUrl: this.url || '',
        }
    },

    methods: {
        onSuccessAvatarUpload(response, file, fileList) {
            this.loadingAvatarUpload = false;
            this.image = response.data;
            this.$emit('change', response.data);
        },
        onErrorAvatarUpload() {
            this.loadingAvatarUpload = false;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt10M = file.size / 1024 / 1024 < 11;

            if (!isJPG) {
                this.$store.dispatch('validation/setErrors', {comAvatar: 'Изображение должно быть формата JPG или PNG!'} );
            } else if (!isLt10M) {
                this.$store.dispatch('validation/setErrors', {comAvatar: 'Изображение не должно превышать 10мб!'} );
            }
            if(isJPG && isLt10M) this.loadingAvatarUpload = true;
            return isJPG && isLt10M;
        },
    }
}
</script>

<style lang="sass">

// Avatar uploader
.avatar-uploader
  line-height: 0
  width: 180px
  max-width: 100%
  & img
    width: 100% !important
.avatar-uploader .el-upload
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden
  border: 0
  width: 100% !important
.avatar-uploader-error
  position: absolute
  bottom: -3rem
  padding: 0.5rem
  font-size: 0.675rem
  background-color: #ffffff

.avatar-uploader .el-upload:hover
  border-color: #409EFF

.avatar-uploader-icon
  font-size: 1.75rem
  z-index: 2
  width: 3.5rem
  height: 3.5rem
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(0,0,0,.5)
  color: #EEEEEE
  bottom: 0.5rem
  left: 50%
  transform: translateX(-50%)
  transition: all ease 0.4s
.avatar--bordered
  border-radius: 10px

.avatar-uploader
  &:hover .avatar-uploader-icon
    width: 100%
    height: 100%
    bottom: 0
    font-size: 3.5rem

.avatar
  width: 180px
  max-width: 100%
  display: block

</style>
