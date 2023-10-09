
class Calculador{
    // Supongamos que tienes un arreglo de objetos JSON llamado 'datos' con los campos relevantes.



      // Función para calcular las características
   calcularCaracteristicas(datos) {
  /*  const ventanaDatosCuartoSegundo = datos.slice(3, 4); // Cuarto segundo de la ventana

    const magnitudesAceleracion = ventanaDatosCuartoSegundo.map(dato => this.calcularMagnitud({ x: dato.acc_x, y: dato.acc_y, z: dato.acc_z }));
    const magnitudesGiroscopio = ventanaDatosCuartoSegundo.map(dato => this.calcularMagnitud({ x: dato.gyro_x, y: dato.gyro_y, z: dato.gyro_z }));
//console.log(magnitudesAceleracion);
    const acc_max = Math.max(...magnitudesAceleracion);

    console.log(acc_max);
    const acc_kurtosis = this.calcularCurtosis(magnitudesAceleracion);
    const acc_skewness = this.calcularAsimetria(magnitudesAceleracion);

    const gyro_max = Math.max(...magnitudesGiroscopio);
    const gyro_kurtosis = this.calcularCurtosis(magnitudesGiroscopio);
    const gyro_skewness = this.calcularAsimetria(magnitudesGiroscopio);

    const linMaxValue = this.calcularLinMax(datos);
    const postLinMaxValue = this.calcularPostLinMax(datos);
    const postGyroMaxValue = this.calcularPostGyroMax(datos);
*/


const ventanaDatosCuartoSegundo = datos.slice(3, 4); // Cuarto segundo de la ventana (tercera fila)

const magnitudesAceleracion = [];
for (const dato of ventanaDatosCuartoSegundo) {
  const magnitud = this.calcularMagnitud({ x: dato.acc_x, y: dato.acc_y, z: dato.acc_z });
  magnitudesAceleracion.push(magnitud);
}



// Cálculo de máxima magnitud de giroscopio
const acc_max = Math.max(...magnitudesAceleracion);



const magnitudesGiroscopio = [];
for (const dato of ventanaDatosCuartoSegundo) {
  const magnitud = this.calcularMagnitud({ x: dato.gyro_x, y: dato.gyro_y, z: dato.gyro_z });
  magnitudesGiroscopio.push(magnitud);
}

// Cálculo de magnitudes de aceleración
const magnitudesAceleracionDeTodaLaventana = [];
for (const dato of datos) {
  const magnitud = this.calcularMagnitud({ x: dato.acc_x, y: dato.acc_y, z: dato.acc_z });
  magnitudesAceleracionDeTodaLaventana.push(magnitud);
}

// Cálculo de magnitudes de giroscopio
const magnitudesGyroscopioDeTodaLaventana = [];
for (const dato of datos) {
  const magnitud = this.calcularMagnitud({ x: dato.gyro_x, y: dato.gyro_y, z: dato.gyro_z });
  magnitudesGyroscopioDeTodaLaventana.push(magnitud);
}

// Cálculo de curtosis y asimetría de aceleración
const acc_kurtosis = this.calcularCurtosis(magnitudesAceleracionDeTodaLaventana);
const acc_skewness = this.calcularAsimetria(magnitudesAceleracionDeTodaLaventana);

// Cálculo de máxima magnitud de giroscopio
const gyro_max = Math.max(...magnitudesGiroscopio);



const gyro_kurtosis = this.calcularCurtosis(magnitudesAceleracionDeTodaLaventana);
const gyro_skewness = this.calcularAsimetria(magnitudesAceleracionDeTodaLaventana);
// Resto de los cálculos
const linMaxValue = this.calcularLinMax(datos);
const postLinMaxValue = this.calcularPostLinMax(datos);
const postGyroMaxValue = this.calcularPostGyroMax(datos);

  const campos=[
       /* 
        26.039918537018742,
        7.309796699430188,
        20.378162104442573,
        2.7824758875712914,
        11.131079696122551,
        3.8913614045630966,
        1.5929268156092316,
        7.086617599915782,
        10.790400250203442,*/


          acc_max,
          acc_kurtosis,
          acc_skewness,
          gyro_max,
          gyro_kurtosis,
          gyro_skewness,
          linMaxValue,
          postLinMaxValue,
          postGyroMaxValue,
          
        
    ];

    return campos;

    /* return [acc_max,
      acc_kurtosis,
      acc_skewness,
      gyro_max,
      gyro_kurtosis,
      gyro_skewness,
      linMaxValue,
      postLinMaxValue,
      postGyroMaxValue,
      ];*/
  }
 calcularMagnitud(vector) {
return Math.sqrt(vector.x ** 2 + vector.y **2 + vector.z ** 2);
}

// Función para calcular la curtosis de un conjunto de datos
 calcularCurtosis(datos) {



const n = datos.length;

const media = datos.reduce((sum, val) => sum + val, 0) / n;
const sumatoria4 = datos.reduce((sum, val) => sum + Math.pow(val - media, 4), 0);
const desviacionEstandar = Math.sqrt(sumatoria4 / n);
const curtosis = sumatoria4 / (n * Math.pow(desviacionEstandar, 4));

return curtosis;
}

// Función para calcular la asimetría de un conjunto de datos
 calcularAsimetria(datos) {

const n = datos.length;
const media = datos.reduce((sum, val) => sum + val, 0) / n;
const sumatoria3 = datos.reduce((sum, val) => sum + Math.pow(val - media, 3), 0);
const desviacionEstandar = Math.sqrt(datos.reduce((sum, val) => sum + Math.pow(val - media, 2), 0) / n);
const asimetria = sumatoria3 / (n * Math.pow(desviacionEstandar, 3));
return asimetria;
}


// Función para calcular lin_max
 calcularLinMax(dataset) {

let lin_max = 0; // Inicializar en 0

for (const fila of dataset) {
const acc_magnitud = this.calcularMagnitud({
  x: fila.acc_x,
  y: fila.acc_y,
  z: fila.acc_z
});

// Para calcular lin_max (Máxima aceleración lineal en el 4to segundo)
if (fila.timestamp >= 4 && fila.timestamp < 5) {
  if (acc_magnitud > lin_max) {
    lin_max = acc_magnitud;
  }
}
}

return lin_max;
}

// Función para calcular post_lin_max
 calcularPostLinMax(datos) {
  

let post_lin_max = 0; // Inicializar en 0

for (const fila of datos) {
const acc_magnitud = this.calcularMagnitud({
  x: fila.acc_x,
  y: fila.acc_y,
  z: fila.acc_z
});

// Para calcular post_lin_max (Máxima aceleración lineal en el 6to segundo)
if (fila.timestamp >= 6 && fila.timestamp < 7) {
  if (acc_magnitud > post_lin_max) {
    post_lin_max = acc_magnitud;
  }
}
}

return post_lin_max;
}

// Función para calcular post_gyro_max
 calcularPostGyroMax(datos) {
  

let post_gyro_max = 0; // Inicializar en 0

for (const fila of datos) {
const gyro_magnitud = this.calcularMagnitud({
  x: fila.gyro_x,
  y: fila.gyro_y,
  z: fila.gyro_z
});

// Para calcular post_gyro_max (Máxima magnitud del giroscopio en el 6to segundo)
if (fila.timestamp >= 6 && fila.timestamp < 7) {
  if (gyro_magnitud > post_gyro_max) {
    post_gyro_max = gyro_magnitud;
  }
}
}

return post_gyro_max;
}

}


module.exports = Calculador;

/*
const datos = [
    { timestamp: 1, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 2, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 3, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 4, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 5, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 6, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    // Más datos aquí
  ];

  // Crear una instancia de la clase AlgoritmoDeCaidas
  const algoritmo = new Calculador();
  

  const caracteristicas = algoritmo.calcularCaracteristicas(datos);
  console.log(caracteristicas);

*/