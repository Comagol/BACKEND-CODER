const authenticator = new Promise((resolve, reject) => {
    setTimeout(() =>{
        let isAuthenticated = Math.random() < 0.5;
        console.log(isAuthenticated);

        if (isAuthenticated) {
            console.log("Usuario Autenticado con exito");
        } else {
            console.log("Usuario no verificado.");
        };
    },200);
 });

console.log("Autenticando usuarios...");

authenticator.then((mensaje) => {
    console.log(mensaje);
}).catch((error) => {
    console.log(error)
});



