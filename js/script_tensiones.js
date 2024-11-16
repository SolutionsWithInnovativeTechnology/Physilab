// Inicio del programa
const canvas = document.getElementById('diagram');
const ctx = canvas.getContext('2d');
const numTensionesInput = document.getElementById('numTensiones');
const inputsTensionContainer = document.getElementById('inputsTension');
const pesoInput = document.getElementById('peso');
const btnCalcular = document.getElementById('btnCalcular');
const resultContainer = document.getElementById('resultadoDiv');

numTensionesInput.addEventListener('input', () => {
    const num = parseInt(numTensionesInput.value) || 1;
    if (num > 4) {
        alert('¡No puede tener más de cuatro tensiones!');
        numTensionesInput.value = 1;
        createinputsTension(1);
    } else {
        createinputsTension(num);
    }
});

pesoInput.addEventListener('input', updateDiagram);

inputsTensionContainer.addEventListener('input', updateDiagram);

btnCalcular.addEventListener('click', () => {
    if (pesoInput.value == 0 && angulo0.value == 0) {
        alert('¡Debes ingresar al menos un dato!');
    } else {
        calculate();
    }
});

createinputsTension(1);
updateDiagram();


/************ FUNCIONES *************/


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

        if (tension !== 0) {
            const anguloRad = toRadians(angulo);
            const endX = centerX + arrowLength * Math.cos(anguloRad);
            const endY = centerY - arrowLength * Math.sin(anguloRad);

            drawArrow(centerX, centerY, endX, endY, colors[i % colors.length]);
            ctx.fillStyle = 'black';
            ctx.font = '0.75rem system-ui';
            ctx.fillText(`${tension} N`, endX + 5, endY - 5);
        }
    }

    const peso = parseFloat(pesoInput.value) || 0;
    if (peso !== 0) {
        drawArrow(125, 175, 125, 225, 'black');
        ctx.fillStyle = 'black';
        ctx.font = '0.825rem system-ui';
        ctx.fillText(`${peso} N`, 135, 205);
    }
}

function calculate() {
    const tensiones = [];
    const inputsTension = document.querySelectorAll('.tension-input');
    const anguloInputs = document.querySelectorAll('.angulo-input');

    inputsTension.forEach((input, i) => {
        const tension = parseFloat(input.value) || 0;
        const angulo = parseFloat(anguloInputs[i].value) || 0;
        tensiones[i] = { tension, angulo };
    });

    let peso = parseFloat(pesoInput.value);

    // Construcción de las ecuaciones de equilibrio ∑Fx = 0; ∑Fy = 0
    let sumX = 0;
    let sumY = -peso;

    tensiones.forEach((t, i) => {
        let angRad = toRadians(t.angulo);
        if (t.tension === 0) {
            // Guardamos como incógnita para resolver la ecuación
            tensiones[i].ecuacion = {
                x: Math.cos(angRad),
                y: Math.sin(angRad)
            };
        } else {
            // Si la tensión es conocida: sumar sus componentes a la ecuación
            sumX += t.tension * Math.cos(angRad);
            sumY += t.tension * Math.sin(angRad);
        }
    });

    let desconocidas = tensiones.filter(t => t.tension === 0); //Crea un array con las tensiones desconocidas
    // Resolución del sistema (Ejemplo cuando solo hay una para entender cómo funciona)
    if (desconocidas.length === 1) {
        let ecuacion = desconocidas[0].ecuacion;
        let tension = Math.sqrt((sumX / ecuacion.x) ** 2 + (sumY / ecuacion.y) ** 2); 
        desconocidas[0].tension = tension.toFixed(2); // Guarda la solución en el array de tensiones
    } else if (desconocidas.length > 1) {
        console.log("Implementar resolución de sistema con varias incógnitas.");
    }

    console.log("Peso: " + pesoInput.value);
    console.log("Tensiones:");
    console.log(tensiones);
    
    mostrarResultados(tensiones);
}

function mostrarResultados(tensiones) {
    resultContainer.innerHTML = '';
    for (let i = 0; i < tensiones.length; i++) {
        const tension = tensiones[i];
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
            <p>Tensión ${i + 1}: ${tension.tension} N</p>
            <p>Ángulo ${i + 1}: ${tension.angulo}°</p>
        `;
        resultContainer.appendChild(div);
    }
}