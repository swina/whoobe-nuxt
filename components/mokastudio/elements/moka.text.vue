<template>
    <component :ref="el.id" :is="component" :class="$cssResponsive(el.css)" :style="el.style" v-html="el.content"/> 
</template>

<script>
var gsap
export default {
    name: 'MokaTextElement',
    props: [ 'el' ],
    computed:{
        component(){
            let el = this.el
            if ( ( el.tag === 'element' || el.type === 'button' || el.type === 'element' || el.type === 'date' || el.type === 'file' ) && el.element != 'img' && el.type != 'video' && el.type != 'audio' ) {
                return el.hasOwnProperty('level') ? 'h' + el.level : el.element
            } 
        }
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>