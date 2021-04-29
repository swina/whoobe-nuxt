<template>
    <slide :class="el.css.css" :el="el">
        
        <template v-for="item in items">
            <nuxt-link :key="item.label" v-if="!item.link.includes('http')" :to="item.link" :class="'my-3 ' + linkCSS">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
            </nuxt-link>
            <a :key="item.label" v-if="item.link.includes('http')" :href="item.link" target="_blank">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
            </a>
            <div :key="item.label" v-if="item.hasOwnProperty('submenu')" class="ml-8 my-1 flex flex-col">
                <moka-burger-menu :el="el" :items="item.submenu"/>
            </div>
        </template>
        
    </slide>
</template>

<script>
import  Slide  from './menu/Menu/slide'
export default {
    name: 'MokaBurgerMenu',
    components: {
        Slide 
    },
    props: ['el','items'],
    computed: {
        linkCSS(){
            let classi = this.el.css.responsive.split ( ' ' )
            let css = ''
            classi.map ( cl => {
                cl.includes('linkcss') ?
                    css = cl.split(':')[1] : null
            })
            return css
        }
    }
}
</script>