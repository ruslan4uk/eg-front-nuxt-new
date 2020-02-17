<template>
  <div class="shadow-md-25 rounded25 p-md-4 mb-4">
    <div class="card-title mb-4">Избранное</div>

    <b-row>

      <b-col cols="12">
        <el-alert
          v-if="favorites.length === 0"
          :closable="false"
          show-icon
          title="Список избранного пустой!"
          type="info"
          class="mb-4">
        </el-alert>
      </b-col>

      <b-col cols="6" md="4" lg="3" v-if="favorites" v-for="(favorite, index) in favorites" :key="index" class="mb-4">
        <div class="favorite-item position-relative">
          <favorite type="tour" :id="favorite.id" @delete="handleDeleteFavorite"></favorite>
          <nuxt-link :to="{ name: 'excursion-id', params: { id: favorite.id } }" class="favorite-item__item">
            <div class="favorite-item__image">
              <el-image :src="favorite.avatar" lazy class="w-100">
                <template slot="placeholder">
                  <div class="d-flex justify-content-center image-loading w-100"></div>
                </template>
              </el-image>
            </div>

            <div class="favorite-item__title">{{ favorite.name }}</div>
          </nuxt-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Favorite from '@/components/Favorite'

  export default {
    components: {
      Favorite
    },

    asyncData({query, params, store}) {
      return store.$axios.get('/profile/favorite/list').then(({data}) => {
        return { favorites: data.data.reverse() }
      })
    },

    methods: {
      handleDeleteFavorite(favorite_id) {
        this.favorites = this.favorites.filter(x => x.id !== favorite_id)
      }
    }
  }
</script>

<style lang="sass">
.favorite-item
  &__item, &__item:hover
    font-size: 0.875rem
    color: #405089
</style>
