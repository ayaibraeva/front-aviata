<template>
<div class="card" >
<div class="card__left">
  <div class="card__left-top"> 
    <div class="card__logo"> 
        <img class="logo" :src="getAirlineIcon"/>  
           <p class="logo-text">{{card.itineraries[0][0]['carrier_name']}}</p>
    </div>
   
    <div class="info">
      <div class="info__date">
          <p class="date">{{getDepDate}}</p>
          <p class="time">{{getDepTime}}</p>  
      </div>
      <div class="info__content">
        <div class="content">
          <p class="code">{{originInfo['origin_code']}}</p>
          <p class="time-travel" v-if="!isMobile">{{getTraveltime}}</p>
        
          <p class="code">{{destinationInfo['dest_code']}}</p>
        </div>
        <div class="timeline" v-if="!isMobile">
          <p>{{getSegments}}</p>
        </div>
      </div>
         <div class="info__date"> 
          <p class="date">{{getArrDate}}</p>
          <p class="time">{{getArrTime}}</p>  
      </div>
      <div>

      </div>
    </div>
 
    

  </div>
  <div class="card__left-bottom">
    <BaseButton variant="blue" class="detail-btn">{{isMobile ? 'Детали' : 'Детали перелета'}}</BaseButton>
    <BaseButton variant="blue" class="center-btn"> Условия тарифа</BaseButton>
  
<div class="irrevocable" v-if="!isMobile"> 
          <svg class="icon">
                <use
                  :xlink:href="
                    require('@/assets/icons.svg') + '#icon-non-refundeble'
                  "
                ></use>
              </svg>

  <p>{{card.refundable ? 'возвратный' : 'невозвратный'}}</p>
  </div>

</div>



</div>
<div class="card__bottom-mobile" v-if="isMobile">
  
   <p class="time-travel" >{{getTraveltime}}</p>
    <div class="time-travel">
          <p>{{getSegments}}</p>
        </div>

</div>
<div class="card__right">

  <p class="price" v-if="!isMobile" >{{card.price}} {{card.currency}}</p>
  <div v-if="isMobile" class="card__right-mobile">
  <p class="card__right-text">На Авиате</p>  
    </div>
  <BaseButton>{{isMobile ? `${card.price} ₸` : 'Выбрать'}}</BaseButton>
  
  <p class="card__right-text" v-if="!isMobile">Цена за всех пассажиров</p>
  <div class="card__right-bottom" v-if="!isMobile">
    <p> {{card.services ? 'Есть багаж' : 'Нет багажа'}} </p>
    <BaseButton variant="addBtn"> + Добавить багаж</BaseButton> 
    </div>
  

</div>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

import BaseButton from './BaseButton.vue'
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
    computed:{
         ...mapGetters({
      
        isMobile: 'isMobile'
    }),
      originInfo(){
        return this.card.itineraries[0][0].segments[0]
      },
      destinationInfo(){
        return this.card.itineraries[0][0].segments[this.card.itineraries[0][0].segments.length - 1]
      },
      getSegments(){
        let segments = this.card.itineraries[0][0].segments
        if(segments.length === 1){
            return  `${this.isMobile ?  'прямой':'Прямой рейс'} `
        }else  if(segments.length === 2){
          return `${ this.isMobile ? `${this.card.itineraries[0][0].stops} пересадки` :`через ${segments[0]['airport_dest']}, ${this.getStopsTime}`}` 
        }else {
          return `${this.card.itineraries[0][0].stops} пересадки`
        }
      },
      getDepDate(){
                let info = this.card.itineraries[0][0].segments[0]['dep_time'].substring(0,10).toLowerCase()
              return info
      },
      getArrDate(){
         let info = this.destinationInfo['arr_time'].substring(0,10).toLowerCase()
              return info
      },
      getDepTime(){
        let info = this.originInfo['dep_time'].substring(11,16).toLowerCase()
              return info
      },
      getArrTime(){
        let info = this.destinationInfo['arr_time'].substring(11,16).toLowerCase()
              return info
      },
      getTraveltime(){
        let travelHour = Math.floor((this.card.itineraries[0][0].traveltime) / 3600)
        let travelMinutes = Math.floor((this.card.itineraries[0][0].traveltime) / 60 % 60)
        return `${travelHour} ч ${travelMinutes} м`

      },
      getStopsTime(){ 
        let destTime = new Date(this.originInfo.dep_time_iso)
        let arrTime =  new Date(this.originInfo.arr_time_iso)
        let time = (arrTime.getTime() -  destTime.getTime()) / 1000
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60 % 60)
        return `${hours} ч, ${minutes} м`

      },
      getAirlineIcon(){
        return `https://aviata.kz/static/airline-logos/80x80/${this.card.itineraries[0][0].carrier}.png`
      }
    },
    methods:{
        ...mapMutations({
       setIsMobile: "setIsMobile",
    }),

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
.card{
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  
  width:880px;
  height: 168px;
  margin-bottom: 12px;
  background: #fff;

  @media(max-width: 850px){
    flex-direction: column;
    justify-content: unset;
    width: 100vw;
  }
  

  &__logo{
    display: flex;
    align-items: center;
     margin-right: 14px;
     width:130px;
     @media(max-width: 850px) {
       margin: 0;
      
       order:2;
       justify-content: flex-end;
       border-radius: 100px;
       border: 1px solid rgb(0, 86, 159);
       width: fit-content;
       margin-top: 8px;
      padding: 4px;
       
     }
     .logo-text{
       font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #202123;
        @media(max-width:850px){
        display: none;
        }

     }
  }
  
  &__left{
    padding: 40px 20px 16px;
    display: flex;
    flex-direction: column;
    max-width: 80%;
    width: 100%;
    @media(max-width: 850px) {
      padding: 16px 16px 0;
      max-width: 100%;
      width:100%;
      
    }
    &-top{
      display: flex;
      align-items: center;
      @media(max-width: 850px){
        justify-content: space-between;
        order:2;
      }
      }
      &-bottom{
        display: flex;
        align-items: center;
        margin-top: 46px;
        @media(max-width: 850px) {
          order:1;
          margin-top: 0;
          justify-content: flex-end;
          
        }
      }
    

  }
  &__right{
    padding: 12px 20px;
    max-width: 30%;
 width: 100%;
    background: #F5F5F5;
border-radius: 0px 4px 4px 0px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
@media(max-width: 850px){
  flex-direction: row;
justify-content: space-between;
  background: #fff;
  padding: 0;
  border-top: 1px solid rgba(219,219,219, 1);
  padding-left:16px ;
  max-width: 100vw;
  margin-top: 40px;
}
&-mobile{
  width: 100%;
      display: flex;
    align-items: center;
    justify-items: flex-start;


}

.price{
  font-size: 24px;
line-height: 28px;
text-align: center;
color: #202123;
margin-bottom: 13px;
}
&-text{
  font-weight: normal;
font-size: 12px;
line-height: 16px;
text-align: center;
color: #707276;
margin-top: 8px;
@media(max-width: 850px){
  margin-top: 0;
}
}

&-bottom{
  display: flex;
  align-items: center;
  margin-top: 16px;
  p{
    font-weight: normal;
font-size: 12px;
line-height: 16px;
display: flex;
align-items: center;
text-align: center;

/* Deep Dark */
color: #202123;
margin-right: 6px;

  }

}


  }
}
.logo{
  width:20px;
  height: 20px;
  margin-right: 7px;
  @media(max-width: 850px){
    margin-right: 0;
  }
}
.info{
  display: flex;
  align-items: center;

    width: 100%;

  &__date{
    display: flex;
    align-items: center;
    flex-direction: column;

  }
  .date{
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #202123;
    margin: 0;
      @media(max-width: 850px) {
            display: none;
          }

  }
  .time{
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: #202123;
    margin:0;
      @media(max-width: 850px) {
            font-size: 18px;
            
          }
   
    }
    &__content{
      display: flex;
      flex-direction: column;
       margin-left: 30px;
       
       
         @media(max-width: 850px) {
              margin-left: 6px;
       margin-right: 6px;
      
       height: 19px;
    align-items: flex-end;
    justify-content: flex-end;
            
          }
       .content{
        display: flex;
        align-items: center;
       padding-bottom: 3.5px;
       position: relative;
       
      
       &::after{
         content:'';
         position: absolute;
         border-bottom: 1px solid #B9B9B9;
         top: 100%;
         width: 168px;
         left: 1%;
           @media(max-width: 850px) {
            width: 28px;
            top: 6px;
            left: 35%;

            
          }
         
         
       }
        .code{
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          color: #B9B9B9;
          margin:0;
          margin-right: 46px;
            @media(max-width: 850px) {
            font-size: 14px;
            margin: 0;
            
          }
          &:first-child{
           
            @media(max-width: 850px) {
            
             margin-right: 20px;
          }
          }
          &:last-child{
            @media(max-width: 850px) {
            
             margin-left: 20px;
          }
          }
        }
   
      
      }

    }

  }
       .time-travel{
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #202123;
          margin:0;
          margin-right: 46px;
          @media(max-width: 850px) {
            margin: 0;
            font-size: 14px;
            color: #B9B9B9;

            
          }
          &:last-child{
@media(max-width: 850px) {
  margin-left: 16px;
  
}
          }
           
      
        }
  .center-btn{
    margin-right: 25px;
    margin-left: 25px;
    @media(max-width: 850px) {
      display: none;
      
    }
  }
  .irrevocable{
    display: flex; 
    align-items: center;
    @media(max-width: 850px){
      margin-left: 16px;
    }

    p{
      font-size: 12px;
line-height: 14px;
text-align: center;
color: #707276;
    }
  }

.card__bottom-mobile{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px 0;
}
      .timeline{
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #FF9900;
      margin:0 ;
      margin-top: 4.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 168px;
      width: 100%;
     
      }
      .icon{
        width: 16px;
        height: 16px;
        margin-right: 6px;
        }
</style>