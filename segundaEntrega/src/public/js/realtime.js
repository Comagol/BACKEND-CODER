const socket = io();

socket.on('productsUpdated', (products) => {
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
        <h3>${product.title}></h3>
        <p>${product.description}</p>
        <p>Precio: ${product.price}</p>
        <hr/>
        `;
        container.appendChild(div);
    });
});