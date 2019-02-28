<template>
    <div class="openSourceCase">
        <v-container grid-list-md >
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card dark color="secondary">
                        <span style="padding:18px 12px;font-size:14px" @click="$router.back()">返回</span>
                        <v-breadcrumbs :items="breadcrumbs" divider=">"  style="display: inline-block;"></v-breadcrumbs>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row   >
                <v-flex xs8 md10>
                    <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    label="请输入小说名"
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs1 md2>
                    <v-btn  style="width:100%"  class="info" @click="doSearch">小说查询</v-btn>
                </v-flex>
                <!-- <v-spacer /> -->
            </v-layout>
            <div v-if="searchList == null">
                <v-layout row class="recommendList-item" v-for="(item,index) in recommendList" :key="index">
                    <v-flex  xs3 >
                        <div class="recommendList-item-img">
                            <img :src="item.book_cover" :alt="item.bookname" />
                        </div>
                    </v-flex>
                    <v-flex xs9 >
                        <div class="recommendList-item-info">
                            <h3>《{{item.bookname}}》</h3> 
                            <h4>{{item.author_name}}</h4> 
                            <div class="tags">
                                <span color="green" text-color="white" v-for="(item2,index2) in item.tag" :key="index2">{{item2}}</span>
                            </div>
                            <div  class="recommendList-item-info-desc">{{item.introduction}}</div>
                            <v-btn class="info" small @click="goRead(item.bid)">去阅读</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </div>
            <v-layout v-else row class="recommendList-item">
                <v-flex  xs3 >
                    <div class="recommendList-item-img">
                        <img :src="searchList.cover" :alt="searchList.title" />
                    </div>
                </v-flex>
                <v-flex xs9 >
                    <div class="recommendList-item-info">
                        <h3>《{{searchList.title}}》</h3> 
                        <h4>{{searchList.author}}</h4> 
                        <div class="tags"><span  color="green" text-color="white" v-for="(item2,index2) in (searchList.tags.split(','))" :key="index2">{{item2}}</span></div>
                        <div  class="recommendList-item-info-desc">{{searchList.desc}}</div>
                        <v-btn class="info" small @click="goRead(searchList.bid)">去阅读</v-btn>
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
export default {
    name:"openSourceCase",
    data(){
        return{
            breadcrumbs: [
                {text: '首页',disabled: false,href: '/'},
                {text: '开源信息',disabled: true,href: ''},
                {text: '开源案例',disabled: true,href: ''}
            ],
            searchList:null,
            searchText:"",
            recommendList:[],
            snackbar:false,
            snackbarText:"",
            loading: false,
            items: [],
            search: null,
            select: null,
            states: []
        }
    },
    watch: {
      search (val) {
          var that = this;
          if(val == ""){
              this.searchList = null;
              return false;
          }else{
              setTimeout(()=>{
                  val && val !== this.select && that.querySelections(val)
              },2000)
          }
      }
    },
    created(){
        this.thisData()
    },
    methods:{
        querySelections (v) {
            this.loading = true
            var that = this;
            axios.get(`https://www.apiopen.top/novelInfoApi?name=${v}`).then(res=>{
                // (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                if(res.data.code == 200){
                    var data = res.data.data.data;
                    data = data.map((item,index)=>{
                        return item.title
                    })
                    that.items = data;
                    that.loading = false
                }else{
                    that.snackbarText = res.data.msg;
                    that.snackbar = true;
                    that.loading = false;
                }
            }).catch(err=>{
                console.log(err)
                that.snackbarText = "网络错误！"
                that.snackbar = true;
            })
        },
        thisData(){
            var that = this;
            axios.get("https://www.apiopen.top/novelApi").then(res=>{
                that.recommendList = res.data.data
            }).catch(err=>{console.log(err)})
        },
        goRead(bid){
            bid = Number(bid);
            window.open(`http://t.shuqi.com/route.php?pagename=#!/bid/${bid}/ct/read`);
        },
        doSearch(){
            var that = this;
            if(this.select != null){
                axios.post(`https://www.apiopen.top/novelInfoApi?name=${this.select}`).then(res=>{
                    that.searchList = res.data.data.aladdin;
                }).catch(err=>{console.log(err)})
            }else{
                this.snackbarText = "搜索关键字不能为空"
                this.snackbar = true;
            }
            
        }
    }

}
</script>

<style lang="scss" scoped>
    @media screen and (max-width: 800px) {
        .recommendList-item-img img{width: 100%}
        .recommendList-item-info-desc{display: none}
    }
    .tags span{margin-left: 8px;color: green}
    .tags span:first-child{margin-left:0;}
</style>

