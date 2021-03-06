/*import feathers  from '@feathersjs/feathers' 
import socketio from '@feathersjs/socketio-client' 
import io from 'socket.io-client' 

let whoobeCMSURL = 'http://localhost:3030/' //process.env.API_URL

const socket = io( whoobeCMSURL , //process.env.VUE_APP_APISERVER,
  {
    transports: ['websocket']
  }
)

const whoobe = feathers()
  .configure(socketio(socket,{
    timeout:20000
}))

import products from '@/components/plugins/store/nuxpresso/products.json'
*/
export const strict = false
import whoobe from '../plugins/server.js'
export const state = () => ({
    categories: null,
    settings: null,
    homepage: null,
    homepage_template: null,
    article: null,
    current_article: null,
    articles: null,
    header_offset: 0,
    components: null,
    default_component: null,
    media: null,
    loop_action: null,
    loop_template: null,
    loop_articles:[],
    popup: false,
    plugins:null,
    products: null
})

export const mutations = {
    SET_SETTINGS ( state , settings ){
        state.settings = settings
    },
    SET_CATEGORIES ( state , categories ){
        state.categories = categories
    },
    SET_HOMEPAGE ( state , homepage ){
        state.homepage = homepage
    },
    SET_HOMEPAGE_TEMPLATE ( state , template ){
        state.homepage_template = template
    },
    SET_ARTICLE ( state , article ){
        state.current_article = article
    },
    SET_HEADER_OFFSET ( state , offset ){
        state.header_offset = offset
    },
   
    SET_MEDIA ( state , media ){
        state.media = media
    },
    SET_COMPONENTS ( state , components ){
        state.components = components
    },
    SET_DEFAULT_COMPONENT ( state , component ){
        state.default_component = component
    },
    SET_LOOP_ACTION ( state , action ){
        state.loop_action = action
    },
    SET_POPUP ( state , popup ){
        state.popup = popup
    },
    SET_LOOP_TEMPLATE ( state , template ){
        state.loop_template = template
    },
    SET_LOOP_ARTICLES ( state , articles  ){
        state.loop_articles = articles 
    },
    SET_PLUGINS ( state , plugins ){
        state.plugins = plugins
    },
    SET_PRODUCTS ( state , products ){
        state.products = products
    }

}

export const actions = {
    async loadHome( { commit } ){
        const homepage = await whoobe.service ( 'articles' ).find ( {
            query : {
                homepage: true
            }
        })
        commit ( 'SET_HOMEPAGE' , homepage.data[0] )
        const shop = await whoobe.service ( 'products' ).find( { query: { $limit: 200 }})
        commit ( 'SET_PRODUCTS' , shop )
        const plugins = await whoobe.service ( 'plugins' ).find ( )
        commit ( 'SET_PLUGINS' , plugins.data )
        //const articles = await whoobe.service ( 'articles' ).find ( { query: { $limit: 200 } } )
        //commit ( 'SET_ARTICLES' , articles.data )
    },

    products ( { commit } , products ){
        commit ( 'SET_PRODUCTS' , products)
    },
    async loadCategories ( { commit } ) {
        const response = await this.app.apolloProvider.defaultClient.query( { query : categoriesQuery })
        commit ( 'SET_CATEGORIES' , response.data.categories )
        
        const template = await this.app.apolloProvider.defaultClient.query( { query : loopComponent })
        commit ( 'SET_LOOP_TEMPLATE' , template.data.components[0] )

        const articles = await this.app.apolloProvider.defaultClient.query( { query : loopQuery })
        commit ( 'SET_LOOP_ARTICLES' , articles.data.articles )

    },
    
    async loadSettings ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : settingsQuery })
        commit ( 'SET_SETTINGS' , response.data.setting )

        
        const def_comp = await this.app.apolloProvider.defaultClient.query( { query : defaultComponent })
        commit ( 'SET_DEFAULT_COMPONENT' , def_comp.data.components[0] ) 
        
        const plugins_query = await this.app.apolloProvider.defaultClient.query( { query : pluginsQry })
        const plugins_preload = plugins_query.data.plugin.plugins
        commit ( 'SET_PLUGINS' , plugins_preload  ) 
        
        //const components = await this.app.apolloProvider.defaultClient.query ( { query : componentsQuery } )
        //commit ( 'SET_COMPONENTS' , components.data ) 
        //const default_comp = components.data.components.filter ( comp => comp.default )[0]
        //commit ( 'SET_DEFAULT_COMPONENT' , default_comp )
        
    },
    async loadHomepage ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : homepageQuery } )
        let homepage = response.data.articles[0]
        commit ( 'SET_HOMEPAGE' , homepage )
    },
    async changeSettings ( { commit } , settings ){
        commit ( 'SET_SETTINGS' , settings )
    },
    async loadMedia ( { commit } , media ){
        commit ( 'SET_MEDIA' , media )
    },
    darkMode ( { commit } , layout ){
        commit ( 'SET_LAYOUT' , layout )
    },
    
    async updateSettings ( { commit } , settings ){
        commit ( 'SET_SETTINGS' , settings )
    },
    set_current_article ( { commit } , article ){
        commit ( 'SET_ARTICLE' , article )
    },
    header_offset ( { commit } , offset ){
        commit ( 'SET_HEADER_OFFSET' , offset )
    },
    set_loop_action ( { commit } , action ){
        commit ( 'SET_LOOP_ACTION' , action )
    },
    popup( { commit } , popup ){
        commit ( 'SET_POPUP' , popup)
    }
}

