const app = new Vue({
    el: '#app',
    data: {
        product: 'socks',
        description: 'Vue Socks.',
        image: './assets/vmSocks-green.jpg',
        google:'https://www.google.com',
        inventory: 100,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants:[
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue.jpg'
            }
        ],
        sizes:["small", "medium", "large"],
        cart: 0,


    },
    methods: {
        addToCart: function (){
            this.cart += 1;
        },
        updateProduct: function (variantImage){
            this.image = variantImage;
        }
    }
});
