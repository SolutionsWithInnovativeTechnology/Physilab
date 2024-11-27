function calcularDatos() {
    const g = 9.8;
    let altura = parseFloat(document.getElementById('altura').value);
    let velocidadInicial = parseFloat(document.getElementById('velocidadInicial').value);
    let tiempo = parseFloat(document.getElementById('tiempo').value);
    let precision = parseInt(document.getElementById('precision').value);

    let resultados = "";

    if (isNaN(altura) && isNaN(velocidadInicial) && isNaN(tiempo)) {
        resultados = "<p class='h4 fw-normal text-center'>Por favor, ingrese al menos un valor para calcular los demás.</p>";
    } else {
        // Mostrar el proceso border p-3 mb-3 border-2 border-black para calcular velocidad inicial
        if (!isNaN(altura)) {
            // Si se proporciona la altura, calcular velocidad inicial y tiempo de subida
            velocidadInicial = Math.sqrt(2 * g * altura);
            tiempo = velocidadInicial / g;

            resultados += `
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3 class="text-capitalize">PROCEDIMIENTO PARA HALLAR LA VELOCIDAD INICIAL</h2>
                    <p class="fs-5">Resolver fórmula para hallar la velocidad inicial:</p>
                    <p class="fs-5">Velocidad inicial = √(2 * Gravedad * Altura)</p>
                    <p class="fs-5">Velocidad inicial = √(2 * 9.81 * ${altura}) = <span class="fw-bold">${velocidadInicial.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3 class="text-capitalize">PROCEDIMIENTO PARA HALLAR EL TIEMPO DE SUBIDA</h2>
                    <p class="fs-5">Resolver fórmula para hallar el tiempo:</p>
                    <p class="fs-5">Tiempo = Velocidad Inicial / Gravedad</p>
                    <p class="fs-5">Tiempo = ${velocidadInicial.toFixed(precision)} / 9.81 = <span class="fw-bold">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(velocidadInicial)) {
            // Si se proporciona la velocidad inicial, calcular altura máxima y tiempo de subida
            altura = (velocidadInicial ** 2) / (2 * g);
            tiempo = velocidadInicial / g;

            resultados += `
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3 class="text-capitalize">PROCEDIMIENTO PARA HALLAR LA ALTURA</h2>
                    <p class="fs-5">Resolver fórmula para hallar la altura:</p>
                    <p class="fs-5">Altura = (Velocidad Inicial²) / (2 * Gravedad)</p>
                    <p class="fs-5">Altura = (${velocidadInicial.toFixed(precision)}²) / (2 * 9.81) = <span class="fw-bold">${altura.toFixed(precision)} m</span></p>
                </div>
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3 class="text-capitalize">PROCEDIMIENTO PARA HALLAR EL TIEMPO DE SUBIDA</h2>
                    <p class="fs-5">Tiempo = Velocidad Inicial / Gravedad</p>
                    <p class="fs-5">Tiempo = ${velocidadInicial.toFixed(precision)} / 9.81 = <span class="fw-bold">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(tiempo)) {
            // Si se proporciona el tiempo de subida, calcular velocidad inicial y altura máxima
            velocidadInicial = g * tiempo;
            altura = (velocidadInicial ** 2) / (2 * g);

            resultados += `
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3 class="text-capitalize">PROCEDIMIENTO PARA HALLAR LA VELOCIDAD INICIAL</h2>
                    <p class="fs-5">Resolver fórmula para hallar la velocidad inicial:</p>
                    <p class="fs-5">Velocidad inicial = Gravedad * Tiempo</p>
                    <p class="fs-5">Velocidad inicial = 9.81 * ${tiempo} = <span class="fw-bold">${velocidadInicial.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3 class="text-capitalize">PROCEDIMIENTO PARA HALLAR LA ALTURA MÁXIMA</h2>
                    <p class="fs-5">Altura = (Velocidad Inicial²) / (2 * Gravedad)</p>
                    <p class="fs-5">Altura = (${velocidadInicial.toFixed(precision)}²) / (2 * 9.81) = <span class="fw-bold">${altura.toFixed(precision)} m</span></p>
                </div>`;
        }

        resultados += `
            <div class="proceso border p-3 mb-3 border-2 border-black">
                <h3 class="text-capitalize">ALTURA Y VELOCIDAD EN BASE AL TIEMPO</h2>
                <p class="fs-5 mb-0">
                    <label for="tiempoCalculo">Altura recorrida a los</label>
                    <input type="number" id="tiempoCalculo" placeholder="Tiempo" onchange="calcularAlturaVelocidad(${velocidadInicial.toFixed(precision)})" min="0" class="focus-ring border rounded px-2"> segundos
                </p>	
                <p id="alturaTiempoResultado" class="fs-5">= <span class="fw-bold">0 metros</span></p>

                <p class="fs-5 mb-0">
                    <label for="tiempoCalculoVel">Velocidad del móvil a los</label>
                    <input type="number" id="tiempoCalculoVel" placeholder="Tiempo" onchange="calcularAlturaVelocidad(${velocidadInicial.toFixed(precision)})" min="0" class="focus-ring border rounded px-2"> segundos
                </p>
                <p id="velocidadTiempoResultado" class="fs-5">= <span class="fw-bold">0 m/s</span></p>
            </div>
        `;
    }

    
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.classList.remove('d-none');
    resultadosDiv.innerHTML = `
        <h2 class="fw-bold h1 text-center">Resultado</h2>
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
        document.getElementById('alturaTiempoResultado').innerHTML = `= <span class="fw-bold">${altura.toFixed(precision2)} metros</span>`;
    }

    if (!isNaN(tiempoCalculoVel)) {
        let velocidad = velocidadInicial - (g * tiempoCalculoVel);
        document.getElementById('velocidadTiempoResultado').innerHTML = `= <span class="fw-bold">${velocidad.toFixed(precision2)} m/s</span>`;
    }
}

function limpiarCampos() {
    document.getElementById('altura').value = '';
    document.getElementById('velocidadInicial').value = '';
    document.getElementById('tiempo').value = '';
    document.getElementById('resultados').innerHTML = '';
    document.getElementById('resultados').classList.add('d-none');
}
