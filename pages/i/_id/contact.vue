<template>
  <div>
    <div class="h5 mb-3">Контакты</div>

    <div class="mb-4" v-if="user.user_contact && user.user_contact.length > 0">
      <span v-for="(contact, index) in user.user_contact" :key="index" class="pb-1 d-block">
        {{ contact.text }}
        (<span v-for="(contact_type, index) in initContactType" :key="index">{{contact_type.id === contact.type ? contact_type.name : ''}}</span>){{ user.user_contact.length > (index + 1) ? '; ' : '' }}
      </span>
    </div>

    <div class="mb-4" v-if="user.user_city && user.user_city.length > 0">
      <div class="h6">Город проживания</div>
      <span v-for="(city, index) in user.user_city" :key="index" class="d-block my-1">
        <span :class="'mr-1 flag-icon flag-icon-' + city.iso_code.toLowerCase()" v-if="city.iso_code"></span>
        {{ city.name }}, {{ city.city_country.name }}{{ user.user_city.length > (index + 1) ? '; ' : '' }}
      </span>
    </div>

    <div class="mb-4" v-if="user.user_language && user.user_language.length > 0">
      <div class="h6">Знание языков</div>
      <span v-for="(language, index) in user.user_language" :key="index">
        {{ language.name }}{{ user.user_language.length > (index + 1) ? '; ' : '' }}
      </span>
    </div>

    <div class="mb-2" v-if="user.user_service && user.user_service.length > 0">
      <div class="h6">Услуги</div>
      <span v-for="(service, index) in user.user_service" :key="index">
        {{ service.name }}{{ user.user_service.length > (index + 1) ? '; ' : '' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
    props: ['user'],

    head() {
        return {
            title: 'Контакты гида ' + this.user.name + ' — Excursguide'
        }
    },
}
</script>
