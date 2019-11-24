<template>
  <div class="catalog-filter-block position-fixed bg--white w-100">
    <b-container>
      <b-row>
        <b-col cols="12">
          <div class="navbar-catalog d-flex align-items-center">
            <ul class="navbar-catalog__list">
              <li class="navbar-catalog__item">
                <nuxtLink
                  :to="{ name: 'country-country-city-city-excursion', params: { country: $route.params.country, city: $route.params.city } }">
                  Экскурсии
                </nuxtLink>
              </li>
              <li class="navbar-catalog__item">
                <nuxtLink
                  :to="{ name: 'country-country-city-city-guides', params: { country: $route.params.country, city: $route.params.city } }">
                  Гиды
                </nuxtLink>
              </li>
            </ul>

            <div :class="'ml-auto navbar-catalog__open-filter' + (filterIsOpen ? ' active' : '')"
                 v-if="$route.name === 'country-country-city-city-excursion'"
                 @click="filterIsOpen = !filterIsOpen">
              <i class="el-icon-s-operation"></i> Фильтр <span v-if="categoryIds.length > 0"> &nbsp;({{ categoryIds.length }})</span>
            </div>
          </div>

          <div class="filter-catalog mt-4" v-if="filterIsOpen && $route.name === 'country-country-city-city-excursion'">
            <b-row>
              <b-col cols="12" md="4" lg="3" class="filter-catalog__item" v-for="(category, index) in initCategory" :key="index">
                <a href="" class="" @click.prevent="handleChangeCategory(category.id)"
                   :class="categoryIds.find(x => x === category.id) ? 'active' : ''">{{ category.name }}</a>
              </b-col>
              <b-col cols="12" class="mt-4">
                <a href="" @click.prevent="clearCategory" class="filter-catalog__clear">Очистить</a>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                filterIsOpen: false,
                categoryIds: this.$route.query.catalogCategory ? JSON.parse(this.$route.query.catalogCategory) : [],
            }
        },

        queryWatch: ['catalogCategory'],

        methods: {
            handleChangeCategory(val) {
                if(this.categoryIds.find(x => x === val)) {
                    this.categoryIds.splice(this.categoryIds.findIndex(x => x === val), 1)
                } else {
                    this.categoryIds.push(val);
                }
                this.$emit('change', this.categoryIds);
            },

            clearCategory() {
                this.categoryIds = [];
                this.filterIsOpen = false;
                this.$emit('change', this.categoryIds);
            }
        },

    }
</script>

<style scoped lang="sass">
  .catalog-filter-block
    background-color: #ffffff
    margin-top: -2rem
    border-bottom: 1px solid #DCDFE6
    margin-bottom: 2rem
    top: 7.25rem
    z-index: 2
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .05)

    .navbar-catalog
      &__list
        display: flex
        flex-wrap: wrap
        list-style: none
        margin: 0
        padding: 0

      &__item a
        display: block
        padding: 1rem 0
        margin-right: 2rem
        font-size: 1rem
        font-weight: 500
        color: #444444
        border-bottom: 1px solid transparent
        text-decoration: none
        transition: all ease 0.2s

        &.active, &:hover
          color: #ff7555
          border-bottom: 1px solid #ff7555

      &__open-filter
        cursor: pointer
        transition: all ease 0.25s
        display: flex
        align-items: center
        margin-top: 1px

        & i
          font-size: 1.5rem
          margin-right: 0.5rem
        & span
          color: #ff7555

        &:hover, &.active
          color: #ff7555

    .filter-catalog
      padding-bottom: 1.5rem
      max-height: 60vh
      overflow: auto
      overflow-x: hidden

      &__list
        display: flex
        flex-wrap: wrap

      &__item
        margin-right: 3rem

        & a
          text-decoration: none
          color: #444444
          transition: all ease 0.2s

          &.active, &:hover
            color: #ff7555

      &__clear
        font-size: 1rem
        color: #777777
        font-weight: 500
        text-decoration: none

</style>
