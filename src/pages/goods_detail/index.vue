<template>
  <view>
    商品详情{{goods_id}}
  </view>
</template>

<script>
export default {
  components: {
    
  },

  data () {
    return {
     goods_id:""
    }
  },
  onLoad(query){
    this.goods_id=query.goods_id;
  }
 
}
</script>

<style lang="scss">

</style>
