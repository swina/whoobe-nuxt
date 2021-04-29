<template>
<div id="loadChat" :key="$randomID()" :ref="$randomID()">
</div>
</template>

<script>

function injectScript(chatId) {
  const jivoScript = document.createElement("script");
  jivoScript.setAttribute("type", "text/javascript");
  jivoScript.setAttribute("charset", "utf-8");
  jivoScript.setAttribute("data-cfasync", "false");
  jivoScript.setAttribute(
    "src",
    `//code.jivosite.com/widget/${chatId}`
  );
  let target = document.querySelector('#loadChat')
  target.appendChild(jivoScript);
}

export default {
    name: 'MokaJivoChat',
    data:()=>({
        chatId : 'u5ezjfPpoC'
    }),
    mounted(){
        injectScript(this.chatId)
    }
}
</script>