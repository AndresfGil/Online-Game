//OBTENER NUMERO ALEATORIO (PARA PC)
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//ASIGNAR UNA JUGADA A UN NUMERO
function eleccion(jugada) {
    let resultado = ""
    if (jugada == 1) {
        resultado = "elegiste 🪨"
    } else if (jugada == 2) {
        resultado = "elegiste 📄"
    } else if (jugada == 3) {
        resultado = "elegiste ✂️"
    } else {
        resultado = "MAL ELEGIDO"
    }
    return resultado
}

// VARIABLES (EMPIEZAN DESDE CERO)
let jugador = 0
let pc = 0
let Triunfos = 0
let Perdidas = 0

//LOOP PARA GANAR O PERDER 3 VECES Y TERMINAR
while (Triunfos < 3 && Perdidas < 3) {
    pc = aleatorio(1, 3)
    jugador = prompt("Elige: 1 Piedra, 2 Papel, 3 Tijera")
    //alert("elegiste " + jugador)

    alert("PC elige: " + eleccion(pc))
    alert("Tu eliges: " + eleccion(jugador))

    //LOGICA DEL COMBATE
    if (pc == jugador) {
        alert("EMPATE")
    } else if (jugador == 1 && pc == 3) {
        alert("GANASTE")
        Triunfos = Triunfos + 1
    } else if (jugador == 2 && pc == 1) {
        alert("GANASTE")
        Triunfos = Triunfos + 1
    } else if (jugador == 3 && pc == 2) {
        alert("GANASTE")
        Triunfos = Triunfos + 1
    } else {
        alert("PERDISTE")
        Perdidas = Perdidas + 1
    }
}

alert("Ganaste " + Triunfos + " veces. Perdiste " + Perdidas + " veces.")