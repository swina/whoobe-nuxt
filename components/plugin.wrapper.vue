<template>
    <div class="relative"> 
        <component 
            :is="component"
            :plugin="plugin"/>

    </div>
</template>

<script>
export default {
    data:()=>({
        component: null,
        enabled: false,
    }),
    props: ['doc','plugin'],
    computed:{
    },
    mounted(){
        let name = this.plugin.general.path 
        //if ( this.$attrs.editor ) name += '.editor'
        //console.log ( '@/components/plugins/' + name + '.vue' )
        this.component = () =>  import(/* webpackChunkName: 'whoobe_' */ '@/components/plugins/' + name )
    }
}
</script>