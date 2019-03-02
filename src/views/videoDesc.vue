<template>
    <div class="videoDesc">
        <v-container grid-list-md >
            <v-layout>
                <v-flex xs12>
                    <v-card dark color="secondary">
                        <span style="padding:18px 12px;font-size:14px" @click="$router.back()">返回</span>
                        <v-breadcrumbs :items="breadcrumbs" divider=">"  style="display: inline-block;"></v-breadcrumbs>
                    </v-card>
                </v-flex>
            </v-layout>
            <div class="content">
                <div class="video-info">
                    <h1 class="video-title">{{videoInfo.title}}</h1>
                    <div class="video-data">
                        <span class="a-crumbs">作者：<span class="blue">{{videoInfo.name}}</span></span>
                        <span class="">提供商:<span class="blue">{{videoInfo.providerName}}</span></span>
                        <span class="a-crumbs">类别：<span class="blue">{{videoInfo.category}}</span></span>   
                    </div>
                    <div class="video-data"> 
                        <!-- <v-flex xs12 class="video-data"> -->
                            <span class="tags" >标签：<span class="blue">{{videoInfo.tags}}</span></span>
                        <!-- </v-flex> -->
                        <!-- <span class="">口号：<span class="blue">{{videoInfo.slogan}}</span></span> -->
                    </div>
                    <div class="video-data">
                        <span class="time">发布时间：<span class="blue">{{videoInfo.releaseTime}}</span></span>
                        <span class="view">观看次数：<span class="blue">{{videoInfo.collectionCount}}</span></span>
                        <!-- <span class="copyright">本视频来源于：开源社区，转载请联系视频作者：{{videoInfo.name}}</span> -->
                    </div>
                    <v-rating v-model="rating"></v-rating>
                </div>
                <div class="video-view">
                    <video-player v-if="isok"  
                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
                    />
                </div>
                <div class="video-desc">
                    {{videoInfo.description}}
                </div>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
import {formateDate} from "@/libs/util.js"
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player';
export default {
    components:{},
    name:"videodesc",
    data(){
        return{
            rating: 3,
            breadcrumbs: [
                {text: '首页',disabled: false,href: '/'},
                {text: '视频列表',disabled: false,href: '/openSourceCaseOther'},
                {text: '视频详情',disabled: true,href: ''},
            ],
            isok:false,
            videoInfo:{},
            playerOptions: {
               playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始播放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",
                    src: "" //你的视频地址（必填）
                }],
                poster: "", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
               controlBar: {
                 timeDivider: true,
                 durationDisplay: true,
                 remainingTimeDisplay: false,
                 fullscreenToggle: true  //全屏按钮
               }
            }
        }
    },
    created(){
        this.video();
    },
    components:{
        player() {
            return this.$refs.videoPlayer.player
        }
    },

    mounted(){
        
    },
    methods:{
        video(){
            var that = this;
            var id = this.$route.query.id;
            axios.get('https://api.apiopen.top/todayVideo').then(res=>{
                var data = res.data.result;
                data = data.filter((item)=>{
                    return item.type === "followCard";
                })
                data.map((item,index)=>{
                    item.data.content.data.releaseTime = formateDate(new Date(item.data.content.data.releaseTime),"Y-M-D h:min:s")
                })
                that.videoInfo = data[id].data.content.data;

                that.videoInfo.collectionCount = data[id].data.content.data.consumption.collectionCount
                that.videoInfo.name = data[id].data.content.data.author.name;
                that.videoInfo.description = data[id].data.content.data.description;
                that.videoInfo.providerName = data[id].data.content.data.provider.name
                var a = data[id].data.content.data.tags.map((item)=>{return item.name; }).join(" ");
                that.videoInfo.tags = a;
                that.playerOptions.sources[0].src = that.videoInfo.playUrl;
                that.playerOptions.poster =  that.videoInfo.cover.blurred;
                that.isok = true;
                // console.log(that.videoInfo)
            }).catch(err=>{console.log(err)})
        },
        onPlayerPlay(player) {
            
        },
        onPlayerPause(player){
            
        },
    }
}
</script>
<style>
    .video-data {margin: 10px 0 0;font-size: 12px;height: 16px;color: #999;}
    .video-data span{margin-right: 15px;}
    .video-info{margin-bottom: 16px;}
    .video-title {font-size: 18px;font-weight: 500;color: #212121;line-height: 26px;height: 26px;margin-bottom: 12px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

    .blue{color: #06b8ff;background: #fff !important;}
    /* .video-view{width: 847px;} */
    .video-player{width: 100%;}
    /* .video-desc{margin-top: 16px;white-space: pre-line;transition: all .3s;font-size: 12px;color: #212121;letter-spacing: 0;line-height: 18px;height: auto;width: 573px;overflow: hidden;} */
</style>



