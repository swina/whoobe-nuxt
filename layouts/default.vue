<template>
  <div id="nuxpresso-page" class="w-screen max-w-screen overflow-y-hidden">
    <nuxt/>
    <scroll-top v-if="settings && settings.scrolltop"/>
    <!--<moka-jivo-chat v-if="prod"/>
    <div v-if="plugins">
        <template v-for="plugin in plugins">
            <moka-plugin-wrapper 
                v-if="plugin.global"
                :key="plugin.id"
                :name="plugin.component"
                :plugin="plugin"
                :block="null"/>
        </template>
    </div>--->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollTop from '@/components/ScrollTop'
//import MokaJivoChat from '@/components/plugins/jivo'
//import MokaPluginWrapper from '@/components/Plugins.Wrapper'
export default {
  middleware: 'load-initial-data',
  name: 'NuxpLayout',
  data:()=>({
    //plugins: []
  }),
  components: {
    ScrollTop //, MokaJivoChat, MokaPluginWrapper
  },
  computed: {
    ...mapState ( ['settings','plugins'] ),
    prod(){
      
        if ( process.env.NODE_ENV === 'production' ){
          return true
        }
        return false
      
    }
  },
  
  mounted(){

    /*
    this.$axios.get('plugins').then ( res => {
      if ( res.data.plugins ){
          res.data.plugins.forEach ( plugin => {
              if ( plugin.global ){
                  this.plugins.push ( plugin )
              }
          })
      }
    })
    */
  }
}
</script>
