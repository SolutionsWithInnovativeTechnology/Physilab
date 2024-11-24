function calcularDatos() {
    const g = 9.8;
    let altura = parseFloat(document.getElementById('altura').value);
    let velocidadFinal = parseFloat(document.getElementById('velocidadFinal').value);
    let tiempo = parseFloat(document.getElementById('tiempo').value);
    let precision = parseInt(document.getElementById('precision').value);

    let resultados = "";

    if (isNaN(altura) && isNaN(velocidadFinal) && isNaN(tiempo)) {
        resultados = "<p class='h4 fw-normal text-center'>Por favor, ingrese al menos un valor para calcular los demás.</p>";
    } else {
        if (!isNaN(altura)) {
            // Si se proporciona la altura, calcular velocidad final y tiempo
            velocidadFinal = Math.sqrt(2 * g * altura);
            tiempo = Math.sqrt((2 * altura) / g);

            resultados += `
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3>Procedimiento para hallar la velocidad final</h3>
                    <p class="fs-5">Velocidad Final = √(2 * Gravedad * Altura)</p>
                    <p class="fs-5">Velocidad Final = √(2 * 9.81 * ${altura}) = <span class="fw-bold">${velocidadFinal.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3>Procedimiento para hallar el tiempo</h3>
                    <p class="fs-5">Tiempo = √(2 * Altura / Gravedad)</p>
                    <p class="fs-5">Tiempo = √(2 * ${altura} / 9.81) = <span class="fw-bold">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(velocidadFinal)) {
            // Si se proporciona la velocidad final, calcular altura y tiempo
            altura = (velocidadFinal ** 2) / (2 * g);
            tiempo = velocidadFinal / g;

            resultados += `
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3>Procedimiento para hallar la altura</h3>
                    <p class="fs-5">Altura = (Velocidad Final²) / (2 * Gravedad)</p>
                    <p class="fs-5">Altura = (${velocidadFinal.toFixed(precision)}²) / (2 * 9.81) = <span class="fw-bold">${altura.toFixed(precision)} m</span></p>
                </div>
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3>Procedimiento para hallar el tiempo</h3>
                    <p class="fs-5">Tiempo = Velocidad Final / Gravedad</p>
                    <p class="fs-5">Tiempo = ${velocidadFinal.toFixed(precision)} / 9.81 = <span class="fw-bold">${tiempo.toFixed(precision)} s</span></p>
                </div>`;
        } else if (!isNaN(tiempo)) {
            // Si se proporciona el tiempo, calcular velocidad final y altura
            velocidadFinal = g * tiempo;
            altura = (g * tiempo ** 2) / 2;

            resultados += `
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3>Procedimiento para hallar la velocidad final</h3>
                    <p class="fs-5">Velocidad Final = Gravedad * Tiempo</p>
                    <p class="fs-5">Velocidad Final = 9.81 * ${tiempo} = <span class="fw-bold">${velocidadFinal.toFixed(precision)} m/s</span></p>
                </div>
                <div class="proceso border p-3 mb-3 border-2 border-black">
                    <h3>Procedimiento para hallar la altura</h3>
                    <p class="fs-5">Altura = (Gravedad * Tiempo²) / 2</p>
                    <p class="fs-5">Altura = (9.81 * ${tiempo}²) / 2 = <span class="fw-bold">${altura.toFixed(precision)} m</span></p>
                </div>`;
        }
        resultados += `
            <div class="proceso border p-3 mb-3 border-2 border-black">
                <h3>Altura y velocidad en base al tiempo</h3>
                <p class="fs-5 mb-0">
                    <label for="tiempoCalculo">Altura que cae a los</label>
                    <input type="number" id="tiempoCalculo" placeholder="Tiempo" onchange="calcularAlturaVelocidad()" min="0" class="focus-ring border rounded px-2"> segundos
                </p>	
                <p id="alturaTiempoResultado" class="fs-5">= <span class="fw-bold">0 metros</span></p>

                <p class="fs-5 mb-0">
                    <label for="tiempoCalculoVel">Velocidad del móvil a los</label>
                    <input type="number" id="tiempoCalculoVel" placeholder="Tiempo" onchange="calcularAlturaVelocidad()" min="0" class="focus-ring border rounded px-2"> segundos
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

function limpiarCampos() {
    document.getElementById('altura').value = '';
    document.getElementById('velocidadFinal').value = '';
    document.getElementById('tiempo').value = '';
    document.getElementById('resultados').innerHTML = '';
    document.getElementById('resultados').classList.add('d-none');
}

function calcularAlturaVelocidad() {
    const g = 9.81;
    let tiempoCalculo = parseFloat(document.getElementById('tiempoCalculo').value);
    let tiempoCalculoVel = parseFloat(document.getElementById('tiempoCalculoVel').value);
    let precision2 = parseInt(document.getElementById('precision').value);

    if (!isNaN(tiempoCalculo)) {
        // Altura recorrida a un tiempo específico
        let altura = (g * tiempoCalculo ** 2) / 2;
        document.getElementById('alturaTiempoResultado').innerHTML = `= <span class="fw-bold">${altura.toFixed(precision2)} metros</span>`;
    }

    if (!isNaN(tiempoCalculoVel)) {
        // Velocidad a un tiempo específico
        let velocidad = g * tiempoCalculoVel;
        document.getElementById('velocidadTiempoResultado').innerHTML = `= <span class="fw-bold">${velocidad.toFixed(precision2)} m/s</span>`;
    }
}
