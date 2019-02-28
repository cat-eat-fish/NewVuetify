<template>
  <div id="app">
    <v-app id="inspire">
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
          <v-list dense>
            <template v-for="item in items">
              <v-layout row v-if="item.heading" align-center :key="item.heading">
                <v-flex xs6>
                  <v-subheader v-if="item.heading">
                    {{ item.heading }}
                  </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                  <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
              </v-layout>
              <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ item.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="(child, i) in item.children" :key="i" @click="gopage(child)">
                  <v-list-tile-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ child.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              <v-list-tile v-else @click="gopage(item)" :key="item.text">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar
          color="blue darken-3"
          dark
          app
          :clipped-left="$vuetify.breakpoint.mdAndUp"
          fixed
        >
          <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">Google Contacts</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>notifications</v-icon>
          </v-btn>
        </v-toolbar>
        <v-content >
          <div id="v-content">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view  v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </v-content>
        
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              Create contact
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                  <v-layout align-center>
                    <v-avatar size="40px" class="mr-3">
                      <img
                        src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                        alt=""
                      >
                    </v-avatar>
                    <v-text-field
                      placeholder="Name"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    prepend-icon="business"
                    placeholder="Company"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    placeholder="Job title"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mail"
                    placeholder="Email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="tel"
                    prepend-icon="phone"
                    placeholder="(000) 000 - 0000"
                    mask="phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="notes"
                    placeholder="Notes"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn flat color="primary">More</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
              <v-btn flat @click="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>


      <v-btn v-show="!hidden" color="pink"  fixed fab dark small  bottom right  @click="goTop">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
      hidden:true,
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: '首页' ,href:'/'},
        { icon: 'history', text: '测试',href:'text' },
        { icon: 'content_copy', text: '笔记',href:"note" },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: false,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: '开源信息',
          model: false,
          children: [
            { text: '开源接口',href:'/openSourceInfo' },
            { text: '推荐小说案例' ,href:'/openSourceCase'},
            { text: '推荐其他案例' ,href:'/openSourceCaseOther'},
            { text: 'app案例' },
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ]
    }),
    props: {
      source: String
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll, true);
    },
    methods:{
      goTop(){
        document.documentElement.scrollTop = 0;
      },
      handleScroll: function () {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
            // 设备/屏幕高度
            let scrollTop = document.documentElement.scrollTop; 
            if(scrollTop >= 100){
              this.hidden = false;
            }else{
              this.hidden = true;
            }
            
      },
      gopage(item){
        if(item.href){
          this.$router.push(item.href)
        }
      }
    }
}
</script>


<style lang="scss">
</style>