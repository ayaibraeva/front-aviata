<template>
  <div class="container wrapper"> 
    <div class="sidebar">
      <div class="options-tariffs">
        <h1>Опции тарифа</h1>
      </div>
      <div class="options-companies">
        <h1>Авиакомпании</h1>
        <div class="checkboxes">
          <input type="checkbox">

        </div>
       {{getAirlineList}}
      </div>
    </div>
    <div class="flights">
      <!-- <div class="flight"  v-for="(flight, i) in flights" :key="i" >
        <div   v-for="(card, i) in flight.itineraries" :key="i">
           <card  v-for="(item, i) in card " :card="item" :key="i">
   
              </card></div>
             
</div> -->

    
    </div>
  
    
  </div>

</template>

<script>



import {mapGetters} from 'vuex'
export default {

  name: 'Main',
 
  data(){
    return{
      
 
    
    
    }
  },
  computed: {
    ...mapGetters({
        getAirlineList:'getAirlineList'
    })
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
