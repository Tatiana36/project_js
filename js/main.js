const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



    class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render()
            });
    }
    _getProducts(){

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}
class ProductItem {
    constructor(product, img = 'img/1.jpg'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this._clickBasket();
        this._getBasketProduct()
            .then(data => {
                this.goods = data.contents;
                this.render();
            });
    }
    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
    }
    _getBasketProduct() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const blockBasket = document.querySelector(this.container);
        for (let product of this.goods) {
            const objProduct =  new BasketProduct();

            blockBasket.insertAdjacentHTML('beforeend', objProduct.render(product));

        }
    }
}    

class BasketProduct {
    render (product) {
        return `<div class="product_cart" data-id="${product.id_product}">
        
            <div class="product_info">
            <p class="product_title">${product.product_name}</p>
            <p class="product_quantity">Количество: ${product.quantity}</p>
        <p class="product_price">Цена: $${product.price} </p>
        </div>

        <div class="lower_block">
            <p class="total_product_price">Цена за ${product.quantity} товара $ ${product.quantity*product.price}</p>
            <button class="del_btn" data-id="${product.id_product}">&times;</button>
        </div>
        </div>`


    }
}

new Basket();
