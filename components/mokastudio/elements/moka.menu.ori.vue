<template>
<div>
    <nav v-if="el.element === 'menu'" :class="menu_responsive(el) + ' z-top ' + el.css.align"> 
        <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 
            <nuxt-link :class="el.css.css" v-if="(!item.submenu || !item.submenu.length)  && item.link && !item.link.includes('http')" :to="item.link">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon" @mouseenter="menuover=-1">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
                <i v-if="item.submenu && item.submenu.length" class="material-icons moka-icons">arrow_drop_down</i>
            </nuxt-link>
            
            
            <div v-if="item.submenu && item.submenu.length" @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
                <!-- <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i> -->
            </div>

            <a :class="el.css.css" target="_blank" :href="item.link" v-if="item.link.includes('http')">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span>
            </a>
            <div v-if="!item.link">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
            </div>

            <div :ref="'submenu_'+i" submenu v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.submenu + ' fixed flex flex-col z-highest'">
                
                <div v-if="item.submenu[0].blocks" :class="Object.values(item.submenu[0].blocks.css).join(' ')" :style="background(item.submenu[0].blocks)  + getPos(i)"  @mouseleave="menuover=-1">
                    
                    <template v-for="block in item.submenu[0].blocks.blocks">
                        
                        <moka-element
                        v-if="block && !block.hasOwnProperty('blocks') && !block.hasOwnProperty('blocks')"
                        :key="block.id"
                        :el="block"
                        :data="$attrs.data||null"
                        :currency="$attrs.currency||null"
                        :develop="false"/>

                        <moka-preview-single-container 
                            v-if="block.hasOwnProperty('blocks')"
                            :key="block.id" 
                            :doc="block" 
                            level="1" 
                        />
                    </template>
                </div>
                
                <div v-else v-for="sub in item.submenu">
                    
                    <nuxt-link v-if="!sub.link.includes('http')" :class="el.css.css" :to="sub.link">{{sub.label}}</nuxt-link>
                    <a :href="sub.link" v-if="sub.link.includes('http')" :class="el.css.css">{{sub.label}}</a>
                </div>
            </div>
        </div>
    </nav>
    <!-- responsive -->
    <div class="md:hidden">
        <!--<moka-burger-menu :el="el" :items="el.items"/>-->
    </div>
    <!-- responsive -->
    
    <i :class="'material-icons moka-icons z-max fixed md:hidden top-0 right-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu" style="font-size:2rem;padding:0;">menu</i>
    <transition :name="settings && settings.responsive_menu_transition ? settings.responsive_menu_transition : 'fade'">
        <nav v-if="menu_show" :class="'w-screen max-w-screen ' + el.css.responsive + ' ' + settings.responsive_menu_css "> 
            <i :class="'bi-x-circle moka-icons z-max text-2xl md:hidden fixed top-0 right-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu" style="font-size:2rem;padding:0;"></i>
            <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                
                <nuxt-link :class="el.css.css + ' nuxpresso-menu-responsive-item'" v-if="!item.link.includes('http') && !item.link.includes('#')" :to="item.link">{{ item.label }}</nuxt-link>
                <a :href="item.link" :class="el.css.css + ' nuxpresso-menu-responsive-item'" v-if="item.link.includes('http') || item.link.includes('#')" target="_blank">{{item.label}}</a>
                
                <div v-if="item.submenu && item.submenu.length" :class="el.css.css + ' ml-2 flex flex-col'"> 
                    <div v-for="sub in item.submenu">
                        <nuxt-link  v-if="!item.link.includes('http') && !item.link.includes('#')" :class="el.css.css + ' nuxpresso-menu-responsive-item'" :to="sub.link">{{ sub.label }}</nuxt-link>
                        <a v-if="item.link.includes('http') || item.link.includes('#')" :class="el.css.css + ' nuxpresso-menu-responsive-item'" :href="sub.link">{{ sub.label }}</a>
                    </div>
                </div>
            </div>
        </nav>
    </transition>
        
</div>
</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element.component'
import MokaPreviewSingleContainer from '@/components/mokastudio/moka.menu.container'
import { mapState } from 'vuex'
var gsap
export default {
    name: 'WhoobeMenu',
    components: { MokaElement , MokaPreviewSingleContainer },
    props: ['el'],
    data:()=>({
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false,
        availableX: null,
        availableY: null,
    }),
    computed:{
        ...mapState ( ['settings'] )
    },
    methods:{
        showmenu(){
            this.menu_show =! this.menu_show
        },
        isOver(i){
            return i < 0 ? 'opacity-0' : this.menuover === i ? 'opacity-100 height-grow' : 'opacity-0 height-grow-out'
        },
        menu_responsive(menu){
            if ( menu.type === 'horizontal' && menu.responsive ) return 'hidden flex flex-col md:flex md:flex-row' 
            if ( menu.type === 'horizontal' && !menu.responsive ) return menu.css.container
            if ( menu.type === 'vertical' ) return 'flex flex-col'
        },
        getPos(i,e){
            if ( this.menuover === i ) {
                let posX = this.$refs['submenu_' + i][0].getBoundingClientRect().x
                let posY = this.$refs['submenu_' + i][0].getBoundingClientRect().y
                let width = this.$refs['submenu_' + i][0].clientWidth
                let height = this.$refs['submenu_' + i][0].clientHeight
                //this.availableX = window.innerWidth
                //let availableY = window.innerHeight
               
                if ( posX < 0 ){
                    this.$refs['submenu_' + i][0].style.left = '0px' 
                    this.$refs['submenu_' + i][0].style.transition = '' 
                    this.$refs['submenu_' + i][0].style.transform = 'translateX(0)'
                    console.log ( posX , width, this.$refs['submenu_' + i][0].getBoundingClientRect().x )
                } else {
                    if ( ( posX + width - this.availableX ) > 0 ){
                        this.$refs['submenu_' + i][0].style.transition = ''
                        this.$refs['submenu_' + i][0].style.transform = 'translateX(0)'
                        this.$refs['submenu_' + i][0].style.left = (this.availableX - width) + 'px'
                    }
                }
                if ( ( posY + height - this.availableY ) > 0 ){
                    this.$refs['submenu_' + i][0].style.transform = 'translateY(-110%)'//(availableY - height - 50 ) + 'px'
                }
            }
        },
        background(block){
            if ( !block ) return ''
            return block.hasOwnProperty('image') ?
                //'background-image:url(' + this.$imageURL(block.image) + ')' : ''
                block.image && block.image.url ? 
                        ' background-image:url(' + this.$imageURL(block.image) + ');' :
                             ''  : ''
        },
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
        this.availableX = window.innerWidth
        this.availableY = window.innerHeight
        window.addEventListener('resize',()=> {
            this.availableX = window.innerWidth
            this.availableY = window.innerHeight
        })
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>