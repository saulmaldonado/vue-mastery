const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'Vue Socks.',
        
        selectedVariant: 0,
        google:'https://www.google.com',
        inventory: 0,
        onSale: true,
        brand: "Vue Mastery",
        details: ['80% cotton', '20% polyester', 'Gender-neutral',],
        variants:[
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green.jpg',
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue.jpg',
                variantQuantity: 0,
            }
        ],
        sizes:["small", "medium", "large",],
        cart: 0,
    },

    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        removeFromCart() {
            if(this.cart > 0) {
                this.cart -= 1;
            }
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        stock(){
           return this.variants[this.selectedVariant].variantQuantity;
        },
    },
});
