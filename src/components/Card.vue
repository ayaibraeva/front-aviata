<template>
<div class="card" >
 
<div class="card__left">
  <div class="card__left-top"> 
    <img class="logo" />
    <div class="info">

      <div class="info__date">
          <p class="date">25 ноя, вс</p>
          <p class="time">23:25</p>  
      </div>
      <div class="info__content">
        <div class="content">
          <p class="code">{{card.segments[1]}}</p>
          <p>4 ч 20 м</p>
         
          <p class="code"> </p>
        </div>
        <div class="timeline">
          <p>через Шымкент, 1 ч 50 м</p>
        </div>
      </div>
         <div class="info__date"> 
          <p class="date">25 ноя, вс</p>
          <p class="time">23:25</p>  
      </div>
      <div>

      </div>
    </div>

  </div>
  <div class="card__left-bottom">
    <BaseButton variant="blue">Детали перелета</BaseButton>
    <BaseButton variant="blue" class="center-btn"> Условия тарифа</BaseButton>
    
<div class="irrevocable">  <p>невозвратный</p></div>
     
    </div>



</div>
<div class="card__right">

  <p class="price">{{card.price.amount}} {{card.price.currency}}</p>
  <BaseButton></BaseButton>
  
  <p class="card__right-text">Цена за всех пассажиров</p>
  <div class="card__right-bottom">
    <p>Нет багажа</p>
    <BaseButton variant="addBtn"> + Добавить багаж</BaseButton> 
    </div>
  

</div>
</div>
</template>

<script>
import BaseButton from './base/BaseButton.vue'
export default {
  components: { BaseButton },
  name: "Card",
  data(){
    return{
     
    }
    
  },
  props: {
    card:{
      type: Object,
      default: () => {}
    }
    },
    methods:{

    },
    computed: {


    },
    mounted(){
    console.log( Object.entries(this.card.segments))
  
    }
}
</script>

<style>

</style>