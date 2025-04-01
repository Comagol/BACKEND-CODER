const callbackPromesa = (resolve) => {
    const cb = () => {
        resolve('Promesa resuelta')
    }
    setTimeout(cb,2000)
}

const miPromesa = new Promise(callbackPromesa);

miPromesa.then(console.log);