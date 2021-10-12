<template>
  <div class="container wrapper"> 
    <div class="sidebar">
      <div class="options-tariffs">
        <h1>Опции тарифа</h1>
      </div>
      <div class="options-companies">
        <h1>Авиакомпании</h1>
        <div class="checkboxes">
          <input type="checkbox" id="all" :checked="getOption('allAirlines')" @input="showAllAirlines"/>
<label for="all" v-text="'Все'"/>
        </div>
            <div class="checkboxes" v-for="(checkbox, index) in getAirlineList" :key="index">
          <input type="checkbox" :id="'airline'+ index" :checked="getAirlineOption(checkbox.airline_code)" @input="showAirline(checkbox.airline_code)">
          <label :for="'airline'+index" v-text="checkbox.airline_name" />
        </div>
      </div>
    </div>
    <div class="flights">
      <!-- <div class="flight"  v-for="(flight, i) in flights" :key="i" >
        <div   v-for="(card, i) in flight.itineraries" :key="i">
           <card  v-for="(item, i) in card " :card="item" :key="i">
   
              </card></div>
             
</div> -->
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
      showAirline: 'showAirline'
    })
  }


}
</script>

<style>
/* 
// .sidebar{
//   width: 240px;
//   margin-right: 20px;
// }
// .options-tariffs{
//   background: #F5F5F5;
// border-radius: 4px;
// padding: 12px;
// margin-bottom: 12px;
// }
// .options-companies{
//   background: #F5F5F5;
// border-radius: 4px;
// padding: 12px;
// }
// h1{
//   font-style: normal;
// font-weight: bold;
// font-size: 14px;
// line-height: 20px;
// color: #202123;
// margin-bottom: 22px;
// }
// .flights{
//   display: flex;
//   flex-direction: column;
// } */
</style>
