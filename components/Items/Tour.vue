<template>
  <nuxt-link :to="{ name: 'index' }" class="tour-card d-block" :alt="item.name">
    <div class="tour-card__image">
      <el-image :src="item.avatar" class="tour-profile-list__avatar" lazy>
        <template slot="placeholder">
          <div class="d-flex justify-content-center image-loading w-100">
            <i class="el-icon-loading"></i>
          </div>
        </template>
      </el-image>
    </div>

    <div class="tour-card__content p-3">
      <div @click="$router.push({ name: 'i-id', params: { id: item.user.id } })" class="tour-card__guide mb-2 d-flex align-items-center d-block" v-if="$route.name !== 'i-id'">
        <el-avatar :size="40" :src="item.user.avatar" >
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <div class="tour-card__username ml-2">{{ item.user.name }}</div>
      </div>
      <div class="tour-card__title mb-2">{{ item.name | truncate(40) }}</div>

      <p class="tour-card__about mb-2">{{ item.about | truncate(70) }}</p>

      <el-tooltip effect="dark" content="Маршрут экскурсии" placement="top-start">
        <div>
          <p class="tour-card__route mb-2" v-if="item.tour_route"><i class="el-icon-guide mr-2"></i>{{ item.tour_route }}</p>
        </div>
      </el-tooltip>

      <div class="d-flex justify-content-between align-items-center">
        <div class="tour-card__price">
          <el-tooltip effect="dark" content="Стоимость экскурсии" placement="top-start">
            <div>
              {{ item.currency_id === 1 ? '₽' : '' }} {{ item.currency_id === 2 ? '$' : '' }} {{ item.currency_id === 3 ? '€' : '' }}
              {{ item.price }}
              <span v-for="i in item.tour_price_type">
                / {{ i.name }}
              </span>
            </div>
          </el-tooltip>

        </div>
        <div class="tour-card__timing">
          <el-tooltip effect="dark" content="Длительность экскурсии" placement="top-end">
            <div>
              <i class="el-icon-alarm-clock"></i>
              <span v-for="i in item.tour_timing">{{ i.name }}</span>
            </div>
          </el-tooltip>

        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
      props: ['item'],

      filters: {
          truncate(string, value) {
              let truncate = (string || '').substring(0, value);

              if( string && truncate ) {
                  if( string.length > truncate.length ) return truncate + '…'
              }
              return truncate;
          }
      }
  }
</script>

<style scoped lang="sass">

</style>
