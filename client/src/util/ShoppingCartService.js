const shoppingCartService = {
    itemTotal() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                return JSON.parse(localStorage.getItem('cart')).length
            }
        }
        return 0
    },
    addItem(item, callBack) {

        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            let targetIndex = -1;
            let quantity = 0;
            
            for(let i=0; i < cart.length; i++){
                if(cart[i].product.id === item.id){
                    quantity = cart[i].quantity + 1;
                    targetIndex = i;
                    break;
                }
            }

            // if the item is already in the shopping cart, update the quantity 
            // otherwise add with a quantity of 1
            if(targetIndex < 0){
                cart.push({
                    product: item,
                    quantity: 1,
                    owner: item.ownerId
                })
            }
            else{
                if(targetIndex >= 0)
                    cart[targetIndex].quantity = quantity;
            }

            localStorage.setItem('cart', JSON.stringify(cart))
            callBack()
        }
    },
    updateCart(itemIndex, quantity) {
        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart[itemIndex].quantity = quantity
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    },
    getCart() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                return JSON.parse(localStorage.getItem('cart'))
            }
        }
        return []
    },
    removeItem(itemIndex) {
        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.splice(itemIndex, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        return cart
    },
    emptyCart(callBack) {
        if (typeof window !== "undefined") {
            localStorage.removeItem('cart')
            callBack()
        }
    }
}

export default shoppingCartService

// reference: https://github.com/shamahoque/mern-marketplace/blob/master/client/cart/cart-helper.js