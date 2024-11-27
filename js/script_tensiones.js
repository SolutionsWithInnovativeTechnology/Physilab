// Inicio del programa
const canvas = document.getElementById('diagram');
const ctx = canvas.getContext('2d');
const numTensionesInput = document.getElementById('numTensiones');
const inputsTensionContainer = document.getElementById('inputsTension');
const pesoInput = document.getElementById('peso');
const btnCalcular = document.getElementById('btnCalcular');
const resultContainer = document.getElementById('resultados');
const resultadoDiv = document.getElementById('resultadoDiv');

numTensionesInput.addEventListener('input', () => {
    const num = parseInt(numTensionesInput.value);
    if (num > 2) {
        alert('¡No puede tener más de dos tensiones!');
        numTensionesInput.value = 1;
        createinputsTension(1);
    } else if (num < 1) {
        alert('¡No puede tener menos de una tension!');
        numTensionesInput.value = 1;
        createinputsTension(1);
    } else {
        createinputsTension(num);
    }
});

pesoInput.addEventListener('input', updateDiagram);

inputsTensionContainer.addEventListener('input', updateDiagram);

btnCalcular.addEventListener('click', () => {
    if (esValido()) {
        calculate();
    } else {
        alert('¡Faltan datos por ingresar!');
    }
});

createinputsTension(1);
updateDiagram();


/************ FUNCIONES *************/

/**
 * Verifica que todos los ángulos y tensiones sean válidos.
 * Reglas de validación:
 * 1. Ningún ángulo puede ser 0 o estar vacío.
 * 2. Ninguna tensión puede ser 0 o estar vacía.
 * 3. La combinación de un ángulo y una tensión debe ser válida.
 * @returns {boolean} Verdadero si alguna de las validaciones pasan.
 */
function esValido() {
    const anguloInputs = document.querySelectorAll('.angulo-input');
    const tensionInputs = document.querySelectorAll('.tension-input');
    let v1 = true;
    let v2 = true;
    let v3 = true;

    // Validar que ningún ángulo sea 0 o vacío
    for (const angulo of anguloInputs) {
        if (Number(angulo.value) === 0 || angulo.value.trim() === '') {
            v1 = false;
            break;
        }
    }

    // Validar que ninguna tensión sea 0 o vacía
    for (const tension of tensionInputs) {
        if (Number(tension.value) === 0 || tension.value.trim() === '') {
            v2 = false;
            break;
        }
    }

    // Validar combinaciones ángulo-tensión
    for (let i = 0; i < tensionInputs.length; i++) {
        const angulo = Number(anguloInputs[i].value);
        const tension = Number(tensionInputs[i].value);
        if ((angulo === 0 && tension === 0) || (isNaN(angulo) || isNaN(tension))) {
            v3 = false;
            break;
        }
    }

    // Retorna verdadero si todas las validaciones pasan
    return v1 || v2 || v3;
}


/**
 * Crea los inputs para ingresar las tensiones y sus ángulos.
 * @param {number} num - Número de tensiones.
 */
function createinputsTension(num) {
    inputsTensionContainer.innerHTML = '';
    for (let i = 0; i < num; i++) {
        const div = document.createElement('div');
        div.className = 'mb-3';
        div.innerHTML = `
                    <div class="row">
                        <div class="col-6">
                            <label for="tension${i}" class="form-label">Tensión ${i + 1} (N):</label>
                            <input type="number" class="form-control tension-input" id="tension${i}" placeholder="0">
                        </div>
                        <div class="col-6">
                            <label for="angulo${i}" class="form-label">Ángulo ${i + 1} (°):</label>
                            <input type="number" class="form-control angulo-input" id="angulo${i}" min="0" max="360" placeholder="0">
                        </div>
                    </div>
                `;
        inputsTensionContainer.appendChild(div);
    }
    updateDiagram();
}

/**
 * Dibuja una flecha en el canvas desde un punto a otro.
 * 
 * @param {number} fromX - The x-coordinate of the starting point.
 * @param {number} fromY - The y-coordinate of the starting point.
 * @param {number} toX - The x-coordinate of the endpoint.
 * @param {number} toY - The y-coordinate of the endpoint.
 * @param {string} color - The color of the arrow.
 */
function drawArrow(fromX, fromY, toX, toY, color) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    const angulo = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - 10 * Math.cos(angulo - Math.PI / 6), toY - 10 * Math.sin(angulo - Math.PI / 6));
    ctx.lineTo(toX - 10 * Math.cos(angulo + Math.PI / 6), toY - 10 * Math.sin(angulo + Math.PI / 6));
    ctx.fillStyle = color;
    ctx.fill();
}

/**
 * Convierte un ángulo en grados a radianes.
 * 
 * @param {number} anguloGrados - El ángulo en grados.
 * @returns {number} El ángulo en radianes.
*/
function toRadians(anguloGrados) {
    return anguloGrados * (Math.PI / 180);
}

/**
 * Actualiza el diagrama mostrando las flechas de tensiones y su peso.
 * Limpia el canvas y dibuja un rectángulo gris en el centro.
 * Luego, por cada input de tensión, dibuja una flecha desde el centro
 * hasta el punto que se encuentra a una distancia de `arrowLength`
 * en la dirección del ángulo ingresado. Si el valor de la tensión
 * es distinto de cero, se dibuja la flecha y se muestra el valor
 * de la tensión en la punta de la flecha.
 * Finalmente, si el valor del peso es distinto de cero, se dibuja
 * una flecha desde el centro hasta abajo y se muestra el valor del
 * peso en la punta de la flecha.
 */
function updateDiagram() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lightgray';
    ctx.fillRect(75, 75, 100, 100);

    const centerX = 125;
    const centerY = 125;
    const arrowLength = 40;

    const inputsTension = document.querySelectorAll('.tension-input');
    const anguloInputs = document.querySelectorAll('.angulo-input');
    const colors = ['red', 'blue', 'green', 'orange'];

    for (let i = 0; i < inputsTension.length; i++) {
        const tension = parseFloat(inputsTension[i].value) || 0;
        const angulo = parseFloat(anguloInputs[i].value) || 0;

        if (tension !== 0 || angulo !== 0) {
            const anguloRad = toRadians(angulo);
            const endX = centerX + arrowLength * Math.cos(anguloRad);
            const endY = centerY - arrowLength * Math.sin(anguloRad);

            drawArrow(centerX, centerY, endX, endY, colors[i % colors.length]);
            ctx.fillStyle = 'black';
            ctx.font = '0.75rem system-ui';
            let t = tension || '?';
            ctx.fillText(`${t} N`, endX + 5, endY - 5);
        }
    }

    const peso = parseFloat(pesoInput.value) || 0;
    drawArrow(125, 175, 125, 225, 'black');
    ctx.fillStyle = 'black';
    ctx.font = '0.825rem system-ui';
    let p = peso || '?';
    ctx.fillText(`${p} N`, 135, 205);
}

/**
 * Calcula las tensiones desconocidas y el peso dadas las tensiones y
 * ángulos ingresados.
 *
 * @returns {void}
 */
function calculate() {
    const tensiones = [];
    const inputsTension = document.querySelectorAll('.tension-input');
    const anguloInputs = document.querySelectorAll('.angulo-input');

    inputsTension.forEach((input, i) => {
        const tension = parseFloat(input.value) || 0;
        let angulo = parseFloat(anguloInputs[i].value) || 0;
        if (angulo == 180) angulo = 0;
        tensiones[i] = { tension, angulo };
    });

    let peso = parseFloat(pesoInput.value) || 0;

    // Construcción de las ecuaciones de equilibrio ∑Fx = 0; ∑Fy = p
    let sumX = 0;
    let sumY = -peso;

    tensiones.forEach((t, i) => {
        let angRad = toRadians(t.angulo);
        if (t.tension === 0) {
            // Guardamos como incógnita para resolver la ecuación
            tensiones[i].ecuacion = {
                x: Math.cos(angRad),
                y: Math.sin(angRad),
                angRad
            };
        } else {
            // Si la tensión es conocida, sumar sus componentes
            sumX += t.tension * Math.cos(angRad);
            sumY += t.tension * Math.sin(angRad);
        }
    });

    const desconocidas = tensiones.filter(t => t.tension === 0);
    // Caso: Calcular tensiones desconocidas
    if (desconocidas.length === 1) {
        // Resolver una incógnita
        const ecuacion = desconocidas[0].ecuacion;
        const tension = Math.sqrt(
            ((-sumX / ecuacion.x) ** 2) + ((-sumY / ecuacion.y) ** 2)
        );

        desconocidas[0].tension = Math.abs(tension.toFixed(2));

        sumY += desconocidas[0].tension * Math.sin(ecuacion.angRad);
    } else if (desconocidas.length === 2) {
        const [t1, t2] = desconocidas;
        const ang1 = t1.ecuacion.angRad;
        const ang2 = t2.ecuacion.angRad;

        const T2 = peso / (
            (Math.cos(ang2) / Math.cos(ang1)) * Math.sin(ang1) + Math.sin(ang2)
        );

        const T1 = T2 * (Math.cos(ang2) / Math.cos(ang1));

        t1.tension = Math.abs(T1.toFixed(2));
        t2.tension = Math.abs(T2.toFixed(2));

        sumY += T1 * Math.sin(ang1) + T2 * Math.sin(ang2);

        console.log('Esta parte tiene error');
    }

    // Caso: Calcular peso
    if (peso === 0) {
        peso = sumY.toFixed(2); // ∑Fy = 0 implica que el peso es -∑Fy
    }

    resultContainer.innerHTML = '';
    resultadoDiv.classList.add('d-none');
    addResults(tensiones, peso);
    clearInputs();
}

/**
 * Agrega los resultados de las tensiones y sus ángulos en el contenedor
 * de resultados.
 * 
 * @param {array} tensiones - Arreglo con las tensiones y sus ángulos.
 */
function addResults(tensiones, peso) {
    resultadoDiv.classList.remove('d-none');

    const p = document.createElement('p');
    p.innerHTML = `Peso: ${peso} N`;
    resultContainer.appendChild(p);

    tensiones.forEach((t, i) => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
            <p>Tensión ${i + 1}: ${t.tension} N</p>
            <p>Ángulo ${i + 1}: ${t.angulo}°</p>
        `;
        resultContainer.appendChild(div);
    });
}


/**
 * Limpia los campos de los inputs de las tensiones y sus ángulos. Pone
 * el peso y el numero de tensiones en su valor predeterminado.
 */
function clearInputs() {
    const inputsTension = document.querySelectorAll('.tension-input');
    const anguloInputs = document.querySelectorAll('.angulo-input');
    pesoInput.value = '';
    numTensionesInput.value = 1;
    inputsTension.forEach(input => input.value = '');
    anguloInputs.forEach(input => input.value = '');
    createinputsTension(1);
}