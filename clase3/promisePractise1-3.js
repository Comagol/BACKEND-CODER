const usuarios = ["fran", "pedro", "javier", "chula"];

function usserCheck(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //const usserFound = usuarios.includes(name);
            const usserFound = Math.random() < 0.5;

            if (usserFound){
                resolve("usuario encontrado en la base de datos");
            } else {
                reject("Usuario no encontrado en la base de datos.");
            }
        }, 2000);
    });
};

usserCheck("fran").then((message) => {
        console.log(message);
    }).catch((error) => {
        console.log(error)
});
