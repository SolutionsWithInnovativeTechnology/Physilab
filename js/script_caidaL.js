function calcularDatos() {
    const g = 9.8;
    let altura = parseFloat(document.getElementById('altura').value);
    let velocidadFinal = parseFloat(document.getElementById('velocidadFinal').value);
    let tiempo = parseFloat(document.getElementById('tiempo').value);
    let precision = parseInt(document.getElementById('precision').value);

    let resultados = "";

    if (isNaN(altura) && isNaN(velocidadFinal) && isNaN(tiempo)) {
        resultados = "<p>Por favor, ingrese al menos un valor para calcular los demás.</p>";
    } else {
        if (!isNaN(altura)) {
            // Si se proporciona la altura, calcular velocidad final y tiempo
            velocidadFinal = Math.sqrt(2 * g * altura);
            tiempo = Math.sqrt((2 * altura) / g);

            resultados += `
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA VELOCIDAD FINAL</h2>
                    <p>Velocidad Final = √(2 * Gravedad * Altura)</p>
                    <p>Velocidad Final = √(2 * 9.81 * ${altura}) = <span class="highlight">${velocidadFinal.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR EL TIEMPO</h2>
                    <p>Tiempo = √(2 * Altura / Gravedad)</p>
                    <p>Tiempo = √(2 * ${altura} / 9.81) = <span class="highlight">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(velocidadFinal)) {
            // Si se proporciona la velocidad final, calcular altura y tiempo
            altura = (velocidadFinal ** 2) / (2 * g);
            tiempo = velocidadFinal / g;

            resultados += `
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA ALTURA</h2>
                    <p>Altura = (Velocidad Final²) / (2 * Gravedad)</p>
                    <p>Altura = (${velocidadFinal.toFixed(precision)}²) / (2 * 9.81) = <span class="highlight">${altura.toFixed(precision)} m</span></p>
                </div>
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR EL TIEMPO</h2>
                    <p>Tiempo = Velocidad Final / Gravedad</p>
                    <p>Tiempo = ${velocidadFinal.toFixed(precision)} / 9.81 = <span class="highlight">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(tiempo)) {
            // Si se proporciona el tiempo, calcular velocidad final y altura
            velocidadFinal = g * tiempo;
            altura = (g * tiempo ** 2) / 2;

            resultados += `
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA VELOCIDAD FINAL</h2>
                    <p>Velocidad Final = Gravedad * Tiempo</p>
                    <p>Velocidad Final = 9.81 * ${tiempo} = <span class="highlight">${velocidadFinal.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA ALTURA</h2>
                    <p>Altura = (Gravedad * Tiempo²) / 2</p>
                    <p>Altura = (9.81 * ${tiempo}²) / 2 = <span class="highlight">${altura.toFixed(precision)} m</span></p>
                </div>`;
        }
                resultados += `
            <div class="proceso">
                <h2>ALTURA Y VELOCIDAD EN BASE AL TIEMPO</h2>
                <label for="tiempoCalculo">Altura que caé a los</label>
                <input type="number" id="tiempoCalculo" placeholder="Ingrese el tiempo" onchange="calcularAlturaVelocidad()"> segundos
                <p id="alturaTiempoResultado">= <span class="highlight">0 metros</span></p>
                <label for="tiempoCalculoVel">Velocidad del móvil a los</label>
                <input type="number" id="tiempoCalculoVel" placeholder="Ingrese el tiempo" onchange="calcularAlturaVelocidad()"> segundos
                <p id="velocidadTiempoResultado">= <span class="highlight">0 m/s</span></p>
            </div>
        `;

    }

    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.style.display = 'block';
    resultadosDiv.innerHTML = `
        <h2>Resultado</h2>
        ${resultados}
    `;
}

function limpiarCampos() {
    document.getElementById('altura').value = '';
    document.getElementById('velocidadFinal').value = '';
    document.getElementById('tiempo').value = '';
    document.getElementById('resultados').innerHTML = '';
    document.getElementById('resultados').style.display = 'none';
}

function calcularAlturaVelocidad() {
    const g = 9.81;
    let tiempoCalculo = parseFloat(document.getElementById('tiempoCalculo').value);
    let tiempoCalculoVel = parseFloat(document.getElementById('tiempoCalculoVel').value);
    let precision2 = parseInt(document.getElementById('precision').value);

    if (!isNaN(tiempoCalculo)) {
        // Altura recorrida a un tiempo específico
        let altura = (g * tiempoCalculo ** 2) / 2;
        document.getElementById('alturaTiempoResultado').innerHTML = `= <span class="highlight">${altura.toFixed(precision2)} metros</span>`;
    }

    if (!isNaN(tiempoCalculoVel)) {
        // Velocidad a un tiempo específico
        let velocidad = g * tiempoCalculoVel;
        document.getElementById('velocidadTiempoResultado').innerHTML = `= <span class="highlight">${velocidad.toFixed(precision2)} m/s</span>`;
    }
}
