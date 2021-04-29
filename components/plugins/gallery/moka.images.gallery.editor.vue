<template>
    <component :is="tag" :class="$attrs.plugin.css.css + ' ' + $attrs.plugin.css.container">
        Images Gallery Editor
        <button class="z-2xtop" @click="addImage">Add image</button>

    </component>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaGalleryEditor',
    computed: {
        ...mapState ( ['moka'] ),
        tag(){
            return this.$attrs.plugin.element
        }
    },
    methods:{
        addImage(){ 
            let imgObject = this.moka.elements.moka.media.filter ( el => { return el.element === 'img' } )[0]
            this.$attrs.plugin.gallery.push ( imgObject )
            return 
        }
    }
}
</script>
