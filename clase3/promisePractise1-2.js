const almacen = ["manzana", "pera", "banana"]

function checkStock(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const encontrado = almacen.includes(product);
            //const encontrado = Math.random() < 0.5; esto hace que no se fije si el producto esta o no en almacen y que sea aleatoria la busqueda pasando true o false como parametro a encontrado.

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

