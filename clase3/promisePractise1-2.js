const almacen = ["manzana", "pera", "banana"]

function checkStock(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const encontrado = almacen.includes(product);

            if(encontrado){
                resolve(`Producto ${product} encontrado.`);
            } else {
                reject(`Producto ${product} no encontrado.`);
            }
        },2000);
    });
};

checkStock("manzana").then(resultado => console.log(resultado)).catch(error => console.log(error));

checkStock("kiwi").then(resultado => console.log(resultado)).catch(error => console.log(error));

