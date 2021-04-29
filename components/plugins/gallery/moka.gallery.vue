<template>
    <div :class="block.css.css + ' '  + block.css.container">
        <template v-for="(image,i) in block.blocks">
            <div :class="slide(i) + ' absolute top-0 left-0 bottom-0 right-0 bg-cover bg-no-repeat bg-top  gallery-image-' + i + ' ' + 'border'" :style="'background-image:url(' + $imageURL(image.image) + ');'">
                <!--
                <img :src="$imageURL(image.image)" :key="image.id" :ref="image.id" :id="image.id" :class="image.css + ' object-cover'" />-->

            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'MokaGalleryPlugin',
    data:()=>({
        index: 0,
        timer: null
    }),
    props: [ 'plugin' , 'block' ],
    computed:{
        animation(){
            let el = this.block.blocks[this.index]

            el.gsap.animation ?
                this.$animationElement(el , '.gallery-image-' + this.index )
                 : null
            return el
        }
    },
    methods:{
        slide(i){
            if ( i != this.index ){
                return 'slideout' 
            } 
            return 'slidein'
        }
    },
    mounted(){
        
        let autoplay = parseInt(this.plugin.settings.autoplay.value)
        if ( autoplay ){
            let vm = this
            this.timer = window.setInterval( ()=> {
                vm.index < vm.block.blocks.length-1 ?
                    vm.index++ : vm.index = 0
            },autoplay*1000)
        } else {
            this.index = 0
        }
    },
    beforeDestroy(){
        window.clearInterval()
        this.timer = null
    }

}
</script>
<style>
.slideout {
    transform: scaleX(0);
    opacity:.5;
    transition: transform .4s linear;
    transform-origin: top left;
    transform-style: preserve-3D;
}
.slidein {
    transform: scaleX(1);
    transition: transform .4s linear;
    transform-origin: top right;
    transform-style: preserve-3D;
}
</style>