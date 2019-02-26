<template>
    <div class="openSourceCase">
        <v-container grid-list-md >
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card dark color="secondary">
                        <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
                    </v-card>
                </v-flex>
                <div >
                    <div v-for="(item,index) in recommendList" :key="index" >
                        <div class="recommendList-item" style="display:flex;">
                            <v-flex xs4 class="recommendList-item-img">
                                <img :src="item.book_cover" :alt="item.bookname" />
                            </v-flex>
                            <v-flex xs8  class="recommendList-item-info">
                                    <h2>《{{item.bookname}}》</h2> 
                                    <p>{{item.author_name}}</p> 
                                    <div><v-chip color="green" text-color="white" v-for="(item2,index2) in item.tag" :key="index2">{{item2}}</v-chip></div>
                                    {{item.introduction}}
                            </v-flex>
                        </div>
                    </div>
                </div>
            </v-layout>
        </v-container>   
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"openSourceCase",
    data(){
        return{
            breadcrumbs: [
                {text: '首页',disabled: false,href: ''},
                {text: '开源信息',disabled: true,href: ''},
                {text: '开源案例',disabled: true,href: ''}
            ],
            recommendList:[],
        }
    },
    created(){
        this.thisData()
    },
    methods:{
        thisData(){
            var that = this;
            axios.get("https://www.apiopen.top/novelApi").then(res=>{
                console.log(res.data)
                that.recommendList = res.data.data
            }).catch(err=>{console.log(err)})
        }
    }

}
</script>

