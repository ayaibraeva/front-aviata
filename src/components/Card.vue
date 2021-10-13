<template>
<div class="card" >
<div class="card__left">
  <div class="card__left-top"> 
    <div class="card__logo"> 
        <img class="logo" :src="getAirlineIcon"/>  
           <p>{{card.itineraries[0][0]['carrier_name']}}</p>
    </div>
   
    <div class="info">
      <div class="info__date">
          <p class="date">{{getDepDate}}</p>
          <p class="time">{{getDepTime}}</p>  
      </div>
      <div class="info__content">
        <div class="content">
          <p class="code">{{originInfo['origin_code']}}</p>
          <p>{{getTraveltime}}</p>
        
          <p class="code">{{destinationInfo['dest_code']}}</p>
        </div>
        <div class="timeline">
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
    <BaseButton variant="blue">Детали перелета</BaseButton>
    <BaseButton variant="blue" class="center-btn"> Условия тарифа</BaseButton>
    
<div class="irrevocable"> 
  <p>{{card.refundable ? 'возвратный' : 'невозвратный'}}</p>
  </div>
</div>



</div>
<div class="card__right">
  <p class="price">{{card.price}} {{card.currency}}</p>
  <BaseButton/>
  
  <p class="card__right-text">Цена за всех пассажиров</p>
  <div class="card__right-bottom">
    <p> {{card.services ? 'Есть багаж' : 'Нет багажа'}} </p>
    <BaseButton variant="addBtn"> + Добавить багаж</BaseButton> 
    </div>
  

</div>
</div>
</template>

<script>
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
      originInfo(){
        return this.card.itineraries[0][0].segments[0]
      },
      destinationInfo(){
        return this.card.itineraries[0][0].segments[this.card.itineraries[0][0].segments.length - 1]
      },
      getSegments(){
        let segments = this.card.itineraries[0][0].segments
        if(segments.length === 1){
            return  ` Прямой рейс `
        }else  if(segments.length === 2){
          return `через ${segments[0]['airport_dest']}, ${this.getStopsTime}` 
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

    },
   mounted(){
          console.log(typeof(this.card.itineraries[0][0].traveltime))
                    console.log(this.card.itineraries[0][0].carrier)

}
}
</script>

<style lang="scss" scoped>
.card{
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  max-width: 880px;
  width:100%;
  height: 168px;
  margin-bottom: 12px;
  background: #fff;

  &__logo{
    display: flex;
    align-items: center;
     margin-right: 14px;
     p{
       font-weight: 600;
font-size: 14px;
line-height: 19px;


color: #202123;

     }
  }
  
  &__left{
    padding: 40px 20px 16px;
    display: flex;
    flex-direction: column;
    max-width: 71%;
    width: 100%;
    &-top{
      display: flex;
      align-items: center;
      }
      &-bottom{
        display: flex;
        align-items: center;
        margin-top: 46px;
      }
    

  }
  &__right{
    padding: 12px 20px;
    max-width: 29%;
 width: 100%;
    background: #F5F5F5;
border-radius: 0px 4px 4px 0px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
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
}
.info{
  display: flex;
  align-items: center;
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

  }
  .time{
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: #202123;
    margin:0;
   
    }
    &__content{
      display: flex;
      flex-direction: column;
       margin-left: 30px;
       margin-right: 30px;
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
         
       }
        .code{
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          color: #B9B9B9;
          margin:0;
          margin-right: 46px;
        }
        p{
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #202123;
          margin:0;
          margin-right: 46px;
        }
      
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
    }

  }
  .center-btn{
    margin-right: 25px;
    margin-left: 25px;
  }
  .irrevocable{
    display: flex; 
    align-items: center;
    p{
      font-size: 12px;
line-height: 14px;
text-align: center;
color: #707276;
    }
  }
</style>