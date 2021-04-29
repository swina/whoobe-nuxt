<template>
  <div id="loadShop" :key="$randomID()" :ref="$randomID()" :date="now">
      <div :id="'my-store-' + shopID" :key="$randomID()" :ref="$randomID()"></div>
  </div>
</template>

<script>

function injectEcwidScript(storeId,id) {
  const ecwidScript = document.createElement("script");
  ecwidScript.setAttribute("type", "text/javascript");
  ecwidScript.setAttribute("charset", "utf-8");
  ecwidScript.setAttribute("data-cfasync", "false");
  ecwidScript.setAttribute(
    "src",
    `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=${new Date()}&id=${id}`
  );
  ecwidScript.onload = injectEcwidProductBrowser(storeId);
  let target = document.querySelector('#loadShop')
  target.appendChild(ecwidScript);
}

function injectEcwidProductBrowser(storeId) {
  return function () {
    const ecwidBrowserScript = document.createElement("script");
    ecwidBrowserScript.setAttribute("type", "text/javascript");
    ecwidBrowserScript.setAttribute("charset", "utf-8");
    ecwidBrowserScript.text = `xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-${storeId}");`;
    let target = document.querySelector('#loadShop')
    target.appendChild(ecwidBrowserScript);
  }
}
export default {
    name: 'MokaEcwidshop',
    data:()=>({
        shopID : ''
    }),
    computed:{
      
    },
    mounted(){
        if ( process.client ){
            //window.location.reload()
            console.log ( 'loading shop ...')
            this.loadScript()
        }
    },
    
    methods:{
      async loadScript(){
          this.shopID = this.$attrs.el.plugin.config.storeId
          injectEcwidScript(this.shopID,this.$randomID())
      },
      now(){
        this.shopID = this.$attrs.el.plugin.config.storeId
        injectEcwidScript(this.shopID,this.$randomID())
        return new Date()
      }
    },
    
}
</script>