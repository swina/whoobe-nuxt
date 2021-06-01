<template>
<div id="loadCart">
    <div id="snipcart" data-config-modal-style="side" :data-api-key="apiKey" hidden></div>
</div>
</template>

<script>

function injectScript(src,css) {
    let target = document.querySelector('#loadCart')
    const snipcartCSS = document.createElement('link')
    snipcartCSS.setAttribute('rel','stylesheet')
    //snipcartCSS.setAttribute('href','https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css')
    snipcartCSS.setAttribute('href',css)

  const snipcartScript = document.createElement("script");
  snipcartScript.setAttribute("type", "text/javascript");
  snipcartScript.setAttribute("charset", "utf-8");
  snipcartScript.setAttribute("data-cfasync", "false");
  // snipcartScript.setAttribute(
  //   "src",
  //   `https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js`
  // );
  snipcartScript.setAttribute(
    "src",
    `${src}`
  );
  target.appendChild(snipcartCSS);
  target.appendChild(snipcartScript);
}

export default {
    name: 'MokaSnipcart',
    data:()=>({
        apiKey : '',
        cart: false
    }),
    computed:{
      now(){
        return new Date()
      }
    },
    mounted(){
        this.apiKey = this.$attrs.plugin.component.config.apikey
        injectScript(this.$attrs.plugin.component.module.url,this.$attrs.plugin.component.module.css)
    }
}
</script>