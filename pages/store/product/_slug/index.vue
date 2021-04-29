<template>
    <div v-if="getBySlug">
        <div v-if="current">
        {{ current.name }}
        <img :src="current.image_uri"/>
        <button class="snipcart-add-item px-2 py-2 success text-2xl"
            :data-item-id="current._id"
            :data-item-price="current.price.toFixed(2)"
            :data-item-url="'/store/product/' + current.slug"
            :data-item-description="current.name"
            :data-item-image="current.image_uri"
            :data-item-name="current.name">BUY</button>
        </div>
        <div v-else>No product found</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'WhoobeStoreProductSlug',
    
    data:()=>({
        current: null
    }),
    computed:{
        ...mapState ( ['products'] ),
        getBySlug(){
            
            let product = this.products.data.filter ( product => {
                 return product.slug === this.$route.params.slug
            })[0]
            this.current = product
            return true
            
        }   
    },
    // async asyncData( { app } ){
    //     const prods = await app.$whoobe.service('products').find ( { query: { $limit: 200 }} )
    //     return {
    //         products : prods
    //     }
    // }
}
</script>