<template>
    <div class="text">
        <!-- 提示框 -->
        <v-snackbar style="text-align:center" text-xs-center top :timeout="2000"  v-model="snackbar" color="success" >
            {{snackbarText}}
            <v-btn dark flat @click="snackbar = false">
                close
            </v-btn>
        </v-snackbar> 
        <v-container grid-list-md >
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
        </v-container>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"mytext",
    data(){
        return{
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
        setTimeout(()=>{
            val && val !== this.select && this.querySelections(val)
        })
      }
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
        }
    }
}
</script>


