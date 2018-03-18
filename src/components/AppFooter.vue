<script>
import axios from 'axios';
import { Carousel, Slide } from 'vue-carousel';

const partnersURL = 'https://convenia-front-end-test.firebaseio.com/partners.json';

export default {
  name: 'app-footer',
  data: function () {
    return { partnerList: [ ] }
  },
  created: function() {
    this.getPartners();
  },
  methods: {
    getPartners: async function() {
      try {
        const response = await axios.get(partnersURL);
        this.partnerList = response.data;
      } catch (err) {
        console.error("Partners API Error: ", err);
      }
    }
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<template lang="html">
  <footer class="app-footer">
    <div class="container-fluid h-100">
      <div class="row align-items-center justify-content-between h-100">

        <!-- partners-container -->
        <div class="partners-container col-12 col-md justify-content-center pb-2 ml-md-4 pl-md-4 pb-md-0">
          <span class="partners-text text-muted text-antialiased">
            Parceiros
          </span>

          <!-- wrapper-partners -->
          <div class="wrapper-partners col-10 col-md">
            <div class="partners col-12 col-lg-8">

              <carousel
                :navigationEnabled="true"
                :paginationEnabled="false"
                :perPageCustom="[[0, 3], [768, 5], [1200, 6], [1650, 9]]"
                navigationPrevLabel='<i class="fa fa-angle-left" />'
                navigationNextLabel='<i class="fa fa-angle-right" />'>
                <slide v-for="(partner, index) in partnerList" :key="index">
                  <img :src="partner.image" :alt="partner.name" class="partner-img">
                </slide>
              </carousel>

            </div>
          </div>

        </div>

        <!-- convenia-brand wrapper -->
        <div class="col-12 col-md-auto d-flex align-items-center justify-content-center mr-md-1">
          <small class="brand-legend text-muted mr-3">desennvolvido por</small>
          <img src="~img/convenia-brand.png" alt="Desennvolvido por Convenia" class="convenia-brand">
        </div>
      </div>

    </div>
  </footer>
</template>

<style lang="scss">
@import '~styles/variables';
@import '~bootstrap/scss/mixins';

//  Variables
//  ---------

$app-footer-bg: #F3F3F4;
$app-footer-height: 78px;

$carousel-nav-size: 25px;

//  Classes
//  -------

.app-footer {
  height: $app-footer-height;
  background-color: $app-footer-bg;

  @include media-breakpoint-down(sm) {
    height: auto;
    padding: 15px 5px;
    min-height: $app-footer-height;
  }

  .partners-container {
    display: flex;
    align-items: center;

    .partners-text {
      font-size: 1.125rem;
      @include media-breakpoint-down(sm) { font-size: .875rem }
    }

    .wrapper-partners { width: 0px; padding: 0 10px; }

    .partners {
      display: flex;
      padding: 0 40px;

      .partner-img {
        max-width: 100%;
        width: 65px;
        @include media-breakpoint-down(sm) { width: 35px; }
      }

      .VueCarousel {
        max-width: 100%;
        flex-basis: 100%;
        flex-shrink: 1;

        .VueCarousel-wrapper { padding: 0 5px; }

        .VueCarousel-navigation .VueCarousel-navigation-button {
          display: flex;
          align-items: center;
          justify-content: center;

          width:  $carousel-nav-size;
          height: $carousel-nav-size;

          border-radius: 50%;
          background-color: #D4D2D2;
          color: #FFFFFF;

          &:first-child .fa { margin-right: 2px; }
          &:last-child .fa { margin-left: 2px; }

          .fa {
            font-size: 1.25rem;
            line-height: $carousel-nav-size;
            -webkit-font-smoothing: initial;
            -moz-osx-font-smoothing: initial;
          }
        }
      }
    }
  }

  .convenia-brand {
    @include media-breakpoint-down(sm) { width: 80px; }
  }
}

</style>
