<template>
    <div class="openSourceInfo">
        <v-container grid-list-md >
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card dark color="secondary">
                        <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-alert :value="true" v-model="alert" dismissible transition="scale-transition" type="warning">开源接口来源于<a href="https://www.jianshu.com/p/e6f072839282" target="_black">开源社区</a>,社长说不涉及版权.</v-alert>
                </v-flex>
                <v-flex xs12>
                    <v-list dark>
                        <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile  v-for="subItem in item.items" :key="subItem.title" @click="">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <span>api地址:{{ subItem.title }}</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>type方式:{{ subItem.type }}</span>
                                    </v-list-tile-title>
                                </v-list-tile-content>
                                <!-- <v-list-tile-action>
                                    <v-icon>{{ subItem.action }}</v-icon>
                                </v-list-tile-action> -->
                                <v-btn @click="doCopy(subItem)" color="success">复制地址</v-btn>
                                <v-btn @click="doApiTest(subItem)" color="success">点击测试</v-btn>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-flex>
                <!-- 提示框 -->
                <v-snackbar style="text-align:center" text-xs-center top :timeout="2000"  v-model="snackbar" color="success" >
                    {{snackbarText}}
                    <v-btn dark flat @click="snackbar = false">
                        close
                    </v-btn>
                </v-snackbar>
                <!-- 弹出框 -->
                <v-dialog v-model="dialog" width="900">
                    <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>
                            Privacy Policy
                        </v-card-title>
                        <v-card-text>
                            {{dialogContent}}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog = false">
                            关闭
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import axios from "axios" 
export default {
    name:"openSourceInfo",
    data(){
        return{
            dialog:false,
            dialogContent:"",
            snackbar:false,
            snackbarText:"",
            breadcrumbs: [      //面包屑
                {text: '首页',disabled: false,href: ''},
                {text: '开源信息',disabled: true,href: ''},
                {text: '开源接口',disabled: true,href: ''}
            ],
            alert:true,         //提示框
            items: [
                {action: 'local_activity',active:true,title: '新实时段子',items: [{ title: 'https://api.apiopen.top/getJoke?page=1&count=2&type=video' ,type:"post"}]},
                {action: 'restaurant',title: '快递查询',items: [{ title: 'https://api.apiopen.top/EmailSearch?number=1012002',type:"post"}]},
                {action: 'school',title: '视频推荐',items: [{ title: 'https://api.apiopen.top/todayVideo', type:"post"}]},
                {action: 'directions_run',title: '小说推荐',items: [{ title: 'https://www.apiopen.top/novelApi',type:"get" }]},
                {action: 'healing',title: '天气获取',items: [{ title: 'https://www.apiopen.top/weatherApi?city=北京',type:"get" }]},
                {action: 'content_cut',title: '美图获取',items: [ { title: 'https://www.apiopen.top/meituApi?page=1',type:"get" }]},
                {action: 'local_offer',title: '个性网名',items: [{ title: 'https://www.apiopen.top/femaleNameApi?page=1',type:"get"}] }
            ]
        }
    },
    created(){

    },
    methods:{
        doCopy(item){
            this.$nextTick(()=>{
                var oInput = document.createElement("input");
                oInput.value = item.title;
                document.getElementsByClassName("openSourceInfo")[0].appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = "copyInput";
                oInput.style.display = "none";
                document.getElementsByClassName("openSourceInfo")[0].removeChild(oInput);
                this.snackbarText = "复制完成"
                this.snackbar = true;
            })
        },  
        doApiTest(item){
            var that = this;
            if(item.type == "post"){
                axios.post(item.title,{}).then(res=>{
                    that.$nextTick(()=>{
                        that.dialog = true
                        that.dialogContent = res.data
                    })
                }).catch(err=>{console.log(err)})
            }else if(item.type == "get"){
                axios.get(item.title,{}).then(res=>{
                    that.$nextTick(()=>{
                        that.dialog = true
                        that.dialogContent = res.data
                    })
                }).catch(err=>{console.log(err)})
            }
            
        }
    }

}
</script>

