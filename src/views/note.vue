<template>
    <div class="note">
        <v-container grid-list-xs >
            <v-layout>
            <v-flex xs12>
                <v-alert :value="true"   transition="scale-transition" type="warning">该页面只做笔记.</v-alert>
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



