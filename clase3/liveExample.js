const callbackPromesa = (resolve) => {
    const cb = () => {
        resolve('Promesa resuelta')//Luego se llama a esto del tiempo pasado en el timeout
    }
    setTimeout(cb,2000)//luego es llamado este setTimeout
}

const miPromesa = new Promise(callbackPromesa);

//primero en ejecutarse el .then (suscripcion a la promesa)
miPromesa.then(console.log);
//por ultimo se ejecuta el console.log

//esto va a aparecer primero en la consola, ya que estamos trabajando con codigo asincrono.
console.log('Hola desde el hilo principal, que no se encuentra bloqueado.')