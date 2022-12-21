const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("boton-reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
sectionReiniciar.style.display = "none"

const sectionSeleccionarMascota = document.getElementById("escoge-tu-mascota")
const spamMascotaJugador = document.getElementById("mascota-jugador")

const spamMascotaEnemigo = document.getElementById("mascota-enemigo")

const spamVidasJugador = document.getElementById("vidas-jugador")
const spamVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes=document.getElementById('mensajes')
const ataquesDelJugador=document.getElementById('ataque-del-jugador')
const ataquesDelEnemigo=document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador =[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputAcuatic
let inputTerron
let inputFenix
let mascotaJugador
let mascotaDeJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonTierra
let botonFuego
let botonAgua
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/Mapa.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

/* Objetos instancia vienen desde la clase se contruyen desde la clase */
let acuatic = new Mokepon("Acuatic", "./assets/Acuatic.png", 5, "./assets/Acuatic.png")

let terron = new Mokepon("Terron", "./assets/Terron.png", 5, "./assets/Terron.png")

let fenix = new Mokepon("Fenix", "./assets/Fenix.png", 5, "./assets/Fenix.png")

/* Objetos Literarios desde 0 y no tienen clase, guarda informacion */
const ACUATIC_ATAQUES = [
    { nombre: "💦", id: "boton-agua" },
   { nombre: "💦", id: "boton-agua" },
   { nombre: "💦", id: "boton-agua" },
   { nombre: "🔥", id: "boton-fuego" },
   { nombre: "🍃", id: "boton-tierra" },
]

acuatic.ataques.push(...ACUATIC_ATAQUES)
   
const TERRON_ATAQUES = [
    { nombre: "🍃", id: "boton-tierra" },
    { nombre: "🍃", id: "boton-tierra" },
    { nombre: "🍃", id: "boton-tierra" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
]

terron.ataques.push(...TERRON_ATAQUES)
    
const FENIX_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🍃", id: "boton-tierra" },
]

 fenix.ataques.push(...FENIX_ATAQUES)
    

 mokepones.push(acuatic, terron, fenix)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    /* Forma de iterar los elementos que existen en un arreglo (mokepon) con esta propiedad forEach
    en esta seccion por cada mokepon genera esta estructura e inyectala en html de forma auto */
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputAcuatic = document.getElementById("Acuatic")
        inputTerron = document.getElementById("Terron")
        inputFenix = document.getElementById("Fenix")

    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
   
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:3000/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }

        })
}

function seleccionarMascotaJugador() {



    // input se vuelve una variable la cual consulta en html el nombre de esa seleccion y checkea que se haya seleccionado
    //.innerHTML permite manipular el texto declarado en la anterior variable y
    if (inputAcuatic.checked) {
        spamMascotaJugador.innerHTML = inputAcuatic.id
        mascotaJugador = inputAcuatic.id
    } else if (inputTerron.checked) {
        spamMascotaJugador.innerHTML = inputTerron.id
        mascotaJugador = inputTerron.id
    } else if (inputFenix.checked) {
        spamMascotaJugador.innerHTML = inputFenix.id
        mascotaJugador = inputFenix.id
    } else{
        alert("Seleccionar Mascota")
        return
    }

    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()

}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:3000/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonTierra = document.getElementById("boton-tierra")
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botones = document.querySelectorAll(".BAtaque")

/*  La funcion de escuchar los click se reemplazo con la funcion de abajo
   botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra) */
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("Fuego")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💦") {
                ataqueJugador.push("Agua")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("Tierra")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } 
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:3000/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:3000/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if (res.ok) {
                res.json()
                .then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}

//Logica para que el enemigo escoja mascota aleatoria y salga el nombre
/* Se utiliza el array mokepones para hacer operacion aleatoria con longitud  also resultado del mascota enemiga */
function seleccionarMascotaEnemigo(enemigo) {
    spamMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

/* 
Funcion de botones antigua

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
} */

function ataqueAleatorioEnemigo(){
    console.log(ataquesDelEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }

    console.log(ataqueEnemigo)
    iniciarPelea()
   
}

function iniciarPelea() {
     if (ataqueJugador.length === 5) {
        combate()
     }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "Fuego" && ataqueEnemigo[index] == "Tierra)") {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "Agua" && ataqueEnemigo[index] == "Fuego)") {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "Tierra" && ataqueEnemigo[index] == "Agua)") {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spamVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ESTO FUE UN EMPATE!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES ¡¡GANASTE!!")
    } else {
        crearMensajeFinal("LO SIENTO, HAS PERDIDO :(")
    }

}

//createElement() nos permite crear un elemnto en este caso un parrafo
//innerHTML Nos permite insertar un texto que se reflejara en html
//appendChild Nos permite usar los elemntos creados en js y ponerlos en HTML
//LOGICA PARA INSERTAR TEXTO DE ATAQUES CAMBIANDO CADA QUE SE SELECCIONA UN BOTON
/* function crearMensaje(resultado){
    let sectionMensajes=document.getElementById('mensajes')
    let parrafo=document.createElement('p')
parrafo.innerHTML='Tu mascota atacó con '+ataqueJugador+', las mascota del enemigo atacó con '+ataqueEnemigo+'- '+resultado
sectionMensajes.appendChild(parrafo)} */

function crearMensaje(resultado){

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = "block"
}
 
function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function pintarCanvas() {
    mascotaDeJugadorObjeto.x = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.velocidadX
    mascotaDeJugadorObjeto.y = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
       mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaDeJugadorObjeto.pintarMokepon()

    enviarPosicion( mascotaDeJugadorObjeto.x, mascotaDeJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:3000/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Acuatic") {
                            mokeponEnemigo = new Mokepon("Acuatic", "./assets/Acuatic.png", 5, "./assets/Acuatic.png", enemigo.id)
                        } else if (mokeponNombre === "Terron") {
                            mokeponEnemigo = new Mokepon("Terron", "./assets/Terron.png", 5, "./assets/Terron.png", enemigo.id)
                        } else if (mokeponNombre === "Fenix") {
                            mokeponEnemigo = new Mokepon("Fenix", "./assets/Fenix.png", 5, "./assets/Fenix.png", enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })

                })
        }
    })
}

function moverDerecha() {
    mascotaDeJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaDeJugadorObjeto.velocidadX = -5
}

function moverArriba() {
    mascotaDeJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    mascotaDeJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaDeJugadorObjeto.velocidadX = 0
    mascotaDeJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()    
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaDeJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaDeJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =
        mascotaDeJugadorObjeto.y
    const abajoMascota =
        mascotaDeJugadorObjeto.y + enemigo.alto
    const derechaMascota =
        mascotaDeJugadorObjeto.x + enemigo.ancho
    const izquierdaMascota =
        mascotaDeJugadorObjeto.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id 
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)


}
// load solo iniciara la funcion "iniciar juego" despues de cargar todo lo visula "html"
window.addEventListener("load", iniciarJuego)