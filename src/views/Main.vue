<template>
  <div class="container wrapper"> 
    <div class="sidebar">
      <div class="options-tariffs">
        <h1>Опции тарифа</h1>
        <div class="checkboxes">
          <input type="checkbox" id="withBaggage" :checked="getOption('withBaggage')" @input="showWithBaggage"/>
          <label for="withBaggage" v-text="'Только с багажом'"/>
          <input type="checkbox" id="directFlight" :checked="getOption('directFlight')" @input="showDirectFlights"/>
          <label for="directFlight" v-text="'Только прямые'"/>
          <input type="checkbox" id="refundableTicket" :checked="getOption('refundableTicket')" @input="showRefundableTickets"/>
          <label for="refundableTicket" v-text="'Только возвратные'"/>
        </div>
      </div>
      <div class="options-companies">
        <h1>Авиакомпании</h1>
        <div class="checkboxes">
          <input type="checkbox" id="all" :checked="getOption('selectAllAirlines')" @input="showAllAirlines"/>
<label for="all" v-text="'Все'"/>
        </div>
            <div class="checkboxes" v-for="(checkbox, index) in getAirlineList" :key="index">
          <input type="checkbox" :id="'airline'+ index" :checked="getAirlineOption(checkbox.airline_code)" @input="showAirline(checkbox.airline_code)">
          <label :for="'airline'+index" v-text="checkbox.airline_name" />
        </div>
      </div>
    </div>
    <div class="flights">
        {{getFlights}}
    </div>
  </div>

</template>

<script>



import {mapGetters, mapActions} from 'vuex'
export default {

  name: 'Main',
 
  data(){
    return{
      

    }
  },
  computed: {
    ...mapGetters({
      getFlights: 'getFlights',
        getAirlineList:'getAirlineList',
        getAirlineOption: 'getAirlineOption',
        getOption: 'getOption'
    })
  },
  methods:{
    ...mapActions({
      showAllAirlines: 'showAllAirlines',
      showAirline: 'showAirline',
      showDirectFlights: 'showDirectFlights',
      showWithBaggage: 'showWithBaggage',
      showRefundableTickets: 'showRefundableTickets'
    }),
  }


}
</script>

<style lang="scss" scoped>

.sidebar{
  width: 240px;
 margin-right: 20px;
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

</style>
