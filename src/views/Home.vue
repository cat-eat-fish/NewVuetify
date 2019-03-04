<template>
  <div >
    <v-container grid-list-xl  fluid>
    <v-layout row wrap>
      <v-flex xs10 >

      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import {cityData3} from "@/libs/city.data-3.js"
import axios from "axios"
export default {
  name: 'home',
  data(){
    return{
      Data:[],
    }
  },
  computed:{cityData3},
  created(){
    this.thisData()
    console.log(this.cityData3)
  },
  methods:{
    thisData(){
      var that = this;
      axios.get('http://meiriyikan.cn/api/json.php').then(res=>{
        // var data = res.data;
        // that.Data = data
        // console.log(data)
      }).catch(err=>{console.log(err)})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>




