// Función para mostrar los campos según la selección del radio
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', mostrarCampos);
});

function mostrarCampos() {
    // Mostrar campos según cada dato solicitado
    toggleField('empuje', 'input_empuje');
    toggleField('peso_especifico', 'input_peso_especifico');
    toggleField('peso_aparente', 'input_peso_aparente');
    toggleField('masa', 'input_masa');
    toggleField('densidad_solido', 'input_densidad_solido');
    toggleField('densidad_liquido', 'input_densidad_liquido');
    toggleField('volumen', 'input_volumen');
    toggleField('longitud', 'input_longitud');
    toggleField('temperatura', 'input_temperatura');
}

function toggleField(fieldName, fieldId) {
    const isChecked = document.querySelector(`input[name="${fieldName}"]:checked`);
    document.getElementById(fieldId).style.display = isChecked && isChecked.value === 'si' ? 'block' : 'none';
}

// Función para calcular el resultado
function calcular() {
    const resultado = [];
    let empuje = 0, peso_especifico = 0, masa = 0, densidad_solido = 0, densidad_liquido = 0, volumen = 0;

    // Obtener los valores del formulario
    if (document.querySelector('input[name="empuje"]:checked')?.value === 'si') {
        empuje = parseFloat(document.getElementById('empuje').value);
    }
    if (document.querySelector('input[name="peso_especifico"]:checked')?.value === 'si') {
        peso_especifico = parseFloat(document.getElementById('peso_especifico').value);
    }
    if (document.querySelector('input[name="masa"]:checked')?.value === 'si') {
        masa = parseFloat(document.getElementById('masa').value);
    }
    if (document.querySelector('input[name="densidad_solido"]:checked')?.value === 'si') {
        densidad_solido = parseFloat(document.getElementById('densidad_solido').value);
    }
    if (document.querySelector('input[name="densidad_liquido"]:checked')?.value === 'si') {
        densidad_liquido = parseFloat(document.getElementById('densidad_liquido').value);
    }
    if (document.querySelector('input[name="volumen"]:checked')?.value === 'si') {
        volumen = parseFloat(document.getElementById('volumen').value);
    }

    // Realizar cálculos basados en los datos disponibles
    if (masa && volumen) {
        densidad_solido = masa / volumen;
        resultado.push(`Densidad del sólido calculada: ${densidad_solido} kg/m³`);
    }

    if (peso_especifico && volumen) {
        masa = peso_especifico * volumen;
        resultado.push(`Masa calculada: ${masa} kg`);
    }

    if (empuje && densidad_liquido && volumen) {
        let fuerza_buque = densidad_liquido * volumen * 9.81;
        resultado.push(`Fuerza de flotación calculada: ${fuerza_buque} N`);
    }

    // Mostrar resultados
    document.getElementById('resultado').innerHTML = resultado.join('<br>');
}
