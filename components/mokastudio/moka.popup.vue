<template>
<div>
    <div 
        :id="doc && doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc && doc.blocks.length && modal" 
        :key="renewID"
        :class="'overflow-hidden z-2xtop flex flex-no-wrap '+ classe(doc.css)" :style="doc.style + ' ' +  background(doc)" :ref="doc.id" ontouchstart="this.classList.toggle('hover');">
            <transition name="fade">
            <div class="h-full w-full">
                <template v-for="(block,i) in doc.blocks">

                    <moka-element
                        v-if="!block.hasOwnProperty('blocks') && block.tag!='form'"
                        @click="elementAction"
                        :key="block.id"
                        :el="block"
                        :element="block"
                        :develop="false"/> 

                    <moka-preview-single-container 
                        v-if="block.hasOwnProperty('blocks') && !block.hasOwnProperty('blocks_flip')"
                        :key="block.id"
                        :doc="block"
                        :component="$attrs.component"
                        :top="false"
                        :flipside="i"
                        :master="doc.id"
                        :run="index"
                        :index="i"
                        :id="doc.id+i"
                        :level="parseInt($attrs.level)+1" 
                        :zi="$attrs.zi + parseInt($attrs.level)"
                        :class="'absolute top-0 left-0 right-0 bottom-0 ' + getSideClass(i)"/>

                     <moka-flipbox
                        :key="block.id"
                        :component="$attrs.component"
                        :top="false"
                        :index="i"
                        :level="parseInt($attrs.level)+1" 
                        v-if="block && block.hasOwnProperty('blocks') && block.hasOwnProperty('blocks_flip')" 
                        :doc="block"/>    
                </template>
            </div>    
        </transition>
        <i v-if="modal && !doc.popup.modal && doc.popup.close" :class="'z-2xtop material-icons absolute top-0 right-0 m-1 ' + doc.popup.css.close_color + ' ' +  doc.popup.css.close_size" @click="modal=!modal,$store.dispatch('popup',null)">close</i>
    </div>
        <i v-if="modal && doc.popup.modal" :class="'z-2xtop material-icons fixed top-0 right-0 m-2 ' + doc.popup.css.close_color + ' ' +  doc.popup.css.close_size" @click="modal=!modal,$store.dispatch('popup',null)">close</i>
        <div v-if="modal && doc.popup.modal" :class="'fixed top-0 left-0 right-0 bottom-0 min-h-screen min-w-screen ' + doc.popup.css.modal_background + ' opacity-' + doc.popup.css.modal_opacity"></div>
    </div>

</template>

<script>


import MokaElement from './moka.element.component'
import MokaPreviewSingleContainer from './moka.preview.single.container'
import MokaFlipbox from './moka.flipbox'
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
export default {
    name: 'MokaPopupContainer',
    data:()=>({
        index: 0,
        timer: null,
        current: null,
        currentID: null,
        renewID: null,
        modal: false,
        animation: null
    }),
    components: { MokaElement  , MokaPreviewSingleContainer , MokaFlipbox },
    props: [ 'doc'  ],
    computed:{
        animations(){
            return gsapEffects
        },
        
    },
    watch:{
        '$store.state.popup':function(v){
            if ( v && this.doc.hasOwnProperty('popup') && this.doc.popup.trigger && v === this.doc.popup.trigger ){
                this.modal = true
            } else {
                this.modal = false
            }
            
            return
        },
        modal(v){
            if ( !v ){
                window.sessionStorage.setItem('popup-' + this.doc.id,'true')
            }
        }
    },
    methods:{
        elementAction(action){
            this.$emit('action',action)
        },
        getSideClass(i){
            if ( i === 1 ){
                return ' moka-flipper-back'
            }
            return ' moka-flipper-front'
        },
        classe(css){
          if ( !css ) return
          let position = this.doc.popup.position
          let classe = css.hasOwnProperty('css') ? css.css + ' moka-popup-' + this.doc.id + ' ' + css.container : css + ' moka-popup-' + this.doc.id
          return classe.replace('modal','modal' + position )
        },
        stile(block,doc){
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
              ' background-image:url(' + this.$imageURL(block.image) + ');' : ''
        },
        animate(element,id){
            if ( !element ) return 
            let vm = this
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){

                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                ScrollTrigger.create({
                    id: id,
                    start: "top 99%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    
                });
                    
            }
        },
    },
    mounted(){
            if ( this.doc.hasOwnProperty ( 'popup') ){
                if ( !this.doc.popup.trigger ){
                    if ( this.doc.popup.single ){
                    if ( window.sessionStorage.getItem('popup-' + this.doc.id ) ){
                        this.modal = false
                    } else {
                        this.modal = true
                    }
                } else {
                    this.modal = true
                }
                } else {
                    this.modal = false
                }
            }
      this.renewID = this.$randomID()
      //if ( !this.doc && !this.doc.hasOwnProperty('gsap') && !this.doc.gsap && !this.doc.gsap.animation ) return 
            //this.$animation( this.doc , this.doc.id , this.$refs )
    },
    beforeDestroy(){
      clearInterval(this.timer)
      this.timer = null
    }
}

</script>

<style>
.moka-flipper-container {
    perspective: 1000px;
}

.moka-flipper {
    transition:all .6s;
    transform-style:preserve-3d;
}

.moka-flipper-container:hover .moka-flipper ,  .moka-flipper-container.hover .moka-flipper{
    transform: rotateY(180deg);
}

.moka-flipper-front {
    transform: rotateY(0deg);
    backface-visibility: hidden;
}
.moka-flipper-back {
    transform: rotateY(180deg);
    backface-visibility: hidden;
}
</style>