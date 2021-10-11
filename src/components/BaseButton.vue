<template>
  <button @click="$emit('onBtnClick')" :class="['btn', `btn--${variant}`]"> 
    <slot>
       Выбрать
    </slot>
  </button>
</template>

<script>
export default {
  props:{
    variant:{
      type: String,
      default: "default",
      validator: function(value){
        return (
          ["default",
          "blue",
          "addBtn"
          ].includes(value)
          )
          
      }
      }

  }
}
</script>

<style >
/* // .btn{
//   font-family: "Open Sans", sans-serif;
 

// &--default{
//   background: #55BB06;
//   border-radius: 4px; 
//   padding: 7px 12.5px;
//   border: none;
//   font-weight: bold;
//   font-size: 18px;
//   line-height: 25px;
//   text-align: center;
//   color: #FFFFFF;
//   max-width: 200px;
//   width: 100%;
//   height: 40px;

//   }
//   &--blue{
//     font-weight: 400;
//     font-size: 12px;
//     line-height: 16px;
//     color: #7284E4;
//     border-bottom: 1px dashed #7284E4;
//     border: none;
//     border-bottom: 1px dashed #7284E4;
//     background: #fff;

//   }
//   &--addBtn{
//     background: #EAF0FA;
//     border-radius: 2px;
//     font-weight: 600;
//     font-size: 12px;
//     line-height: 16px;
//     text-align: center;
//     color: #5763B3;
//     padding: 3px 8px;
//     border: none;
//     width: 128px;
//     height: 24px;
//   }
// }   */
</style>