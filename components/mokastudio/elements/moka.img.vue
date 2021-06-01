<template>
    <img v-if="el.image" :ref="el.id" :src="image()" :caption="caption" :alt="alt" :title="caption" :class="$cssResponsive(el.css) + imageDefaultCss" :style="el.style"/>
</template>

<script>
var gsap
export default {
    name: 'MokaImgElement',
    props: ['el'],
    computed:{
        imageDefaultCss(){
            return !this.el.css ? 'w-full h-auto' : ''
        },
        caption(){
            return this.el.image.hasOwnProperty('caption') && this.el.image.caption ?
                this.el.image.caption : 
                    this.el.image.hasOwnProperty('name') && this.el.image.name ?
                        this.el.image.name : 'image'
        },
        alt(){
            return this.el.image.hasOwnProperty('alternativeText') && this.el.image.alternativeText ?
                this.el.image.alternativeText : 
                    this.el.image.hasOwnProperty('name') && this.el.image.name ?
                        this.el.image.name : 'image'
        }
    },
    methods:{
        image(){
                if ( process.env.development ){
                        let img = ''
                        this.el.image.url.includes('//') ?
                            img = this.el.image.url : 
                                img = this.$imageURL(this.el.image)//.url.substring(1)
                        return img
                } else {
                    if ( process.client ){
                    return this.el.image.url.includes('//') ?
                        this.el.image.url :
                            this.$imageURL(this.el.image)
                    }
                }
        }
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
        
        this.el.style = this.el.style
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>