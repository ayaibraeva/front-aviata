<template>
  <div class="wrapper" :class="{container: !isMobile}"> 
    <div class="sidebar" v-if="showFilter || !isMobile">
      <div v-if="isMobile" class="sidebar__head"> 
        <div @click=" showFilter = !showFilter" class="text"> Закрыть </div>
      </div>
      <div class="options-tariffs">
        <h1>Опции тарифа</h1>
        <div class="checkboxes">
           <input type="checkbox" class="checkbox-custom" id="withBaggage" :checked="getOption('withBaggage')" @input="showWithBaggage"/>
          <label for="withBaggage" v-text="'Только с багажом'"/>
         
        </div>
         <div class="checkboxes">
            <input type="checkbox" class="checkbox-custom" id="directFlight" :checked="getOption('directFlight')" @input="showDirectFlights"/>
          <label for="directFlight" v-text="'Только прямые'"/>
         
         </div>
          <div class="checkboxes">
             <input type="checkbox" class="checkbox-custom" id="refundableTicket" :checked="getOption('refundableTicket')" @input="showRefundableTickets"/>
          <label for="refundableTicket" v-text="'Только возвратные'"/>
       
          </div>
         
      </div>
      <div class="options-companies">
        <h1>Авиакомпании</h1>
        <div class="checkboxes">
          <input type="checkbox" class="checkbox-custom" id="all" :checked="getOption('selectAllAirlines')" @input="showAllAirlines"/>
<label for="all" v-text="'Все'"/>
        </div>
            <div class="checkboxes" v-for="(checkbox, index) in getAirlineList" :key="index">
          <input type="checkbox" :id="'airline'+ index" :checked="getAirlineOption(checkbox.airline_code)" @input="showAirline(checkbox.airline_code)">
          <label :for="'airline'+index" v-text="checkbox.airline_name" />
        </div>
      </div>
      <base-button variant="blue" @onBtnClick="resetOptions()" >Сбросить все фильтры</base-button>
    </div>
    <base-button variant="filter" v-if="isMobile" class="filter-btn" @onBtnClick="showFilter = !showFilter">Фильтры</base-button>
    
    <div class="flights">
       <card v-for="(card, i) in getFlights" :key="i" :card="card"/>
    </div>
  </div>
</template>
<script>

import {mapGetters, mapActions, mapMutations} from 'vuex'
import BaseButton from '../components/BaseButton.vue'
import Card from '../components/Card.vue'

export default {
  components: { Card, BaseButton },

  name: 'Main',
 
  data(){
    return{
      showFilter: false
      

    }
  },
  computed: {
    ...mapGetters({
      getFlights: 'getFlights',
        getAirlineList:'getAirlineList',
        getAirlineOption: 'getAirlineOption',
        getOption: 'getOption',
        isMobile: 'isMobile'
    })
  },
  methods:{
    ...mapMutations({
       setIsMobile: "setIsMobile",
    }),
    ...mapActions({
      showAllAirlines: 'showAllAirlines',
      showAirline: 'showAirline',
      showDirectFlights: 'showDirectFlights',
      showWithBaggage: 'showWithBaggage',
      showRefundableTickets: 'showRefundableTickets',
      resetOptions:'resetOptions'
    }),
    onClick(){
     
    }
  },
  mounted(){
    if (window.screen.width <= 768) {
      this.setIsMobile(true)
    } else {
      this.setIsMobile(false)
    }
  }


}
</script>

<style lang="scss" scoped>


.sidebar{
  width: 240px;
  margin-right: 20px;
  
  @media(max-width: 850px) {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 98;
    margin-bottom: 0;
    background: #F5F5F5;
  }
  &__head{
    padding: 16px;
    border-bottom: 1px solid #202123;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .text{
      font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #202123;

    }
  }
 }
 .options-tariffs{
  background: #F5F5F5;
 border-radius: 4px;
 padding: 12px;
margin-bottom: 12px;
 }
.options-companies{
   background: #F5F5F5;
 border-radius: 4px;
padding: 12px;
margin-bottom: 13px;
 }
 h1{
  font-style: normal;
 font-weight: bold;
 font-size: 14px;
 line-height: 20px;
 color: #202123;
 margin-bottom: 22px;
 }
 .flights {
   display: flex;
   flex-direction: column;
 }
 .filter-btn{
   position: fixed;
   bottom: 16px;
   left: 35%;
   z-index: 1;
 }

label{
  font-weight: normal;
font-size: 12px;
line-height: 16px;

color: #202123;
margin-left: 12px;
}
.checkboxes{
margin-bottom: 10px;
display: flex;
align-items: center;
}

input[type="checkbox" i]{
  background: #FFFFFF;
/* Gray */

border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 2px;
cursor: pointer;

}
input{
  background: #FFFFFF;
/* Gray */

border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 2px;
cursor: pointer;

}
input[type="checkbox" i]:checked{
/* green */

background-color: #55BB06;

border: 1px solid #55BB06;
box-sizing: border-box;
border-radius: 2px;
}

// ::v-deep .btn{
//   &--blue{
//     margin-top: 13px;
//   }
// }
</style>
