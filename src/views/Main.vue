<template>
<div>
kjjn
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Main",
  computed:{
    ...mapGetters({
      getFlights: 'getFlights'
    })
  }
}
</script>

<style lang="scss" scoped>


</style>