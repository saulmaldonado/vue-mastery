Vue.config.devtools = true;

const eventBus = new Vue();


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
        cart: {
            type: Array,
        },
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
            <button @click="removeFromCart"
                    :disabled="!inCart"
                    :class="{ disabledButton: !inCart }">Remove from Cart</button>

        </div>

        <product-tabs :reviews="reviews" :description="description" :shipping="shipping"></product-tabs>


    `,
    data() {
        return {
        product: 'Socks',
        description: ' These are custom socks designed by Vue Mastery.',
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
        reviews: []
        } 
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },


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
            return '$2.99'
        },
        inCart() {
            return this.cart.includes(this.variants[this.selectedVariant].variantId);
        }

    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        })
    },
});

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <h3> Add a Review </h3>


            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>


            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <p> Would you recommend this product?</p>
                
                <label for="yes">Yes</label>
                <input type="radio" id="yes" :value=true v-model="recommend">

                <label for="no">No</label>
                <input type="radio" id="no" :value=false v-model="recommend">
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return{
            name: "",
            review: "",
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if (this.name.trim() !== "" && this.review.trim() !== "" && this.rating && this.recommend !== null){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                };
    
                eventBus.$emit('review-submitted', productReview);
    
                this.name = "";
                this.rating = null;
                this.review = "";
                this.recommend = null;
            } else {
                this.errors = [];

                if (this.name.trim() === "") this.errors.push('Name required.');
                
                if (this.review.trim() === "") this.errors.push('Review required.');

                if (!this.rating) this.errors.push('Rating required.');

                if (this.recommend === null) this.errors.push('Recommendation required.')
            }
        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        shipping: {
            type: String,
            required: true,
        }
    },
    template: `
        <div>
            <span class="tab"
                  :class="{ activeTab: selectedTab === tab }"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="selectedTab = tab">
                  {{ tab }}</span>


            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>{{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <p>{{ review.recommend ? 'Yes' : 'No' }}</p>
                    </li>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Make a Review'"></product-review>

            <div v-show="selectedTab === 'Description'">
                <p>{{ description }}</p>
            </div>

            <div v-show="selectedTab === 'Shipping'">
                <p>{{ shipping }}</p>
            </div>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Description', 'Shipping'],
            selectedTab: 'Reviews',
        }
    }
});



const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        addToCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            if(this.cart.length > 0) {
                const index = this.cart.indexOf(id);
                if (index >= 0){
                    this.cart.splice(index, index + 1);
                } else {
                    console.log('Item is not in cart.')
                }
            } else {
                console.log('Cart is currently empty.')
            }
        },
    }
});
