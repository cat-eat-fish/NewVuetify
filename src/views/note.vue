<template>
    <div class="note">
        <v-container grid-list-xs fluid>
            <v-layout>
                <v-flex xs12>
                    <v-alert :value="true"   transition="scale-transition" type="warning">该页面只做笔记.</v-alert>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    xs sm md 
                    <p>页面结构</p> 
                    <pre>
v-container grid-list-md fluid
    v-layout row wrap
        v-flex xs12
            信息
        v-flex
    v-layout
v-container
                    </pre>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                    var data = res.data;
        // data = eval("("+data+")");
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
    name:"note",
    data(){
        return{

        }
    },

}
</script>



