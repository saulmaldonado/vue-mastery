Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <img :src="image">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <h2>Description: {{ description }}</h2>
            <p v-if="onSale">{{ isOnSale }}</p>
            <p v-if="stock > 10">In stock</p>
            <p v-else-if="stock <= 10 && stock > 0"> Almost out of stock </p>
            <p v-else 
            :class="[stock < 1 ? 'sutOfStock' : '']">Out of stock</p>
            <p v-show="stock">Current stock: {{ stock }}</p>
            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <button @click="addToCart"
                    :disabled="stock < 1"
                    :class="{ disabledButton: stock < 1 }">Add to Cart</button>
            <button @click="removeFromCart">Remove from Cart</button>

            <div class="cart">
                <p>Cart ({{ cart }})</p>
            </div>
        </div>

    </div>
    `,
    data() {
        return {
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
        } 
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
        stock() {
           return this.variants[this.selectedVariant].variantQuantity;
        },
        isOnSale() {
            return `${this.title} is currently on sale!`;
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        },
    },
});

Vue.component('product-details', {
    props: {
        details: {
            type: String,
            required: true,
        }
    },
    template: `
        <p> dklfsldkjfslkdjf </p>
    `,
});



const app = new Vue({
    el: '#app',
    data: {
        premium: false,
        details: 'These are Vue Mastery Socks.',
    },
});
