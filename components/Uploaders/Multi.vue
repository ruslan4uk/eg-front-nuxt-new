<template>
  <div>
    <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple :file-list="fileList">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}" class="w-100 h-100">
<!--        <img class="" src="file.url" alt="">-->
        <el-image :src="file.url" fit="cover" class="w-100 h-100"></el-image>
        <span class="el-upload-list__item-actions">
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <el-divider></el-divider>
    {{ fileList }}
  </div>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [],
                disabled: false
            };
        },
        methods: {
            handleRemove(file) {
                console.log(file);
            },
            handleDownload(file) {
                console.log(file);
            }
        }
    }
</script>
