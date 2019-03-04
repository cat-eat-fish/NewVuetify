<template>
    <div class="text">
        <!-- 提示框 -->
        <v-snackbar style="text-align:center" text-xs-center top :timeout="2000"  v-model="snackbar" color="success" >
            {{snackbarText}}
            <v-btn dark flat @click="snackbar = false">
                close
            </v-btn>
        </v-snackbar> 
        <v-container grid-list-md fluid>
            <v-flex xs12>
                <v-alert :value="true"   transition="scale-transition" type="warning">该页面只进行测试.</v-alert>
            </v-flex>
                <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                class="mx-3"
                ></v-autocomplete>
            <v-layout>
                <v-flex xs2>
                    <v-date-picker  v-model="picker" :first-day-of-week="0" locale="zh-cn"></v-date-picker>
                    <v-time-picker  v-model="time"  type="month"  width="290" class="xs-3"></v-time-picker>
                </v-flex>
            </v-layout>

            <v-layout wrap align-center>
                <v-flex xs12 sm4 d-flex>
                    <v-select  v-model="nowpro" @change="showpro" :items="provinces"  label="请选择省"></v-select>
                </v-flex>
                <v-flex xs12 sm4 d-flex>
                    <v-select  v-model="nowcity" @change="showcity" :items="citys"  label="请选择市"></v-select>
                </v-flex>
                <v-flex xs12 sm4 d-flex>
                    <v-select  v-model="nowcounty" @change="showcounty" :items="countys"  label="请选择县"></v-select>
                </v-flex>
            </v-layout>
            {{nowprotext}}-{{nowcitytext}}-{{nowcountytext}}
                <v-layout wrap row >
                    <v-flex xs5 > 
                        <v-progress-linear   :indeterminate="true" ></v-progress-linear>
                    </v-flex>
                </v-layout>
        </v-container>
    </div>
</template>
<script>
import {cityData3} from "@/libs/city.data-3.js"
import axios from "axios"
export default {
    name:"mytext",
    computed:{
        provinces(){
            // var a = cityData3().map((item,inde)=>{
            //     return item.text
            // })
            return  cityData3();
        }
    },
    data(){
        return{
            snackbar:false,
            snackbarText:"",
            loading: false,
            items: [],
            search: null,
            select: null,
            states: [],

            picker: new Date().toISOString().substr(0, 10),
            time: '11:15',

            citys:[],
            countys:[],

            nowpro:'',
            nowcity:'',
            nowcounty:'',

            nowprotext:"",
            nowcitytext:'',
            nowcountytext:'',
            
        }
    },
    created(){

    },
    watch: {
      search (val) {
        setTimeout(()=>{
            val && val !== this.select && this.querySelections(val)
        })
      }
    },
    methods:{
        showpro(){
            var a = cityData3().map((item,index)=>{
                if(item.value == this.nowpro){
                    return item
                }
            }).filter((item,index)=>{
                return item !=  undefined
            })
            this.citys = [];
            this.citys = a[0].children;
            this.countys = [];
        },
        showcity(){
            var a = this.citys.map((item,index)=>{
                if(item.value == this.nowcity){
                    return item
                }
            }).filter((item,index)=>{
                return item !=  undefined
            })
            this.countys = a[0].children
        },
        showcounty(){
            var a = cityData3().map((item,index)=>{
                if(item.value == this.nowpro){
                    var pro = item.text;
                    this.nowprotext = pro;
                    item.children.map((item,index)=>{
                        if(item.value == this.nowcity){
                            var city = item.text;
                            this.nowcitytext = city;
                            item.children.map((item,index)=>{
                                if(item.value == this.nowcounty){
                                    var county = item.text;
                                    this.nowcountytext = county;
                                }
                            })
                        }
                    })
                }
            })
        },
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
        }
    }
}
</script>


