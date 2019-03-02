<template>
    <div class="openSourceCase">
        <v-container grid-list-md  >
            <v-layout  v-if="!isVideo" row wrap>
                <v-flex xs12>
                    <v-btn fab  @click="doGetName"  small  :loading="loading" :disabled="loading" color="secondary" >
                        <v-icon dark>cached</v-icon>
                    </v-btn>
                    <div v-for="(item,index) in name" :key="index">
                        {{item.femalename}}
                    </div>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    <v-card  dark color="secondary">
                        <span style="padding:18px 12px;font-size:14px" @click="$router.back()">返回</span>
                        <v-breadcrumbs :items="breadcrumbs" divider=">"  style="display: inline-block;"></v-breadcrumbs>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout  row wrap v-for="(item,index) in video" :key="index">
                    <v-flex xs4 md2>
                        <div class="video-img">
                            <router-link :to="{name:'videodesc',query:{id:index}}">
                                <v-img style="width:100%" :lazy-src="item.data.content.data.cover.blurred"  :src="item.data.content.data.cover.feed" :alt="item.data.content.data.title" >
                                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-layout>
                                </v-img>    
                            </router-link>
                        </div>
                    </v-flex>
                    <v-flex xs8 md10>
                        <div class="video-info">
                            <router-link :to="{name:'videodesc',query:{id:index}}">
                                <h4 class="video-title">{{item.data.content.data.title}}</h4>
                            </router-link>
                            <h5 class="video-author">{{item.data.content.data.author.name}}</h5>
                            <p class="video-desc">{{item.data.content.data.description}}</p>
                            <div class="detail">
                                <span class="data-box">观看次数：{{item.data.content.data.consumption.collectionCount}}</span>
                                <span class="data-box">作者：{{item.data.content.data.author.name}}</span>
                                <span class="data-box">发布时间：{{item.data.content.data.releaseTime}}</span>
                                <span class="data-box">类型：{{item.data.content.data.category}}</span>
                            </div>
                        </div>
                    </v-flex>
            </v-layout>
        </v-container>  
        <!-- 提示框 -->
        <v-snackbar style="text-align:center" text-xs-center top :timeout="2000"  v-model="snackbar" color="success" >
            {{snackbarText}}
            <v-btn dark flat @click="snackbar = false">
                close
            </v-btn>
        </v-snackbar> 
    </div>
</template>
<script>
import axios from "axios"
import {formateDate} from "@/libs/util.js"
export default {
    name:"openSourceCaseOther",
    data(){
        return{
            breadcrumbs: [
                {text: '首页',disabled: false,href: '/'},
                {text: '开源案例',disabled: true,href: ''},
            ],
            isVideo:true,
            snackbar:false,
            snackbarText:"",
            loader: null,
            loading: false,
            name:[],
            video:[],
            page:1,
        }
    },
    watch: {
    },
    created(){
        this.getName();
        this.getVideo();
    },
    methods:{
        doGetName(){
            this.loader = 'loading';
            this.loading = true;
            this.page++;;
            this.getName();

        },
        getName(){
            axios.get(`https://www.apiopen.top/femaleNameApi?page=${this.page}`).then(res=>{
                if(res.data.code == 200){
                    this.name = res.data.data;
                    if(this.loading == true){
                        this.loading = false;
                    }
                }
            }).catch(err=>{console.log(err)})
        },
        getVideo(){
            axios.get(`https://api.apiopen.top/todayVideo`).then(res=>{
                if(res.data.code == 200){
                    var data = res.data.result;
                    data = data.filter((item,index)=>{
                        return item.type == "followCard"
                    })
                    data.map((item,index)=>{
                        item.data.content.data.releaseTime = formateDate(new Date(item.data.content.data.releaseTime),"Y-M-D h:min:s")
                    })
                    this.video = data;
                }
            }).catch(err=>{console.log(err)})
        }
    }

}
</script>

<style lang="scss" scoped>
    .video-desc{font-size: 12px;}
    .detail {margin-top: 0px;color: #99a2aa;font-size: 12px;}
    .detail .data-box{width: 80px;margin-right: 20px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
    .video-info{padding-bottom: 20px;position: relative;}
    @media screen and (max-width: 800px) {
        .video-desc{display: none}
        .detail{display: none}
    }
</style>

