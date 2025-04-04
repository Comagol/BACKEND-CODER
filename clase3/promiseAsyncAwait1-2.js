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

function confirmarPago() {
    return new Promise ((resolve, reject) =>{
        const paymentAprobe = Math.random() < 0.5;

        if(paymentAprobe) {
            resolve(`Pago aprovado.`);
        } else {
            reject(`Pago rechazado.`);
        }
    });
};

async function procesarCompra(product) {
    try {
        const checkingStock = await checkStock(product);
        console.log(checkingStock);
        const waitingPayment = await confirmarPago();
        console.log(waitingPayment);

        console.log(`Compra del ${product} realizada correctamente.`)
    } catch (error) {
        console.log(`Error al procesar la compra de ${product}: ${error}`);
    }
}

procesarCompra("banana");
procesarCompra("pera");
procesarCompra("televisor");