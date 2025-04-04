function checkStock(product) {
    return new Promise ((resolve, reject) =>{
        setTimeout(() =>{
            const isAbiable = Math.random() < 0.5;
            
            if (isAbiable) {
                resolve(`Producto: ${product} encontrado`);
            } else {
                reject(`Producto: ${product} no encontrado.`);
            }
        }, 2000);
    });
};

async function procesarCompra(product) {
    try {
        const checkingStock = await checkStock(product);
        console.log(`${product} agregado con exito.`);
    } catch (error) {
        console.log(error);
    }
};

procesarCompra("banana");