<template>
  <div class="shadow-md-25 rounded25 p-md-4 mb-4">
    <div class="card-title mb-4">Список ваших экскурсий</div>

    <b-row>
      <b-col cols="12">
        <el-alert
          v-if="tours.length === 0"
          :closable="false"
          show-icon
          title="Вы не создали ни одного тура!"
          type="info"
          class="mb-4">
        </el-alert>
      </b-col>

      <b-col cols="12" v-if="tours.length > 0">
        <div class="tour-profile-list border rounded25 p-3 mb-4" v-for="(item, index) in tours" :key="index">
          <b-row>
            <b-col cols="12" md="4" lg="3" class="mb-4 mb-md-0">
              <nuxt-link :to="{ name: 'profile-index-tours-id', params: { id: item.id }}">
                <el-image :src="item.avatar" class="tour-profile-list__avatar"></el-image>
              </nuxt-link>
            </b-col>
            <b-col cols="12" md="8" lg="9" class="position-relative">

              <div class="tour-profile-list__dots position-absolute d-none d-md-block">
                <el-dropdown trigger="click" class="navigation-user">
                  <span class="el-dropdown-link d-flex align-items-center">
                    <i class="el-icon-more tour-profile-list__dots-icon"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="dropdown-item--custom" @click.native="$router.push({ name: 'profile-index-tours-id', params: { id: item.id }})">Редактировать</el-dropdown-item>
                    <el-dropdown-item class="dropdown-item--custom" @click.native="deleteTour(item,index)">Удалить</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <nuxt-link :to="{ name: 'profile-index-tours-id', params: { id: item.id }}" class="tour-profile-list__list">{{ item.name }}</nuxt-link>
              <p class="mb-1 mt-2 tour-profile-list__p">Город: <span v-for="(city,index) in item.tour_city_new">{{ city.name }}, {{ city.city_country }}</span></p>
              <p class="mb-1 tour-profile-list__p">Катагория экскурсии: <span>{{ initCategory.find(x => x.id === item.category_id).name }}</span></p>
              <p class="mb-3 tour-profile-list__p">
                Цена: <span>{{ item.price }}, {{ initCurrency.find(x => x.id === item.currency_id).name }}
                      &nbsp;/&nbsp;{{ initPriceType.find(x => x.id === item.price_type_id).name }}</span>
              </p>

              <el-alert title="Активна" type="success" :closable="false" v-if="item.active === 2"></el-alert>
              <el-alert title="На модерации" type="warning" :closable="false" v-else-if="item.active === 1"></el-alert>
              <el-alert title="Ошибка" type="error" :closable="false" v-else></el-alert>

              <div class="d-flex mt-4 d-md-none">
                <el-button class="w-100" type="primary" size="small">Редактировать</el-button>
                <el-button class="w-100" type="error" size="small">Удалить</el-button>
              </div>
            </b-col>
          </b-row>
        </div>

      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
    middleware: ['auth'],

    asyncData( { store, route } ) {
        return store.$axios.get('/profile/tours').then( ({ data }) => {
            return { tours: data.data }
        })
    },

    methods: {
        deleteTour(item, index) {
            this.$confirm('Уверены, что хотите удалить экскурсию?', 'Внимание!', {
                confirmButtonText: 'Да',
                cancelButtonText: 'Отмена',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/profile/tours/${item.id}`).then( ({ data }) =>{
                    this.tours = this.tours.filter(x => x.id !== item.id);
                });
            }).catch(() => {});

        },


    },

}
</script>

<style scoped lang="sass">
.tour-profile-list
  transition: all ease 0.25s
  &:hover
    box-shadow: 0 5px 8px 2px rgba(0,0,0,.05)
  &__list
    color: #405089
    text-decoration: none
    font-weight: 500
  &__p
    font-size: 0.875rem
    font-weight: 500
    & span
      color: #777777
      font-weight: 400

  &__dots
    top: 0
    right: 0.5rem
    z-index: 3
    &-icon
      font-size: 1.25rem
      cursor: pointer
      transform: rotate(90deg)

  &__avatar
    max-height: 14rem
    display: flex
    align-items: center

.dropdown-item
  &--custom
    font-size: 0.825rem
    line-height: 1.2
    padding: 0.5rem 0.75rem
    height: auto
</style>
