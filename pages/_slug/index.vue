<template>
    <div>
        <nuxpresso-moka-template v-if="articles  && !loaded" :doc="articles.blocks.json" :article="articles"/>
        <div v-if="!articles" class="nuxpresso-modal w-4/5 p-4 md:p-10 rounded">
            <h1 class="text-10xl font-bold animate-bounce">404</h1>
            <h3>Ooooops the page your are looking for doesn't exists !</h3>
            <button class="danger" @click="$router.push('/')"><i class="animate-pulse bi-arrow-left"></i> Return to Homepage</button>
        </div>
    </div>
</template>

<script>
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState }  from 'vuex'
export default {
    name: 'NuxpArticleSlug',
    components: {
        NuxpressoMokaTemplate
        
    },
    data:()=>({
        articles: [],
        loaded: false,
        template: null
    }),
    computed:{
        //...mapState ( ['settings','default_component'] ),
        /*
        template(){
            return this.articles.blocks.json
            //return this.articles.component ? 
                //this.articles.component.json : this.default_component.json
        },
        */  
    },
    head(){
        /*
        if ( this.articles ){
            return {
                title: this.articles.seo_title ? this.articles.seo_title : this.articles.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles.seo_description ? this.articles.seo_description : this.settings.seo_description || '' }
                ]
            }
            
        }
        */
       return 
        
        
    }, 
    async asyncData({app,route}){
        
        const articles = await app.$whoobe.service ( 'articles' ).find ( {
            query : {
                slug : route.params.slug
            }
        })
        // var blocks = null
        // if ( articles ){
        //     console.log ( articles )
        //     blocks = await app.$whoobe.service ( 'components' ).get ( articles.data[0].template_id )
        // }
        return { 
            articles : articles.data[0],
            //blocks: blocks
        }
    }
  /*
    apollo:{
        articles :{
            query : articleQuery,
            variables() {
                return { slug : this.$route.params.slug }
            },
            watchLoading(loading){
                this.loaded = loading
            },
            update : data => data.articles[0]
        }
    },

    /*
    async asyncData({app,route}){
        const data  = await app.apolloProvider.defaultClient.query({
            query : articleQuery,
            variables: {
                slug : route.params.slug 
            }
        })
        return {
            articles : data.data.articles[0]
        }
    }
    */
}
</script>