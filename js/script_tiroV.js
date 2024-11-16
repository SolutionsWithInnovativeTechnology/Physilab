function calcularDatos() {
    const g = 9.8;
    let altura = parseFloat(document.getElementById('altura').value);
    let velocidadInicial = parseFloat(document.getElementById('velocidadInicial').value);
    let tiempo = parseFloat(document.getElementById('tiempo').value);
    let precision = parseInt(document.getElementById('precision').value);

    let resultados = "";

    if (isNaN(altura) && isNaN(velocidadInicial) && isNaN(tiempo)) {
        resultados = "<p>Por favor, ingrese al menos un valor para calcular los demás.</p>";
    } else {
        // Mostrar el proceso para calcular velocidad inicial
        if (!isNaN(altura)) {
            // Si se proporciona la altura, calcular velocidad inicial y tiempo de subida
            velocidadInicial = Math.sqrt(2 * g * altura);
            tiempo = velocidadInicial / g;

            resultados += `
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA VELOCIDAD INICIAL</h2>
                    <p>Resolver fórmula para hallar la velocidad inicial:</p>
                    <p>Velocidad inicial = √(2 * Gravedad * Altura)</p>
                    <p>Velocidad inicial = √(2 * 9.81 * ${altura}) = <span class="highlight">${velocidadInicial.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR EL TIEMPO DE SUBIDA</h2>
                    <p>Resolver fórmula para hallar el tiempo:</p>
                    <p>Tiempo = Velocidad Inicial / Gravedad</p>
                    <p>Tiempo = ${velocidadInicial.toFixed(precision)} / 9.81 = <span class="highlight">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(velocidadInicial)) {
            // Si se proporciona la velocidad inicial, calcular altura máxima y tiempo de subida
            altura = (velocidadInicial ** 2) / (2 * g);
            tiempo = velocidadInicial / g;

            resultados += `
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA ALTURA</h2>
                    <p>Resolver fórmula para hallar la altura:</p>
                    <p>Altura = (Velocidad Inicial²) / (2 * Gravedad)</p>
                    <p>Altura = (${velocidadInicial.toFixed(precision)}²) / (2 * 9.81) = <span class="highlight">${altura.toFixed(precision)} m</span></p>
                </div>
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR EL TIEMPO DE SUBIDA</h2>
                    <p>Tiempo = Velocidad Inicial / Gravedad</p>
                    <p>Tiempo = ${velocidadInicial.toFixed(precision)} / 9.81 = <span class="highlight">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(tiempo)) {
            // Si se proporciona el tiempo de subida, calcular velocidad inicial y altura máxima
            velocidadInicial = g * tiempo;
            altura = (velocidadInicial ** 2) / (2 * g);

            resultados += `
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA VELOCIDAD INICIAL</h2>
                    <p>Resolver fórmula para hallar la velocidad inicial:</p>
                    <p>Velocidad inicial = Gravedad * Tiempo</p>
                    <p>Velocidad inicial = 9.81 * ${tiempo} = <span class="highlight">${velocidadInicial.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso">
                    <h2>PROCEDIMIENTO PARA HALLAR LA ALTURA MÁXIMA</h2>
                    <p>Altura = (Velocidad Inicial²) / (2 * Gravedad)</p>
                    <p>Altura = (${velocidadInicial.toFixed(precision)}²) / (2 * 9.81) = <span class="highlight">${altura.toFixed(precision)} m</span></p>
                </div>`;
        }

        resultados += `
            <div class="proceso">
                <h2>ALTURA Y VELOCIDAD EN BASE AL TIEMPO</h2>
                <label for="tiempoCalculo">Altura recorrida a los</label>
                <input type="number" id="tiempoCalculo" placeholder="Ingrese el tiempo" onchange="calcularAlturaVelocidad(${velocidadInicial.toFixed(precision)})"> segundos
                <p id="alturaTiempoResultado">= <span class="highlight">0 metros</span></p>
                <label for="tiempoCalculoVel">Velocidad del móvil a los</label>
                <input type="number" id="tiempoCalculoVel" placeholder="Ingrese el tiempo" onchange="calcularAlturaVelocidad(${velocidadInicial.toFixed(precision)})"> segundos
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


function calcularAlturaVelocidad(velocidadInicial) {
    const g = 9.81;
    let tiempoCalculo = parseFloat(document.getElementById('tiempoCalculo').value);
    let tiempoCalculoVel = parseFloat(document.getElementById('tiempoCalculoVel').value);
    let precision2 = parseInt(document.getElementById('precision').value);

    if (!isNaN(tiempoCalculo)) {
        let altura = (velocidadInicial * tiempoCalculo) - (0.5 * g * tiempoCalculo ** 2);
        document.getElementById('alturaTiempoResultado').innerHTML = `= <span class="highlight">${altura.toFixed(precision2)} metros</span>`;
    }

    if (!isNaN(tiempoCalculoVel)) {
        let velocidad = velocidadInicial - (g * tiempoCalculoVel);
        document.getElementById('velocidadTiempoResultado').innerHTML = `= <span class="highlight">${velocidad.toFixed(precision2)} m/s</span>`;
    }
}

function limpiarCampos() {
    document.getElementById('altura').value = '';
    document.getElementById('velocidadInicial').value = '';
    document.getElementById('tiempo').value = '';
    document.getElementById('resultados').innerHTML = '';
    document.getElementById('resultados').style.display = 'none';
}
