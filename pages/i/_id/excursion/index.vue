<template>
  <div>
    <div class="h5 mb-3">Экскурсии</div>

    <b-row>
    <b-col cols="12">
        <el-alert
          v-if="userTour.length === 0"
          :closable="false"
          show-icon
          title="У гида еще нет экскурсий!"
          type="info"
          class="">
        </el-alert>
      </b-col>

      <b-col cols="12" v-if="userTour.length > 0">
        <b-row>
          <b-col cols="12" md="6" v-for="(item, index) in userTour" :key="index">
            <tour-item :item="item" class="mb-4"></tour-item>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TourItem from "@/components/Items/Tour";

export default {
    props: ['user'],
    validate ({ params }) {
        return /^\d+$/.test(params.id)  // Must be a number
    },

    head() {
        return {
            title: 'Экскурсии гида ' + this.user.name + ' — Excursguide'
        }
    },

    components: {
        TourItem
    },

    asyncData({ store, route, error }) {
        return store.$axios.get(`/front/user/${route.params.id}/excursions`).then(({ data }) => {
            return { userTour: data.data }
        }).catch((e) => {
            return error({ statusCode: 404 })
        })
    },
}
</script>

<style scoped lang="sass">

</style>
