const products = [
    {id: 1, title: 'Notebook', price: 2000, image: 'img/1.jpg'},
    {id: 2, title: 'Mouse', price: 20, image: 'img/2.jpg'},
    {id: 3, title: 'Keyboard', price: 200, image: 'img/3.jpg'},
    {id: 4, title: 'Gamepad', price: 50, image: 'img/4.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <img class="product-img" src="${product.image}">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price} $</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);