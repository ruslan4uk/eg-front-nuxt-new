<template>
  <div>
    <section class="about">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" md="10 ">
            <h1 class="about__title mb-4 mb-md-3 text-center">
              Мы вдохновились идеей бесплатного и открытого агрегатора туристических услуг и создали сервис Excursguide.ru !
            </h1>

          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="about-content mt-5">
      <b-container>
        <b-row class="justify-content-center align-items-center">
          <b-col cols="12" md="9" class="mb-5 mb-md-0">
            <div class="h3 mb-2">Вы - турист?</div>
            <p class="about-content__subtitle">Excursguide - социальная сеть сеть для путешественников!</p>
          </b-col>
          <b-col cols="12" md="9">

            <b-row class="align-items-center flex-column-reverse flex-md-row">
              <b-col cols="12" md="8">
                <ol class="about-content__ol">
                  <li>
                    Использование сервиса абсолютно бесплатно.
                    Найти подходящего гида и экскурсию стало легко и просто.
                    <br/>
                    [Введите город путешествия и выберите наиболее привлекательную экскурсию и подходящего гида.]
                  </li>
                  <li>Зарегистрироваться на сайте может любой желающий.</li>
                  <li>Простой и удобный поиск русскоговорящих гидов по всему миру.</li>
                </ol>
              </b-col>

              <b-col cols="7" md="4" class="mb-3">
                <img src="~assets/images/about/t1.png" alt="">
              </b-col>
            </b-row>

            <b-row class="align-items-center">
              <b-col cols="12" md="4" class="d-none d-md-block ">
                <img src="~assets/images/about/t2.png" alt="">
              </b-col>

              <b-col cols="12" md="8">
                <ol class="about-content__ol" start="4">
                  <li>
                    Гиды на сайте - энтузиасты в мире туризма, великолепные рассказчики и потрясающие путеводители.
                  </li>
                  <li>Стань экспертом-путешественником, проставляя оценки гидам и выбирая лучшие экскурсии.</li>
                  <li>Оставляй отзывы и выбирай лучшие по отзывам и рейтингу предложения!</li>
                </ol>
              </b-col>
            </b-row>

          </b-col>

        </b-row>
      </b-container>
    </section>


    <section class="about-content mt-5">
      <b-container>
        <b-row class="justify-content-center align-items-center">
          <b-col cols="12" md="9" class="mb-5 mb-md-0">
            <div class="h3 mb-2">Вы - гид?</div>
            <p class="about-content__subtitle mb-md-5">Excursguide - агрегатор для размещения туристических услуг.</p>
          </b-col>
          <b-col cols="12" md="9">

            <b-row class="align-items-center flex-column-reverse flex-md-row">
              <b-col cols="12" md="8">
                <ol class="about-content__ol">
                  <li>
                    Использование сервиса абсолютно <strong>бесплатно</strong>!
                    (Мы не берем комиссии за бронь экскурсии и плату за размещение. Платите только за продвижение внутри сайта)
                  </li>
                  <li>Зарегистрироваться на сайте может любой желающий. Как частный гид, так и организатор туров.</li>
                  <li><strong>Общение с клиентами</strong> происходит в режиме <strong>он-лайн</strong> в чате на сайте.</li>
                </ol>
              </b-col>

              <b-col cols="8" md="4" class="mb-3">
                <img src="~assets/images/about/g1.png" alt="">
              </b-col>
            </b-row>

            <b-row class="align-items-center">
              <b-col cols="12" md="4" class="d-none d-md-block mb-4">
                <img src="~assets/images/about/g2.png" alt="">
              </b-col>

              <b-col cols="12" md="8">
                <ol class="about-content__ol" start="4">
                  <li>
                    Загружать на сайт разрешено <strong>неограниченное</strong> количество экскурсий.
                    Достаточно выбрать категорию экскурсии, поставить стоимость и
                    фотографию и добавить необходимую информацию на сайт.
                  </li>
                  <li>Контактная информация гида <strong>в открытом доступе</strong>. Клиент может связаться с гидом напрямую.</li>
                </ol>
              </b-col>
              <b-col>
                <ol class="about-content__ol" start="6">
                  <li>Информацию на сайте можно использовать как <strong>визитную карточку гида</strong>.</li>
                  <li>Возможность оплаты через <strong>Безопасную Сделку</strong> на сайте (еще в разработке).</li>
                </ol>
              </b-col>
            </b-row>

          </b-col>
        </b-row>

        <b-row class="justify-content-center mt-5">
          <b-col class="col-auto d-flex flex-wrap">
            <nuxt-link :to="{ name: 'auth-register' }" class="about-content__btn">
              <el-button type="primary" round class="py-3 w-100">Зарегистрироваться</el-button>
            </nuxt-link>
            <nuxt-link :to="{ name: 'auth-login' }" class="about-content__btn">
              <el-button type="primary" round class="py-3 w-100">Войти</el-button>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    layout: 'main'
  }
</script>

<style lang="sass">

</style>
