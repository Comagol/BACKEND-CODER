function checkStock(product) {
    return new Promise ((resolve, reject) =>{
        setTimeout(() =>{
            const isAviable = Math.random() < 0.5;
            
            if (isAviable) {
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
        console.log(checkingStock);
    } catch (error) {
        console.log(error);
    }
};

procesarCompra("banana");
procesarCompra("pera");
procesarCompra("televisor");