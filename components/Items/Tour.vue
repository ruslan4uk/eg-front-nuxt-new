<template>
  <div class="tour-card d-block position-relative" :alt="item.name">
    <favorite type="tour" :id="item.id"></favorite>
    <nuxt-link :to="{ name: 'excursion-id', params: { id: item.id } }">
      <div class="tour-card__image">

        <el-image :src="item.avatar" class="tour-profile-list__avatar" lazy>
          <template slot="placeholder">
            <div class="d-flex justify-content-center image-loading w-100"></div>
          </template>
        </el-image>
      </div>
    </nuxt-link>

    <div class="tour-card__content pt-3 p-md-3">

      <nuxt-link :to="{ name: 'i-id-excursion', params: { id: item.user.id } }"
                 class="tour-card__guide mb-2 d-flex align-items-center"
                 v-if="$route.name !== 'i-id-excursion'">
        <el-avatar :size="40" :src="item.user.avatar">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <div class="tour-card__username ml-2">{{ item.user.name }}</div>
      </nuxt-link>

      <nuxt-link :to="{ name: 'excursion-id', params: { id: item.id } }">
        <div class="tour-card__title mb-2">{{ item.name | truncate(60) }}</div>
        <p class="tour-card__about mb-2">{{ item.about | truncate(70) }}</p>
        <p class="tour-card__route mb-2" v-if="item.tour_route"><i class="el-icon-guide mr-2"></i>{{ item.tour_route }}
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <div class="tour-card__price">
            {{ item.currency_id === 1 ? '₽' : '' }} {{ item.currency_id === 2 ? '$' : '' }} {{ item.currency_id === 3 ?
            '€' : '' }}
            {{ item.price }}
            <span v-for="i in item.tour_price_type">
              / {{ i.name }}
            </span>
          </div>
          <div class="tour-card__timing">
            <i class="el-icon-alarm-clock"></i>
            <span v-for="i in item.tour_timing">{{ i.name }}</span>
          </div>
        </div>
      </nuxt-link>

    </div>
  </div>
</template>

<script>
    import Favorite from '@/components/Favorite.vue'
    export default {
        props: ['item'],

        components: {
            Favorite
        },

        filters: {
            truncate(string, value) {
                const truncate = (string || '').substring(0, value);

                if (string && truncate) {
                    if (string.length > truncate.length) return truncate + '…'
                }

                return truncate;
            }
        }
    }
</script>

<style scoped lang="sass">
  .tour-card
    border-radius: 6px
    overflow: hidden
    transition: all ease 0.25s

    &:hover
      text-decoration: none
      @media screen and (min-width: 768px)
        box-shadow: 0 4px 10px 8px rgba(0, 0, 0, .05)

    & a:hover
      text-decoration: none

    &__image
      line-height: 0
      overflow: hidden
      display: flex
      align-items: center
      height: 16rem
      @media screen and (min-width: 768px)
        height: 14rem

      & > div, & img
        width: 100%

    &__content
      width: 100%

    &__title
      font-size: 1.063rem
      line-height: 1.3
      color: #000000
      font-weight: 700

    &__guide
      text-decoration: none

    &__username
      color: #585f76
      font-weight: 500
      font-size: 0.825rem

    &__about
      color: #555555
      font-size: 0.875rem
      line-height: 1.3

    &__route
      color: #999999
      font-size: 0.875rem
      line-height: 1.3

      & i
        font-size: 1rem

    &__price
      font-weight: 700
      font-size: 1.25rem
      color: #000000

      & span
        color: #999999
        font-weight: normal
        font-size: 0.825rem

    &__timing
      font-size: 0.825rem
      color: #444444

      & i
        font-size: 1rem

</style>
