const respuestasCorrectas = {
    q1: 'b', q2: 'c', q3: 'b', q4: 'b', q5: 'b',
    q6: 'b', q7: 'b', q8: 'c', q9: 'b', q10: 'b'
};

let tiempoRestante = 180; 
let intervalo = null;

function comenzarQuiz() {
    if(document.getElementById('pantalla-inicio')){
        document.getElementById('pantalla-inicio').style.display = 'none';
    }
    document.getElementById('quizForm').style.display = 'block';
    intervalo = setInterval(actualizarCronometro, 1000);
}

function actualizarCronometro() {
    const cronoDoc = document.getElementById('cronometro');
    if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        corregirQuiz();
        alert("¡Tiempo agotado!");
        return;
    }
    tiempoRestante--;
    const min = Math.floor(tiempoRestante / 60).toString().padStart(2, '0');
    const seg = (tiempoRestante % 60).toString().padStart(2, '0');
    cronoDoc.textContent = `Tiempo restante: ${min}:${seg}`;
}

function corregirQuiz() {
    clearInterval(intervalo);
    
    document.querySelectorAll('input, select, button').forEach(i => i.disabled = true);

    let puntuacion = 0;
    const totalPreguntasValuables = 11; 

    for (let i = 1; i <= 10; i++) {
        const nombre = `q${i}`;
        const opciones = document.querySelectorAll(`input[name="${nombre}"]`);
        const seleccionada = document.querySelector(`input[name="${nombre}"]:checked`);
        const correctaVal = respuestasCorrectas[nombre];
        
        const bloque = opciones[0].closest('.bloque-pregunta');
        const enunciado = bloque ? bloque.querySelector('.pregunta-texto') : opciones[0].parentElement.previousElementSibling;

        if (seleccionada) {
            if (seleccionada.value === correctaVal) {
                puntuacion++;
                seleccionada.parentElement.classList.add('correcta');
            } else {
                seleccionada.parentElement.classList.add('incorrecta');
                document.querySelector(`input[name="${nombre}"][value="${correctaVal}"]`).parentElement.classList.add('correcta');
            }
        } else {
            if (enunciado) enunciado.classList.add('no-contestada');
            document.querySelector(`input[name="${nombre}"][value="${correctaVal}"]`).parentElement.classList.add('correcta');
        }
    }

    const q11 = document.querySelector('select[name="q11"]');
    const enunciado11 = q11.parentElement;
    if (q11.value === "") {
        enunciado11.classList.add('no-contestada');
    } else {
        enunciado11.classList.add('correcta'); 
    }

   
    const q12Checkboxes = document.querySelectorAll('input[name="q12"]:checked');
    const enunciado12 = document.querySelector('input[name="q12"]').parentElement;
    if (q12Checkboxes.length === 0) {
        enunciado12.classList.add('no-contestada');
    } else {
        enunciado12.classList.add('correcta'); 
    }

    const q13 = document.querySelector('input[name="q13"]');
    const texto = q13.value.trim();
    const palabras = texto.split(/\s+/).filter(p => p.length > 0);

    if (texto === "") {
        q13.classList.add('no-contestada');
    } else if (palabras.length >= 5) {
        q13.classList.add('correcta');
        puntuacion++;
    } else {
        q13.classList.add('incorrecta'); 
    }

    const resDiv = document.getElementById('resultado');
    resDiv.style.display = "block";
    resDiv.innerHTML = `
        <h2>Resultado: ${puntuacion} / ${totalPreguntasValuables}</h2>
        <p>Examen finalizado y revisado.</p>
    `;
    resDiv.scrollIntoView({ behavior: 'smooth' });
}