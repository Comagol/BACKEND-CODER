const authenticator = new Promise((resolve, reject) => {
    setTimeout(() =>{
        const isAuthenticated = false;

        if (isAuthenticated) {
            console.log("Usuario Autenticado con exito");
        } else {
            console.log("Usuario no verificado.");
        };
    },2000);
 });

console.log("Autenticando usuarios...");

authenticator.then((mensaje) => {
    console.log(mensaje);
}).catch((error) => {
    console.log(error)
});



