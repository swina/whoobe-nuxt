import dotenv from 'dotenv'
import path from 'path'
import axios from 'axios'
import fs from 'fs-extra'
import whoobe  from './plugins/server'

dotenv.config()
var whoobeCMSURL

/**
 * 
 * Multisite configuration
 * You can run a single nuxpresso installation for multiple sites, without cloning the repo each time
 * Create a main working folder and relative subfolders 
 * ex.
 *  /myfolder/
 *    /website 1
 *    /website 2
 * 
 * Create a /myfolder/config.js 
 * const strapi = { url: '<STRAPI_URL>>' , dist: '<PATH_OF_DIST_FOLDER>' }
 * module.exports = strapi
 * 
 * Changing the strapi url and the dist folder path you can use a single nuxpresso installation
 * to generate different website powered by Strapi
 */
var linkFonts = process.env.FONT_FAMILIES
if ( process.env.MULTI_SITE && process.env.MULTI_CONFIG_PATH ){
  const workspace = path.resolve ( '../workspace/' ) + '/config.js' 
  whoobeCMSURL = require ( workspace ) //process.env.MULTI_CONFIG_PATH ) 
  linkFonts = whoobeCMSURL.fonts
  console.log ( 'CMS => ' , whoobeCMSURL.url )
  console.log ( 'Destination folder => ' , whoobeCMSURL.dist )
  console.log ( 'Fonts =>' , whoobeCMSURL.fonts )
  console.log ( 'Copy uploads folder => ' , whoobeCMSURL.uploads)
} else {
  whoobeCMSURL = null
}

//Full Static mode and local upload copy Strapi uploads folder to static folder
function importAssets(){
    //With Promises:
      
      // if ( whoobeCMSURL.uploads ){
      //   fs.copy( process.env.UPLOADS_FOLDER ,'./static/uploads' )
      //   .then(() => {
      //     console.log('Assets imported!')
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
      // } else {
      //   fs.emptyDirSync('./static/uploads')
      //   fs.emptyDirSync ( whoobeCMSURL.dist + '/uploads' )
      // }
    
}

//default dynamic routes used by nuxpresso
let dynamicRoutes = () => {
  //import assets before
  //process.env.FULL_STATIC && process.env.LOCAL_ASSETS ? importAssets() : null

  //generate dynamic routes /category/<category_slug>
  let url = whoobeCMSURL.url || process.env.API_URL
 
  return new Promise( (resolve) => {
    let articles , products 
    //whoobe.service('articles').timeout = 30000
    whoobe.service('articles').find({ query: { $limit: 200 }}).then ( response => { 
    //axios.get( url + 'articles?$limit=200' ).then( response => {
      articles = response.data.map ( page => {
        return {
          route: '/' + page.slug,
          payload: page
        }
      })
      return articles
    }).then ( data => {
      console.log ( 'articles=>' ,  data.length )
      whoobe.service('products').find({ query: { $limit: 200 }}).then ( response => { 
      //axios.get( url + 'products?$limit=200' ).then( response => {
        products = response.data.map( product => {
          return {
            route: '/store/product/' + product.slug,
            payload: product
          }
        })
        console.log ( 'products=>' , products.length )
        resolve ( data.concat(products) )
      })
    })
    /*
      axios.get( url + 'categories' ).then ( response => {
        const cats = response.data
        axios.get( url + 'articles' ).then( response => {
          categories = cats.map ( el => {
            return {
              route: '/category/' + el.slug,
              payload: response.data
            }
          })
          resolve ( categories )
        })
      })
    })
    resolve ( articles.concat(categories) )
    */
  })
}

export default {
  
  target: 'static',
  ssr: true,
  /*
   ** Headers of the page
   */
  env: {
    strapiBaseUri: whoobeCMSURL.url || process.env.API_URL || "http://localhost:3030",
    VERSION: "0.0.1",
    emailSender : process.env.FORM_SENDER,
    emailConfirm: process.env.FORM_CONFIRM,
    development : process.env.NODE_ENV === 'development' ? true : false
  },

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "whoobe",
        name: "whoobe static site generator",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        //Used fonts
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family="  + linkFonts
      },
      {  
        //Material Design Icons
        rel: "stylesheet" ,
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      },
      { 
        //Bootstrap Icons
        rel: "stylesheet" ,
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      }
      

    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loadingIndicator: {
    color: '#c3c3c3',
    background: 'white',
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/utils.js" , 
    "~/plugins/moka.js" , 
    "~/plugins/feathers.js" , 
    { src: "~/plugins/animations.js" , ssr: false } , 
    { src: "~/plugins/gsap.js" , ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/recaptcha',
    '@nuxtjs/google-analytics'
  ],
  tailwindcss: {
      exposeConfig: true
  },
  //components: true ,
  recaptcha : {
    siteKey: process.env.RECAPTCHA,
    version: 3,
    size: 'invisible',
    hideBadge: true
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      'postcss-nested': {}
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [ 
    "@nuxtjs/tailwindcss",
    "@nuxtjs/axios"
  ],
  axios: {
    baseUrl: whoobeCMSURL.url || process.env.API_URL 
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS || 'UA-XXX-X'
  },
  /*
   ** Build and generate configuration
   */
  generate: {
    routes: dynamicRoutes, //add dynamic routes
    fallback: true,
    dir: whoobeCMSURL.dist || process.env.DESTINATION_FOLDER || 'dist'
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    srcDir: 'src',
    buildDir: whoobeCMSURL.dist || process.env.DESTINATION_FOLDER || 'dist',
    extractCSS: true,
    
    // this is not required, output as one css file instead of one by page.
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extend(config, ctx) {},
    transpile: [
      "gsap"
    ],
    babel: {
      presets({ isServer }) {
        return [  
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
              useBuiltIns: "entry"
            }
          ]
        ]
      }
    }
  }
};
