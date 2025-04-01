const callbackPromesa = (resolve) => console.log('Promesa resuelta')

const miPromesa = new Promise(callbackPromesa);

miPromesa.then(console.log);