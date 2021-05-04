
var cadenaAddMedicina = ''
var Pedido = []
var cadenaCita = ''
var total = 0

/*FUNCION PARA EL REGISTRO PARA LOS PACIENTES*/
function registrar() {

    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var username = document.querySelector('#usuario').value
    var password = document.querySelector('#password').value
    var nacimiento = document.querySelector('#nacimiento').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value

    if (nombre != "" && apellido != "" && username != "" && password != "") {
        if (password.length >= 8) {
            var objeto = {
                "Username": username,
                "Nombre": nombre,
                "Apellido": apellido,
                "Nacimiento": nacimiento,
                "Sexo": sexo,
                "Password": password,
                "Telefono": telefono,
                "Tipo": 0,
                "Especialidad": ""
            }

            fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
                method: 'POST',
                body: JSON.stringify(objeto),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(res => res.json())
                .catch(err => {
                    console.error('Error:', err)
                    alert("Ocurrio un error, ver consola")
                })
                .then(response => {
                    console.log(response)
                    alert(response.Mensaje)
                    irAlPerfil(username);
                })

        } else {
            alert("La contraseña debe tener como mínimo 8 caracteres.")
        }
    } else {
        alert("Debe llenar todos los campos obligatorios")
    }

}

/*FUNCION PARA OBTENER USUARIO*/
function obtenerUsuario() {
    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver consola")
        })
        .then(response => {
            console.log(response)
        })
}

/* FUNCION PARA EL INICIO DE SESIÓN */
function ingresar() {

    var username = document.querySelector('#usuario').value
    var password = document.querySelector('#password').value

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver consola")
        })
        .then(response => {
            console.log(response)
            var existe1 = false
            var existe2 = false
            for (var i in response) {
                if (username == response[i].Username) {
                    existe1 = true
                    if (password == response[i].Password) {
                        existe2 = true
                        if (username == "admin") {
                            location.href = "admin.html"
                        } else if (response[i].Tipo == 0) {
                            irAlPerfil(username);
                        } else if (response[i].Tipo == 1) {
                            irAlPerfilDoctor(username);
                        } else if (response[i].Tipo == 2) {
                            irAlEnfermera(username);
                        }
                    }

                }
            }
            if (!existe1) {
                alert("El usuario ingresado No existe.")
            } else {
                if (!existe2) {
                    alert("Contraseña Incorrecta")
                }
            }

        })
}

/**=============================================================================================================================== */

/*IR PERFIL PACIENTE*/
function irAlPerfil(username) {
    console.log(username);
    sessionStorage.setItem("usuario", username)
    location.href = 'paciente.html'
}

/* MOSTRAR LOS MEDICAMENTOS EN EL PERFIL DEL PACIENTE */
function mostrarMedicinas() {

    var cadena = '<div class="row">'
    fetch(`https://backend-proyecto-2.herokuapp.com/Medicamentos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            for (var i = 0; i < response.length; i++) {
                if (response[i].Cantidad > 0) {
                    cadena += ` <div class="col-lg-3 py-1" style="margin-left: 120px;">
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title text-dark">${response[i].Nombre}</h5>
                                    <p class="card-text text-dark">${response[i].Descripcion}</p>
                                    <div class"d-inline">
                                        <a class="card-link float-left">Q. ${response[i].Precio}</a>
                                        <button onclick="addMedicina(this)" value="${response[i].Codigo}" type="button" class="btn btn-modificar float-right">
                                            <img src="open-iconic-master/png/cart-8x.png" width="18px" height="18px">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    if (i < response.length - 1) {
                        i++
                        cadena += ` <div class="col-lg-3 py-1 mx-3">
                                <div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title text-dark">${response[i].Nombre}</h5>
                                        <p class="card-text text-dark">${response[i].Descripcion}</p>
                                        <div class"d-inline">
                                            <a class="card-link float-left">Q. ${response[i].Precio}</a>
                                            <button onclick="addMedicina(this)" value="${response[i].Codigo}" type="button" class="btn btn-modificar float-right">
                                                <img src="open-iconic-master/png/cart-8x.png" width="18px" height="18px">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        if (i < response.length - 1) {
                            i++
                            cadena += ` <div class="col-lg-3 mr-auto py-1">
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark">${response[i].Nombre}</h5>
                                            <p class="card-text text-dark">${response[i].Descripcion}</p>
                                            <div class"d-inline">
                                                <a class="card-link float-left">Q. ${response[i].Precio}</a>
                                                <button onclick="addMedicina(this)" value="${response[i].Codigo}" type="button" class="btn btn-modificar float-right">
                                                    <img src="open-iconic-master/png/cart-8x.png" width="18px" height="18px">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                        }
                    }

                }

            }
            cadena += '</div>'
            medicinas.innerHTML = cadena

        })
}

/**AÑADIR MEDICINAS AL PEDIDO DEL PACIENTE */
function addMedicina(boton) {
    var cantidad = 0
    var subtotal = 0.00

    var idPaciente = sessionStorage.usuario
    var codigo = parseInt(boton.value);

    fetch(`https://backend-proyecto-2.herokuapp.com/Medicamentos/${codigo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            cantidad = 1
            subtotal = cantidad * response.Precio

            var nueva = {
                'IdMedicina': codigo,
                'Nombre': response.Nombre,
                'Precio': response.Precio,
                'Cantidad': cantidad,
                'Subtotal': subtotal
            }

            Pedido.push(nueva);
            console.log(Pedido);

            addCarrito()
        })
}

/** MOSTRAR LOS MEDICAMENTOS SELECCIONADOS EN LA TABLA DEL PEDIDO */
function addCarrito() {
    total = 0
    for (let i = 0; i < Pedido.length; i++) {

        total += Pedido[i].Subtotal

        var tablaPedido = document.querySelector('#tabla-pedido')
        var cadena = ''

        fetch('https://backend-proyecto-2.herokuapp.com/Medicamentos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                response.forEach(element => {
                    if (Pedido[i].IdMedicina == element.Codigo) {
                        cadena += ` <tr class="table-light">
                                        <th scope="row">${element.Codigo}</th>
                                        <td>${element.Nombre}</td>
                                        <td>Q. ${element.Precio}.00</td>
                                        <td>${Pedido[i].Cantidad}</td>
                                        <td>Q. ${Pedido[i].Subtotal}.00</td>
                                        <td>
                                            <button onclick="" type="button" class="btn btn-carga"> + </button>
                                            <button onclick="" type="button" class="btn btn-carga"> - </button>
                                        </td>
                                    </tr>`
                    }
                })

                tablaPedido.innerHTML = cadena
                document.querySelector('#total').value = total
            })
    }

}

function agregarPedido() {

    var idPaciente = sessionStorage.usuario
    console.log(Pedido)

    if (total != 0) {

        var objeto = {
            "IdPaciente": idPaciente,
            "Medicinas": Pedido,
            "Total": total,
        }

        fetch('https://backend-proyecto-2.herokuapp.com/Pedidos', {
            method: 'POST',
            body: JSON.stringify(objeto),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
                alert("Ocurrio un error, ver consola")
            })
            .then(response => {
                alert(response.Mensaje)
                reportePedido()
            })

    } else {
        alert("Debe añadir algun medicamento a la lista.")
    }
}

/** CREAR EL REPORTE DEL PEDIDO REGISTRADO */
function reportePedido() {
    var idPaciente = sessionStorage.usuario

    fetch(`https://backend-proyecto-2.herokuapp.com/Pedidos/${idPaciente}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response)

            var doc = new jsPDF();
            doc.text(20, 20, "Reporte del Pedido");
            doc.setFontSize(12);
            doc.text(20, 30, "Codigo del Pedido: " + response.IdPedido);
            doc.text(20, 35, "Codigo del Paciente: " + response.IdPaciente);
            doc.text(20, 40, "Total del compra: Q. " + response.Total + ".00");

            var header = [{ title: "Codigo", dataKey: "codigo" },
            { title: "Nombre", dataKey: "nombre" },
            { title: "Precio", dataKey: "precio" },
            { title: "Cantidad", dataKey: "cantidad" },
            { title: "Subtotal", dataKey: "subtotal" }]
            var rows = []
            console.log(response.Medicinas);

            for (var i in response.Medicinas) {
                var objeto = {
                    "codigo": response.Medicinas[i].IdMedicina,
                    "nombre": response.Medicinas[i].Nombre,
                    "precio": response.Medicinas[i].Precio,
                    "cantidad": response.Medicinas[i].Cantidad,
                    "subtotal": response.Medicinas[i].Subtotal
                }
                rows.push(objeto)
            }

            doc.autoTable(header, rows, {
                theme: 'grid',
                margin: { top: 50 }
            });
            doc.save("pedidoMedicinas.pdf");

        })
}

/** MOSTRAR PERFIL DEL PACIENT EN paciente.html */
function verPerfilDelPaciente() {
    var user = sessionStorage.usuario

    var tablainfo = document.querySelector('#infoPerfil')
    var cadena = ''

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            cadena += `
                <tr>
                    <th scope="row">Nombre:</th>
                    <td>${response.Nombre}</td>
                </tr>
                <tr>
                    <th scope="row">Apellido:</th>
                    <td>${response.Apellido}</td>
                </tr>
                <tr>
                    <th scope="row">Nombre de Usuario:</th>
                    <td>${response.Username}</td>
                </tr>
                <tr>
                    <th scope="row">Contraseña:</th>
                    <td>${response.Password}</td>
                </tr>
                <tr>
                    <th scope="row"> Cita Activa </th>
                    <td>${cadenaCita}</td>
                </tr>
                <tr>
                    <th scope="row">Fecha de nacimiento:</th>
                    <td>${response.Nacimiento}</td>
                </tr>
                <tr>
                    <th scope="row">Sexo:</th>
                    <td>${sexo}</td>
                </tr>
                <tr>
                    <th scope="row">Teléfono:</th>
                    <td>${response.Telefono}</td>
                </tr>`
            tablainfo.innerHTML = cadena
        })
}

/** MOSTRAR LA CITA HECHA EN EL PREFIL DEL PACIENTE EN paciente.html */
function obtenerCitas() {
    idPaciente = sessionStorage.usuario

    fetch('https://backend-proyecto-2.herokuapp.com/Citas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                console.log(idPaciente)
                console.log(element.IdPaciente)
                if (idPaciente == element.IdPaciente) {
                    
                    cadenaCita = `-- Codigo:  ${element.IdCita} -- Estado: ${element.Estado}
                                    `
                    console.log(cadenaCita)

                }
            })
        })

}

/** SE CREA Y GUARDA UNA CITA DEL PACIENTE*/
function crearCita() {
    var user = sessionStorage.usuario

    var fecha = document.querySelector('#fecha-cita').value
    var hora = document.querySelector('#hora').value
    var motivo = document.querySelector('#motivo').value

    if (fecha != "" && hora != "" && motivo != "") {

        var objeto = {
            "IdPaciente": user,
            "Fecha": fecha,
            "Hora": hora,
            "Motivo": motivo,
            "Estado": "Pendiente",
            "IdDoctor": ""
        }

        fetch('https://backend-proyecto-2.herokuapp.com/Citas', {
            method: 'POST',
            body: JSON.stringify(objeto),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
                alert("Ocurrio un error, ver consola")
            })
            .then(response => {
                alert(response.Mensaje);
                location.reload();
            })

    } else {
        alert("Debe llenar todos los campos para hacer una solicitud.")
    }

}

function mostrarInfoPefilPaciente(){
    var user = sessionStorage.usuario
    console.log(user)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }

            document.querySelector('#usuario').value = response.Username
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#apellido').value = response.Apellido
            document.querySelector('#password').value = response.Password
            document.querySelector('#sexo').value = sexo
            document.querySelector('#telefono').value = response.Telefono
            document.querySelector('#nacimiento').value = response.Nacimiento
        })
}

/** METODO PARA QUE EL PACIENTE MODIFIQUE SU PROPIO PERIL*/
function modificarPerfilPropioPaciente(){
    var username = sessionStorage.usuario
    console.log(username)

    var user = document.querySelector('#usuario').value
    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var password = document.querySelector('#password').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value
    var nacimiento = document.querySelector('#nacimiento').value

    var objeto = {
        'Username': user,
        'Nombre': nombre,
        'Apellido': apellido,
        'Nacimiento': nacimiento,
        'Sexo': sexo,
        'Password': password,
        'Telefono': telefono,
        "Tipo": 0,
        "Especialidad": ""
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)

        })
}

/** FUNCIONES ONLOAD DE pacientes.html */
function metodoCargaPacientes() {
    obtenerCitas();

    mostrarMedicinas();
    
    addCarrito();

    verPerfilDelPaciente();
}
/**=============================================================================================================================== */

/*IR PERFIL DE LA ENFERMERA*/
function irAlEnfermera(username) {
    console.log(username);
    sessionStorage.setItem("usuario", username)
    location.href = 'enfermera.html'
}

/*MOSTRAR LAS CITAS PENDIENTES EN LA TABLA*/
function mostrarCitasPendientes() {
    var tabla = document.querySelector('#tabla-citas-pendientes')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Citas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if (element.Estado == 'Pendiente') {
                    cadena += ` <tr class="table-light">
                                    <th>${element.IdCita}</th>
                                    <td>${element.Fecha}</td>
                                    <td>${element.Hora}</td>
                                    <td>${element.Motivo}</td>
                                    <td>
                                        <button onclick="irAceptarCita(this)" value=${element.IdCita} type="button" class="btn btn-registrar"> Aceptar </button>
                                    </td>
                                    <td>
                                        <button onclick="rechazarCita(this)" value=${element.IdCita} type="button" class="btn btn-regresar"> Rechazar </button>
                                    </td>
                                </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

/*IR ACEPTAR CITA PARA ELEGIR UN DOCTOR*/
function irAceptarCita(boton) {
    console.log(boton)
    var idCita = boton.value
    sessionStorage.setItem("idcita", idCita)
    location.href = 'AceptarCita.html'
}

/*MOSTAR LA INFO DE LA CITA EN LA TABLA PARA ELEGIR UN DOCTOR*/
function mostrarInfoCita() {
    var idCita = sessionStorage.idcita
    var tabla = document.querySelector('#info-aceptar-cita')
    var cadena = ''

    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            sessionStorage.setItem('idPaciente', response.IdPaciente);
            console.log(sessionStorage.IdPaciente)
            cadena += ` <tr>
                            <th scope="row">Id Cita</th>
                            <td><input type="text" class="form-control" id="idcita" value="${response.IdCita}" disabled></td>
                        </tr>
                        <tr>
                            <th scope="row">Fecha</th>
                            <td><input type="text" class="form-control" id="fecha" value="${response.Fecha}" disabled></td>
                        </tr>
                        <tr>
                            <th scope="row">Hora</th>
                            <td><input type="text" class="form-control" id="hora" value="${response.Hora}" disabled></td>
                        </tr>
                        <tr>
                            <th scope="row">Motivo</th>
                            <td><input type="text" class="form-control" id="motivo" value="${response.Motivo}" disabled></td>
                        </tr>
                        <tr>
                            <th scope="row">Doctor</th>
                            <td>
                                <select class="form-control" id="doctores">`

            fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(res => res.json())
                .catch(err => {
                    console.error('Error:', err)
                })
                .then(response => {

                    response.forEach(element => {
                        if (element.Tipo == 1) {
                            cadena += `<option>${element.Username}</option>`
                        }
                    })
                    cadena += `         </select>
                            </td>
                        </tr>`
                    tabla.innerHTML = cadena


                })

            tabla.innerHTML = cadena

        })

}

/*ASIGNA EL DOCTOR A LA CITA Y LA PASA A ESTADO ACEPTADA*/
function aceptarCita() {
    var idCita = sessionStorage.idcita

    var idDoctor = document.querySelector('#doctores').value
    var idPaciente = sessionStorage.idPaciente
    var fecha = document.querySelector('#fecha').value
    var hora = document.querySelector('#hora').value
    var motivo = document.querySelector('#motivo').value

    var objeto = {
        'IdPaciente': idPaciente,
        'Fecha': fecha,
        'Hora': hora,
        'Motivo': motivo,
        'Estado': 'Aceptada',
        'IdDoctor': idDoctor
    }
    console.log(objeto)

    if (idDoctor != "") {
        fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
            method: 'PUT',
            body: JSON.stringify(objeto),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
                alert("Ocurrio un error, ver la consola")
            })
            .then(response => {
                console.log(response);
                location.href = 'enfermera.html'
            })
    } else {
        alert('Debe seleccionar un doctor.')
    }


}

function rechazarCita(boton) {
    var idCita = boton.value

    var idPaciente = ''
    var fecha = ''
    var hora = ''
    var motivo = ''

    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            idPaciente = response.IdPaciente
            fecha = response.Fecha
            hora = response.Hora
            motivo = response.Motivo

            console.log(idPaciente)
            console.log(fecha)
            console.log(hora)
            console.log(motivo)

            sessionStorage.setItem('idpaciente', idPaciente);
            sessionStorage.setItem('fecha', fecha);
            sessionStorage.setItem('hora', hora);
            sessionStorage.setItem('motivo', motivo);
        })

    var objeto = {
        'IdPaciente': sessionStorage.idpaciente,
        'Fecha': sessionStorage.fecha,
        'Hora': sessionStorage.hora,
        'Motivo': sessionStorage.motivo,
        'Estado': 'Rechazada',
        'IdDoctor': ''
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            location.href = 'enfermera.html'
        })

}

/*MOSTRAR LAS CITAS ACEPTADAS EN LA TABLA*/
function mostrarCitasAceptadas() {
    var tabla = document.querySelector('#tabla-citas-aceptadas')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Citas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if (element.Estado == 'Aceptada') {
                    cadena += ` <tr class="table-light">
                                    <th>${element.IdCita}</th>
                                    <td>${element.Fecha}</td>
                                    <td>${element.Hora}</td>
                                    <td>${element.Motivo}</td>
                                </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

function mostrarFactura() {
    var tabla = document.querySelector('#info-factura')
    var cadena = ''

    cadena += ` <tr>
                    <th scope="row">Fecha
                        <small id="" class="form-text text-muted">*Obligatorio</small>
                    </th>
                    <td><input class="form-control" type="date" id="fecha" step="1" min="2021-05-04" max="2021-12-31" value="2021-05-10"></td>
                </tr>
                <tr>
                    <th scope="row">Nombre del Paciente
                        <small id="" class="form-text text-muted">*Obligatorio</small>
                    </th>
                    <td><input type="text" class="form-control" id="idPaciente"></td>
                </tr>`

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            cadena += ` <tr>
                            <th scope="row">Doctor
                                <small id="" class="form-text text-muted">*Obligatorio</small>
                            </th>
                            <td>
                                <select class="form-control" id="doctores">`
            response.forEach(element => {
                if (element.Tipo == 1) {
                    cadena += `<option>${element.Nombre} ${element.Apellido}</option>`
                }
            })
            cadena += `         </select>
                            </td>
                        </tr>`

            cadena += ` <tr>
                            <th scope="row">Precio de Consulta
                                <small id="" class="form-text text-muted">*Obligatorio</small>
                            </th>
                            <td><input type="number" class="form-control" id="precioConsulta"></td>
                        </tr>
                        <tr>
                            <th scope="row">Costo de Operación</th>
                            <td><input type="number" class="form-control" id="costoOperacion"></td>
                        </tr>
                        <tr>
                            <th scope="row">Costo Internado</th>
                            <td><input type="number" class="form-control" id="costoInternado"></td>
                        </tr>
                        <tr>
                            <th scope="row">Total 
                                <small id="" class="form-text text-muted">*Obligatorio</small>
                            </th>
                            <td><input type="number" class="form-control" id="total"></td>
                        </tr>`

            tabla.innerHTML = cadena
        })
    tabla.innerHTML = cadena


}

function hacerFactura() {
    var idPaciente = document.querySelector('#idPaciente').value
    var nombreDoctor = document.querySelector('#doctores').value
    var fecha = document.querySelector('#fecha').value
    var precioConsulta = document.querySelector('#precioConsulta').value
    var costoOperacion = document.querySelector('#costoOperacion').value
    var costoInternado = document.querySelector('#costoInternado').value
    var total = document.querySelector('#total').value

    if (idPaciente != "" && nombreDoctor != "" && fecha != "" && precioConsulta != 0 && total != 0) {
        var doc = new jsPDF();
        doc.text(20, 20, "Factura");
        doc.setFontSize(12);
        doc.text(20, 30, "Nombre del paciente: " + idPaciente);
        doc.text(20, 35, "Nombre del doctor: " + nombreDoctor);
        doc.text(20, 40, "Fecha: " + fecha);
        doc.text(20, 45, "Precio de Consulta: Q. " + precioConsulta);
        doc.text(20, 50, "Costo de Operacion: Q. " + costoOperacion);
        doc.text(20, 55, "Costo Internado: Q. " + costoInternado);
        doc.text(20, 60, "Total: Q ." + total);

        doc.save("factura.pdf");
    } else {
        alert('Debe llenar los campos obligatorios');
    }


}

/*MUESTRA EK PERFIL DE LA ENFERMERA*/
function verPefilDeEnfermera() {
    var user = sessionStorage.usuario

    var tablainfo = document.querySelector('#infoPerfil')
    var cadena = ''

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            cadena += `
                <tr>
                    <th scope="row">Nombre:</th>
                    <td>${response.Nombre}</td>
                </tr>
                <tr>
                    <th scope="row">Apellido:</th>
                    <td>${response.Apellido}</td>
                </tr>
                <tr>
                    <th scope="row">Nombre de Usuario:</th>
                    <td>${response.Username}</td>
                </tr>
                <tr>
                    <th scope="row">Contraseña:</th>
                    <td>${response.Password}</td>
                </tr>
                <tr>
                    <th scope="row">Fecha de nacimiento:</th>
                    <td>${response.Nacimiento}</td>
                </tr>
                <tr>
                    <th scope="row">Sexo:</th>
                    <td>${sexo}</td>
                </tr>
                <tr>
                    <th scope="row">Teléfono:</th>
                    <td>${response.Telefono}</td>
                </tr>`
            tablainfo.innerHTML = cadena
        })
}

function mostrarInfoPefilEnfermera(){
    var user = sessionStorage.usuario
    console.log(user)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }

            document.querySelector('#usuario').value = response.Username
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#apellido').value = response.Apellido
            document.querySelector('#password').value = response.Password
            document.querySelector('#sexo').value = sexo
            document.querySelector('#telefono').value = response.Telefono
            document.querySelector('#nacimiento').value = response.Nacimiento
        })
}

/** METODO PARA QUE EL PACIENTE MODIFIQUE SU PROPIO PERIL*/
function modificarPerfilPropioEnfermera(){
    var username = sessionStorage.usuario
    console.log(username)

    var user = document.querySelector('#usuario').value
    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var password = document.querySelector('#password').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value
    var nacimiento = document.querySelector('#nacimiento').value

    var objeto = {
        'Username': user,
        'Nombre': nombre,
        'Apellido': apellido,
        'Nacimiento': nacimiento,
        'Sexo': sexo,
        'Password': password,
        'Telefono': telefono,
        "Tipo": 2,
        "Especialidad": ""
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)
        })
}

/*METODOS QUE SE CARGAN EN ONLOAD DEL PERFIL DE LA ENFERMERA*/
function metodoCargaEnfermeras() {
    verPefilDeEnfermera();
    mostrarCitasPendientes();
    mostrarCitasAceptadas();
}

/**=============================================================================================================================== */

/*IR PERFIL DEL DOCTOR*/
function irAlPerfilDoctor(username) {
    console.log(username);
    sessionStorage.setItem("usuario", username)
    location.href = 'doctor.html'
}

/*METODO PARA MOSTAR LOS DATOS DEL DOCTOR EN SU PERFIL*/
function verPerfilDelDoctor() {
    var user = sessionStorage.usuario

    var tablainfo = document.querySelector('#infoPerfil')
    var cadena = ''

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            nombreDoctor = response.Nombre + ' ' + response.Apellido
            sessionStorage.setItem('nombreDoctor', nombreDoctor)
            console.log(sessionStorage.nombreDoctor)
            cadena += `
                <tr>
                    <th scope="row">Nombre:</th>
                    <td>${response.Nombre}</td>
                </tr>
                <tr>
                    <th scope="row">Apellido:</th>
                    <td>${response.Apellido}</td>
                </tr>
                <tr>
                    <th scope="row">Nombre de Usuario:</th>
                    <td>${response.Username}</td>
                </tr>
                <tr>
                    <th scope="row">Contraseña:</th>
                    <td>${response.Password}</td>
                </tr>
                <tr>
                    <th scope="row"> Especialidad </th>
                    <td>${response.Especialidad}</td>
                </tr>
                <tr>
                    <th scope="row">Fecha de nacimiento:</th>
                    <td>${response.Nacimiento}</td>
                </tr>
                <tr>
                    <th scope="row">Sexo:</th>
                    <td>${sexo}</td>
                </tr>
                <tr>
                    <th scope="row">Teléfono:</th>
                    <td>${response.Telefono}</td>
                </tr>`
            tablainfo.innerHTML = cadena
        })
}

/*METODO PARA CREAR Y GUARADAR UNA RECETA*/
function crearReceta() {
    var nombre = document.querySelector('#nombre').value
    var fecha = document.querySelector('#fecha').value
    var padecimiento = document.querySelector('#padecimiento').value
    padecimiento = padecimiento.toLowerCase();
    console.log(padecimiento)
    var descripcion = document.querySelector('#descripcion').value
    var reporte = document.querySelector('#reporte').checked

    if (nombre != "" && fecha != "" && padecimiento != "" && descripcion != "") {

        var objeto = {
            "NombrePaciente": nombre,
            "Fecha": fecha,
            "Padecimiento": padecimiento,
            "Descripcion": descripcion
        }

        fetch('https://backend-proyecto-2.herokuapp.com/Recetas', {
            method: 'POST',
            body: JSON.stringify(objeto),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
                alert("Ocurrio un error, ver consola")
            })
            .then(response => {
                if (reporte) {
                    generarReporteReceta();
                }

                alert(response.Mensaje);
                location.reload();
            })

    } else {
        alert("Debe llenar todos los campos para hacer una receta,")
    }
}

function generarReporteReceta() {
    var nombre = document.querySelector('#nombre').value
    var fecha = document.querySelector('#fecha').value
    var padecimiento = document.querySelector('#padecimiento').value
    var descripcion = document.querySelector('#descripcion').value

    var doc = new jsPDF();
    doc.text(20, 20, "Reporte de Receta");

    var header = [{ title: "Campo", dataKey: "campo" },
    { title: "Informacion", dataKey: "info" }]
    var rows = []

    var objeto1 = {
        "campo": 'Nombre del Paciente',
        "info": nombre
    }
    rows.push(objeto1)

    var objeto2 = {
        "campo": 'Fecha',
        "info": fecha
    }
    rows.push(objeto2)

    var objeto3 = {
        "campo": 'Padecimiento',
        "info": padecimiento
    }
    rows.push(objeto3)

    var objeto4 = {
        "campo": 'Descripción',
        "info": descripcion
    }
    rows.push(objeto4)

    doc.autoTable(header, rows, {
        theme: 'grid',
        margin: { top: 25 }
    });
    doc.save("receta.pdf");
}

function mostrarCitasPendientesDoctor() {
    var tabla = document.querySelector('#tabla-citas-pendientes')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Citas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if (element.Estado == 'Pendiente') {
                    cadena += ` <tr class="table-light">
                                    <th><input type="text" class="form-control" value="${element.IdCita}" disabled></th>
                                    <th><input type="text" class="form-control" id="idpaciente${element.IdCita}" value="${element.IdPaciente}" disabled></th>
                                    <td><input type="text" class="form-control" id="fecha${element.IdCita}" value="${element.Fecha}" disabled></td>
                                    <td><input type="text" class="form-control" id="hora${element.IdCita}" value="${element.Hora}" disabled></td>
                                    <td><input type="text" class="form-control" id="motivo${element.IdCita}" value="${element.Motivo}" disabled></td>
                                    <td>
                                        <button onclick="aceptarCitaDoctor(this)" value=${element.IdCita} type="button" class="btn btn-registrar"> Aceptar </button>
                                    </td>
                                    <td>
                                        <button onclick="rechazarCitaDoctor(this)" value=${element.IdCita} type="button" class="btn btn-regresar"> Rechazar </button>
                                    </td>
                                </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

function aceptarCitaDoctor(boton) {
    var idCita = boton.value

    var idDoctor = sessionStorage.usuario
    var idPaciente = document.querySelector(`#idpaciente${idCita}`).value
    var fecha = document.querySelector(`#fecha${idCita}`).value
    var hora = document.querySelector(`#hora${idCita}`).value
    var motivo = document.querySelector(`#motivo${idCita}`).value

    var objeto = {
        'IdPaciente': idPaciente,
        'Fecha': fecha,
        'Hora': hora,
        'Motivo': motivo,
        'Estado': 'Aceptada',
        'IdDoctor': idDoctor
    }
    console.log(objeto)
    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            location.reload();
        })
    
}

function mostrarCitasAceptadasDoctor(){
    var idDoctor = sessionStorage.usuario

    var tabla = document.querySelector('#tabla-citas-aceptadas')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Citas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if ((element.Estado == 'Aceptada') && element.IdDoctor == idDoctor) {
                    
                    cadena += ` <tr class="table-light">
                                    <th><input type="text" class="form-control" value="${element.IdCita}" disabled></th>
                                    <th><input type="text" class="form-control" id="idpaciente${element.IdCita}" value="${element.IdPaciente}" disabled></th>
                                    <td><input type="text" class="form-control" id="fecha${element.IdCita}" value="${element.Fecha}" disabled></td>
                                    <td><input type="text" class="form-control" id="hora${element.IdCita}" value="${element.Hora}" disabled></td>
                                    <td><input type="text" class="form-control" id="motivo${element.IdCita}" value="${element.Motivo}" disabled></td>
                                    <td>
                                        <input type="checkbox" onchange="citaCompletada(this)" id="completada${element.IdCita}" value="${element.IdCita}">
                                    </td>
                                </tr>`
                } else if ((element.Estado == 'Completada') && element.IdDoctor == idDoctor) {
                    
                    cadena += ` <tr class="table-light">
                                    <th><input type="text" class="form-control" value="${element.IdCita}" disabled></th>
                                    <th><input type="text" class="form-control" id="idpaciente${element.IdCita}" value="${element.IdPaciente}" disabled></th>
                                    <td><input type="text" class="form-control" id="fecha${element.IdCita}" value="${element.Fecha}" disabled></td>
                                    <td><input type="text" class="form-control" id="hora${element.IdCita}" value="${element.Hora}" disabled></td>
                                    <td><input type="text" class="form-control" id="motivo${element.IdCita}" value="${element.Motivo}" disabled></td>
                                    <td>
                                        <input type="checkbox" onchange="citaCompletada(this)" id="completada${element.IdCita}" value="${element.IdCita}" checked>
                                    </td>
                                </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

function citaCompletada(checkbox){
    var idCita = checkbox.value
    var cb = checkbox.checked;
    var estado = ''
    if (cb){
        estado = 'Completada'
    } else {
        estado = 'Aceptada'
    }


    var idDoctor = sessionStorage.usuario
    var idPaciente = document.querySelector(`#idpaciente${idCita}`).value
    var fecha = document.querySelector(`#fecha${idCita}`).value
    var hora = document.querySelector(`#hora${idCita}`).value
    var motivo = document.querySelector(`#motivo${idCita}`).value

    var objeto = {
        'IdPaciente': idPaciente,
        'Fecha': fecha,
        'Hora': hora,
        'Motivo': motivo,
        'Estado': estado,
        'IdDoctor': idDoctor
    }
    console.log(objeto)
    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
        })
}

function rechazarCitaDoctor(boton) {
    var idCita = boton.value

    var idPaciente = ''
    var fecha = ''
    var hora = ''
    var motivo = ''

    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            idPaciente = response.IdPaciente
            fecha = response.Fecha
            hora = response.Hora
            motivo = response.Motivo

            console.log(idPaciente)
            console.log(fecha)
            console.log(hora)
            console.log(motivo)

            sessionStorage.setItem('idpaciente', idPaciente);
            sessionStorage.setItem('fecha', fecha);
            sessionStorage.setItem('hora', hora);
            sessionStorage.setItem('motivo', motivo);
        })

    var objeto = {
        'IdPaciente': sessionStorage.idpaciente,
        'Fecha': sessionStorage.fecha,
        'Hora': sessionStorage.hora,
        'Motivo': sessionStorage.motivo,
        'Estado': 'Rechazada',
        'IdDoctor': ''
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Citas/${idCita}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            location.reload();
        })

}

function mostrarInfoPefilDoctor(){
    var user = sessionStorage.usuario
    console.log(user)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }

            document.querySelector('#usuario').value = response.Username
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#apellido').value = response.Apellido
            document.querySelector('#especialidad').value = response.Especialidad
            document.querySelector('#password').value = response.Password
            document.querySelector('#sexo').value = sexo
            document.querySelector('#telefono').value = response.Telefono
            document.querySelector('#nacimiento').value = response.Nacimiento
        })
}

/** METODO PARA QUE EL PACIENTE MODIFIQUE SU PROPIO PERIL*/
function modificarPerfilPropioEnfermera(){
    var username = sessionStorage.usuario
    console.log(username)

    var user = document.querySelector('#usuario').value
    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var password = document.querySelector('#password').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value
    var nacimiento = document.querySelector('#nacimiento').value
    var especialidad = document.querySelector('#especialidad').value

    var objeto = {
        'Username': user,
        'Nombre': nombre,
        'Apellido': apellido,
        'Nacimiento': nacimiento,
        'Sexo': sexo,
        'Password': password,
        'Telefono': telefono,
        "Tipo": 1,
        "Especialidad": especialidad
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)
        })
}

/*METODOS QUE SE CARGAN EN ONLOAD DEL PERFIL DEL DOCTOR*/
function metodoCargaDoctores() {
    verPerfilDelDoctor();
    mostrarCitasPendientesDoctor();
    mostrarCitasAceptadasDoctor();
}

/**=============================================================================================================================== */
/** FUNCION PARA MOSTRAR LOS DATOS DE LOS PACIENTES EN LA TABLA DEL ADMINISTRADOR*/
function mostrarPacientes() {
    var tabla = document.querySelector('#datosPacientes')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if (element.Tipo == 0) {
                    cadena += `<tr>
                    <th>${element.Username}</th>
                    <td>${element.Nombre}</td>
                    <td>${element.Apellido}</td>
                    <td><button onclick="verPerfilPaciente(this)" value=${element.Username} type="button" class="btn btn-ver">
                            <img src="open-iconic-master/png/eye-8x.png" class="icon">
                        </button> 
                        <button onclick="modificarPerfilPaciente(this)" value=${element.Username} type="button" class="btn btn-modificar">
                            <img src="open-iconic-master/png/external-link-8x.png" class="icon">
                        </button>
                        <button onclick="eliminar(this)" value=${element.Username} type="button" class="btn btn-eliminar">
                            <img src="open-iconic-master/png/trash-8x.png" class="icon">
                        </button>
                        </td>
                    </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

/** FUNCION PARA EL BOTON VER PERFIL DE PACIENTES */
function verPerfilPaciente(boton) {
    console.log(boton)
    var usuario = boton.value
    sessionStorage.setItem("buscar", usuario)
    location.href = 'verPerfil.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DEL PACIENTE EN verPerfil.html */
function mostrarPerfilPaciente() {
    var user = sessionStorage.buscar
    console.log(user)
    var tabla2 = document.querySelector('#infoPerfil')
    var cadena = ""

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            cadena += ` <tr>
                        <th scope="row">Usuario</th>
                        <td id="usuario">${response.Username}</td>
                    </tr>
                    <tr>
                        <th scope="row">Nombre</th>
                        <td id="usuario">${response.Nombre}</td>
                    </tr>
                    <tr>
                        <th scope="row">Apellido</th>
                        <td id="usuario">${response.Apellido}</td>
                    </tr>
                    <tr>
                        <th scope="row">Contraseña</th>
                        <td id="usuario">${response.Password}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sexo</th>
                        <td id="usuario">${sexo}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telefono</th>
                        <td id="usuario">${response.Telefono}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fecha de nacimiento</th>
                        <td id="usuario">${response.Nacimiento}</td>
                    </tr>`
            tabla2.innerHTML = cadena
        })
}

/** FUNCION PARA EL BOTON MODIFICAR PERFIL DE PACIENTES */
function modificarPerfilPaciente(boton) {
    console.log(boton)
    var usuario = boton.value
    sessionStorage.setItem("buscar", usuario)
    location.href = 'modificarPerfil.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DEL PACIENTE EN modificarPerfil.html */
function mostrarPerfilPaciente2() {
    var user = sessionStorage.buscar
    console.log(user)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }

            document.querySelector('#usuario').value = response.Username
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#apellido').value = response.Apellido
            document.querySelector('#password').value = response.Password
            document.querySelector('#sexo').value = sexo
            document.querySelector('#telefono').value = response.Telefono
            document.querySelector('#nacimiento').value = response.Nacimiento
        })
}

/** FUNCION PARA MODIFICAR EL PERFIL DEL PACIENTE */
function modificarPaciente() {
    var username = sessionStorage.buscar
    console.log(username)

    var user = document.querySelector('#usuario').value
    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var password = document.querySelector('#password').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value
    var nacimiento = document.querySelector('#nacimiento').value

    var objeto = {
        'Username': user,
        'Nombre': nombre,
        'Apellido': apellido,
        'Nacimiento': nacimiento,
        'Sexo': sexo,
        'Password': password,
        'Telefono': telefono,
        "Tipo": 0,
        "Especialidad": ""
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)
        })
}

/** FUNCION PARA LEER EL ARCHIVO .CSV DE LOS PACIENTES*/
let btn_upload1 = document.getElementById('btn-upload-csv1').addEventListener('click', () => {
    Papa.parse(document.getElementById('upload-csv1').files[0], {
        download: true,
        header: true,
        complete: function (results) {
            var x;
            for (x in results.data) {
                console.log(results.data[x]);
                var sexo = false;
                if (results.data[x].Sexo == "M") {
                    sexo = true;
                } else {
                    sexo = false;
                }

                var objeto = {
                    "Username": results.data[x].Usuario,
                    "Nombre": results.data[x].Nombre,
                    "Apellido": results.data[x].Apellido,
                    "Nacimiento": results.data[x].Fecha,
                    "Sexo": sexo,
                    "Password": results.data[x].Contraseña,
                    "Telefono": results.data[x].Telefono,
                    "Tipo": 0,
                    "Especialidad": ""
                }

                fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
                    method: 'POST',
                    body: JSON.stringify(objeto),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(res => res.json())
                    .catch(err => {
                        console.error('Error:', err)
                    })
                    .then(response => {
                        console.log(response);
                        mostrarPacientes();
                    })
            }
        }
    });
});

/** FUNCION PARA GENERAR EL REPORTE PDF PARA LOS PACIENTES */
function reportePacientes() {

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {

            var doc = new jsPDF();
            doc.text(20, 20, "Reporte de Pacientes");

            var header = [{ title: "Usuario", dataKey: "usuario" },
            { title: "Nombre", dataKey: "nombre" },
            { title: "Apellido", dataKey: "apellido" },
            { title: "Fecha de nacimiento", dataKey: "fecha" },
            { title: "Sexo", dataKey: "sexo" },
            { title: "Contraseña", dataKey: "password" },
            { title: "Telefono", dataKey: "telefono" }]
            var rows = []

            for (var i in response) {
                if (response[i].Tipo == 0) {
                    var sexo = ""

                    if (response[i].Sexo) {
                        sexo = "Masculino"
                    } else {
                        sexo = "Femenino"
                    }

                    var objeto = {
                        "usuario": response[i].Username,
                        "nombre": response[i].Nombre,
                        "apellido": response[i].Apellido,
                        "fecha": response[i].Nacimiento,
                        "sexo": sexo,
                        "password": response[i].Password,
                        "telefono": response[i].Telefono,
                    }
                    rows.push(objeto)
                }
            }

            doc.autoTable(header, rows, {
                theme: 'grid',
                margin: { top: 25 }
            });
            doc.save("reportePacientes.pdf");

        })
}

/**=============================================================================================================================== */

/** FUNCION PARA LEER EL ARCHIVO .CSV DE LOS DOCTORES*/

let btn_upload2 = document.getElementById('btn-upload-csv2').addEventListener('click', () => {
    Papa.parse(document.getElementById('upload-csv2').files[0], {
        download: true,
        header: true,
        complete: function (results) {
            var x;
            for (x in results.data) {
                console.log(results.data[x]);
                var sexo = false;
                if (results.data[x].Sexo == "M") {
                    sexo = true;
                } else {
                    sexo = false;
                }

                var objeto = {
                    "Username": results.data[x].Usuario,
                    "Nombre": results.data[x].Nombre,
                    "Apellido": results.data[x].Apellido,
                    "Nacimiento": results.data[x].Fecha,
                    "Sexo": sexo,
                    "Password": results.data[x].Contraseña,
                    "Telefono": results.data[x].Telefono,
                    "Tipo": 1,
                    "Especialidad": results.data[x].Especialidad
                }

                fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
                    method: 'POST',
                    body: JSON.stringify(objeto),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(res => res.json())
                    .catch(err => {
                        console.error('Error:', err)
                    })
                    .then(response => {
                        console.log(response);
                        mostrarDoctores();
                    })
            }
        }
    });
});


/** FUNCION PARA MOSTRAR LOS DOCTORES EN LA TABLA DEL ADIMISTRADOR*/
function mostrarDoctores() {
    var tabla = document.querySelector('#datosDoctores')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if (element.Tipo == 1) {
                    cadena += `<tr>
                    <th>${element.Username}</th>
                    <td>${element.Nombre}</td>
                    <td>${element.Apellido}</td>
                    <td>${element.Especialidad}</td>
                    <td><button onclick="verPerfilDoctor(this)" value=${element.Username} type="button" class="btn btn-ver">
                            <img src="open-iconic-master/png/eye-8x.png" class="icon">
                        </button> 
                        <button onclick="modificarPerfilDoctor(this)" value=${element.Username} type="button" class="btn btn-modificar">
                            <img src="open-iconic-master/png/external-link-8x.png" class="icon">
                        </button>
                        <button onclick="eliminar(this)" value=${element.Username} type="button" class="btn btn-eliminar">
                            <img src="open-iconic-master/png/trash-8x.png" class="icon">
                        </button>
                        </td>
                    </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

/** FUNCION PARA EL BOTON VER PERFIL DE LOS DOCTORES*/
function verPerfilDoctor(boton) {
    console.log(boton)
    var usuario = boton.value
    sessionStorage.setItem("buscar", usuario)
    location.href = 'verPerfilDoctor.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DEL DOCTOR EN verPerfilDoctor.html */
function mostrarPerfilDoctor() {
    var user = sessionStorage.buscar
    console.log(user)
    var tabla3 = document.querySelector('#infoPerfil2')
    var cadenaD = ""

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            cadenaD += ` <tr>
                        <th scope="row">Usuario</th>
                        <td id="usuario">${response.Username}</td>
                    </tr>
                    <tr>
                        <th scope="row">Nombre</th>
                        <td id="usuario">${response.Nombre}</td>
                    </tr>
                    <tr>
                        <th scope="row">Apellido</th>
                        <td id="usuario">${response.Apellido}</td>
                    </tr>
                    <tr>
                        <th scope="row">Especialidad</th>
                        <td id="usuario">${response.Especialidad}</td>
                    </tr>
                    <tr>
                        <th scope="row">Contraseña</th>
                        <td id="usuario">${response.Password}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sexo</th>
                        <td id="usuario">${sexo}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telefono</th>
                        <td id="usuario">${response.Telefono}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fecha de nacimiento</th>
                        <td id="usuario">${response.Nacimiento}</td>
                    </tr>`
            tabla3.innerHTML = cadenaD
        })
}

/** FUNCION PARA EL BOTON MODIFICAR PERFIL DE DOCTORES */
function modificarPerfilDoctor(boton) {
    console.log(boton)
    var usuario = boton.value
    sessionStorage.setItem("buscar", usuario)
    location.href = 'modificarPerfilDoctor.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DEL DOCTOR EN modificarPerfilDoctor.html */
function mostrarPerfilDoctor2() {
    var user = sessionStorage.buscar
    console.log(user)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }

            document.querySelector('#usuario').value = response.Username
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#apellido').value = response.Apellido
            document.querySelector('#especialidad').value = response.Especialidad
            document.querySelector('#password').value = response.Password
            document.querySelector('#sexo').value = sexo
            document.querySelector('#telefono').value = response.Telefono
            document.querySelector('#nacimiento').value = response.Nacimiento
        })
}

/** FUNCION PARA MODIFICAR EL PERFIL DEL DOCTOR */
function modificarDoctor() {
    var username = sessionStorage.buscar
    console.log(username)

    var user = document.querySelector('#usuario').value
    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var password = document.querySelector('#password').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value
    var nacimiento = document.querySelector('#nacimiento').value
    var especialidad = document.querySelector('#especialidad').value

    var objeto = {
        'Username': user,
        'Nombre': nombre,
        'Apellido': apellido,
        'Nacimiento': nacimiento,
        'Sexo': sexo,
        'Password': password,
        'Telefono': telefono,
        "Tipo": 1,
        "Especialidad": especialidad
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)
        })
}

/** FUNCION PARA GENERAR EL REPORTE PDF PARA LOS DOCTORES */
function reporteDoctores() {

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {

            var doc = new jsPDF();
            doc.text(20, 20, "Reporte de Doctores");

            var header = [{ title: "Usuario", dataKey: "usuario" },
            { title: "Nombre", dataKey: "nombre" },
            { title: "Apellido", dataKey: "apellido" },
            { title: "Especialidad", dataKey: "especialidad" },
            { title: "Fecha de nacimiento", dataKey: "fecha" },
            { title: "Sexo", dataKey: "sexo" },
            { title: "Contraseña", dataKey: "password" },
            { title: "Telefono", dataKey: "telefono" }]
            var rows = []

            for (var i in response) {
                if (response[i].Tipo == 1) {
                    var sexo = ""

                    if (response[i].Sexo) {
                        sexo = "Masculino"
                    } else {
                        sexo = "Femenino"
                    }

                    var objeto = {
                        "usuario": response[i].Username,
                        "nombre": response[i].Nombre,
                        "apellido": response[i].Apellido,
                        "especialidad": response[i].Especialidad,
                        "fecha": response[i].Nacimiento,
                        "sexo": sexo,
                        "password": response[i].Password,
                        "telefono": response[i].Telefono,
                    }
                    rows.push(objeto)
                }
            }

            doc.autoTable(header, rows, {
                theme: 'grid',
                margin: { top: 25 }
            });
            doc.save("reporteDoctores.pdf");

        })
}

/**=============================================================================================================================== */

/** FUNCION PARA LEER EL ARCHIVO .CSV DE LAS ENFERMERAS*/
let btn_upload3 = document.getElementById('btn-upload-csv3').addEventListener('click', () => {
    Papa.parse(document.getElementById('upload-csv3').files[0], {
        download: true,
        header: true,
        complete: function (results) {
            var x;
            for (x in results.data) {
                console.log(results.data[x]);
                var sexo = false;
                if (results.data[x].Sexo == "M") {
                    sexo = true;
                } else {
                    sexo = false;
                }

                var objeto = {
                    "Username": results.data[x].Usuario,
                    "Nombre": results.data[x].Nombre,
                    "Apellido": results.data[x].Apellido,
                    "Nacimiento": results.data[x].Fecha,
                    "Sexo": sexo,
                    "Password": results.data[x].Contraseña,
                    "Telefono": results.data[x].Telefono,
                    "Tipo": 2,
                    "Especialidad": ""
                }

                fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
                    method: 'POST',
                    body: JSON.stringify(objeto),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(res => res.json())
                    .catch(err => {
                        console.error('Error:', err)
                    })
                    .then(response => {
                        console.log(response);
                        mostrarEnfermeras();
                    })
            }
        }
    });
});

/** FUNCION PARA MOSTRAR LAS ENFERMERAS EN LA TABLA DEL ADIMISTRADOR*/
function mostrarEnfermeras() {
    var tabla = document.querySelector('#datosEnfermeras')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {
                if (element.Tipo == 2) {
                    cadena += `<tr>
                    <th>${element.Username}</th>
                    <td>${element.Nombre}</td>
                    <td>${element.Apellido}</td>
                    <td><button onclick="verPerfilEnfermera(this)" value=${element.Username} type="button" class="btn btn-ver">
                            <img src="open-iconic-master/png/eye-8x.png" class="icon">
                        </button> 
                        <button onclick="modificarPerfilEnfermera(this)" value=${element.Username} type="button" class="btn btn-modificar">
                            <img src="open-iconic-master/png/external-link-8x.png" class="icon">
                        </button>
                        <button onclick="eliminar(this)" value=${element.Username} type="button" class="btn btn-eliminar">
                            <img src="open-iconic-master/png/trash-8x.png" class="icon">
                        </button>
                        </td>
                    </tr>`
                }
            })
            tabla.innerHTML = cadena
        })
}

/** FUNCION PARA EL BOTON VER PERFIL DE LAS ENFERMERAS*/
function verPerfilEnfermera(boton) {
    console.log(boton)
    var usuario = boton.value
    sessionStorage.setItem("buscar", usuario)
    location.href = 'verPerfilEnfermera.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DE LA ENFERMERA EN verPerfilEnfermera.html */
function mostrarPerfilEnfermera() {
    var user = sessionStorage.buscar
    console.log(user)
    var tabla3 = document.querySelector('#infoPerfil3')
    var cadenaD = ""

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            cadenaD += ` <tr>
                        <th scope="row">Usuario</th>
                        <td id="usuario">${response.Username}</td>
                    </tr>
                    <tr>
                        <th scope="row">Nombre</th>
                        <td id="usuario">${response.Nombre}</td>
                    </tr>
                    <tr>
                        <th scope="row">Apellido</th>
                        <td id="usuario">${response.Apellido}</td>
                    </tr>
                    <tr>
                        <th scope="row">Contraseña</th>
                        <td id="usuario">${response.Password}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sexo</th>
                        <td id="usuario">${sexo}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telefono</th>
                        <td id="usuario">${response.Telefono}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fecha de nacimiento</th>
                        <td id="usuario">${response.Nacimiento}</td>
                    </tr>`
            tabla3.innerHTML = cadenaD
        })
}

/** FUNCION PARA EL BOTON MODIFICAR PERFIL DE LA ENFERMERA */
function modificarPerfilEnfermera(boton) {
    console.log(boton)
    var usuario = boton.value
    sessionStorage.setItem("buscar", usuario)
    location.href = 'modificarPerfilEnfermera.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DE LA ENFERMERA EN modificarPerfilEnfermera.html */
function mostrarPerfilEnfermera2() {
    var user = sessionStorage.buscar
    console.log(user)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }

            document.querySelector('#usuario').value = response.Username
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#apellido').value = response.Apellido
            document.querySelector('#password').value = response.Password
            document.querySelector('#sexo').value = sexo
            document.querySelector('#telefono').value = response.Telefono
            document.querySelector('#nacimiento').value = response.Nacimiento
        })
}

/** FUNCION PARA MODIFICAR EL PERFIL DE LA ENFERMERA */
function modificarEnfermera() {
    var username = sessionStorage.buscar
    console.log(username)

    var user = document.querySelector('#usuario').value
    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var password = document.querySelector('#password').value
    var sexo = document.querySelector('#sexo').value
    var telefono = document.querySelector('#telefono').value
    var nacimiento = document.querySelector('#nacimiento').value

    var objeto = {
        'Username': user,
        'Nombre': nombre,
        'Apellido': apellido,
        'Nacimiento': nacimiento,
        'Sexo': sexo,
        'Password': password,
        'Telefono': telefono,
        "Tipo": 2,
        "Especialidad": ""
    }
    console.log(objeto)

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)
        })
}

/** FUNCION PARA GENERAR EL REPORTE PDF PARA LAS ENFERMERAS */
function reporteEnfermeras() {

    fetch('https://backend-proyecto-2.herokuapp.com/Usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {

            var doc = new jsPDF();
            doc.text(20, 20, "Reporte de Enfermeras");

            var header = [{ title: "Usuario", dataKey: "usuario" },
            { title: "Nombre", dataKey: "nombre" },
            { title: "Apellido", dataKey: "apellido" },
            { title: "Fecha de nacimiento", dataKey: "fecha" },
            { title: "Sexo", dataKey: "sexo" },
            { title: "Contraseña", dataKey: "password" },
            { title: "Telefono", dataKey: "telefono" }]
            var rows = []

            for (var i in response) {
                if (response[i].Tipo == 2) {
                    var sexo = ""

                    if (response[i].Sexo) {
                        sexo = "Masculino"
                    } else {
                        sexo = "Femenino"
                    }

                    var objeto = {
                        "usuario": response[i].Username,
                        "nombre": response[i].Nombre,
                        "apellido": response[i].Apellido,
                        "fecha": response[i].Nacimiento,
                        "sexo": sexo,
                        "password": response[i].Password,
                        "telefono": response[i].Telefono,
                    }
                    rows.push(objeto)
                }
            }

            doc.autoTable(header, rows, {
                theme: 'grid',
                margin: { top: 25 }
            });
            doc.save("reporteEnfermeras.pdf");

        })
}

/**=============================================================================================================================== */

/** FUNCION PARA LEER EL ARCHIVO .CSV DE LOS MEDICAMENTOS*/
let btn_upload4 = document.getElementById('btn-upload-csv4').addEventListener('click', () => {
    Papa.parse(document.getElementById('upload-csv4').files[0], {
        download: true,
        header: true,
        complete: function (results) {
            var x;
            for (x in results.data) {
                console.log(results.data[x]);

                var objeto = {
                    "Nombre": results.data[x].Nombre,
                    "Precio": results.data[x].Precio,
                    "Descripcion": results.data[x].Descripcion,
                    "Cantidad": results.data[x].Cantidad
                }

                fetch('https://backend-proyecto-2.herokuapp.com/Medicamentos', {
                    method: 'POST',
                    body: JSON.stringify(objeto),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(res => res.json())
                    .catch(err => {
                        console.error('Error:', err)
                    })
                    .then(response => {
                        console.log(response);
                        mostrarMedicamentos();
                    })
            }
        }
    });
});


/** FUNCION PARA MOSTRAR LOS MEDICAMENTOS EN LA TABLA DEL ADIMISTRADOR*/
function mostrarMedicamentos() {
    var tabla = document.querySelector('#datosMedicamentos')
    var cadena = ''

    fetch('https://backend-proyecto-2.herokuapp.com/Medicamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
        })
        .then(response => {
            response.forEach(element => {

                cadena += `<tr>
            <th>${element.Codigo}</th>
            <td>${element.Nombre}</td>
            <td>${element.Precio}</td>
            <td><button onclick="verPerfilMedicamento(this)" value=${element.Codigo} type="button" class="btn btn-ver">
                    <img src="open-iconic-master/png/eye-8x.png" class="icon">
                </button> 
                <button onclick="modificarPerfilMedicamento(this)" value=${element.Codigo} type="button" class="btn btn-modificar">
                    <img src="open-iconic-master/png/external-link-8x.png" class="icon">
                </button>
                <button onclick="eliminarMedicamento(this)" value=${element.Codigo} type="button" class="btn btn-eliminar">
                    <img src="open-iconic-master/png/trash-8x.png" class="icon">
                </button>
                </td>
            </tr>`

            })
            tabla.innerHTML = cadena
        })
}

/** FUNCION PARA EL BOTON VER PERFIL DE LOS MEDICAMENTOS*/
function verPerfilMedicamento(boton) {
    console.log(boton)
    var codigo = boton.value
    sessionStorage.setItem("buscar", codigo)
    location.href = 'verPerfilMedicamento.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DEL MEDICAMENTO EN verPerfilMedicamento.html */
function mostrarPerfilMedicamento() {
    var codigo = sessionStorage.buscar
    console.log(codigo)
    var tabla4 = document.querySelector('#infoPerfil4')
    var cadenaM = ""

    fetch(`https://backend-proyecto-2.herokuapp.com/Medicamentos/${codigo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)

            var sexo = "";
            if (response.Sexo) {
                sexo = "Masculino"
            } else {
                sexo = "Femenino"
            }
            cadenaM += `<tr>
                        <th scope="row">Código</th>
                        <td id="usuario">${response.Codigo}</td>
                    </tr>
                    <tr>
                        <th scope="row">Nombre</th>
                        <td id="usuario">${response.Nombre}</td>
                    </tr>
                    <tr>
                        <th scope="row">Precio</th>
                        <td id="usuario">Q ${response.Precio}</td>
                    </tr>
                    <tr>
                        <th scope="row">Descripción</th>
                        <td id="usuario">${response.Descripcion}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cantidad</th>
                        <td id="usuario">${response.Cantidad}</td>
                    </tr>
                    <tr>`
            tabla4.innerHTML = cadenaM
        })
}

/** FUNCION PARA EL BOTON MODIFICAR PERFIL DEL MEDICAMENTO */
function modificarPerfilMedicamento(boton) {
    console.log(boton)
    var codigo = boton.value
    sessionStorage.setItem("buscar", codigo)
    location.href = 'modificarPerfilMedicamento.html'
}

/** FUNCION PARA MOSTAR EL PERFIL DEL MEDICAMENTO EN modificarPerfilMedicamento.html */
function mostrarPerfilMedicamento2() {
    var codigo = sessionStorage.buscar
    console.log(codigo)

    fetch(`https://backend-proyecto-2.herokuapp.com/Medicamentos/${codigo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert('Ocurrio un error, ver consola')
        })
        .then(response => {
            console.log(response)


            document.querySelector('#codigo').value = response.Codigo
            document.querySelector('#nombre').value = response.Nombre
            document.querySelector('#precio').value = response.Precio
            document.querySelector('#descripcion').value = response.Descripcion
            document.querySelector('#cantidad').value = response.Cantidad
        })
}

/** FUNCION PARA MODIFICAR EL PERFIL DEL MEDICAMENTO */
function modificarMedicamento() {
    var codigo = sessionStorage.buscar

    var nombre = document.querySelector('#nombre').value
    var precio = document.querySelector('#precio').value
    var descripcion = document.querySelector('#descripcion').value
    var cantidad = document.querySelector('#cantidad').value

    var objeto = {
        'Nombre': nombre,
        'Precio': precio,
        'Descripcion': descripcion,
        'Cantidad': cantidad
    }

    fetch(`https://backend-proyecto-2.herokuapp.com/Medicamentos/${codigo}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje)
        })
}

/**FUNCION PARA ELIMINAR UN MEDICAMENTO  */
function eliminarMedicamento(boton) {
    var codigo = boton.value

    fetch(`https://backend-proyecto-2.herokuapp.com/Medicamentos/${codigo}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje);
            location.reload();
        })

}

/** FUNCION PARA GENERAR EL REPORTE PDF PARA LOS MEDICAMENTOS */
function reporteMedicamentos() {

    fetch('https://backend-proyecto-2.herokuapp.com/Medicamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {

            var doc = new jsPDF();
            doc.text(20, 20, "Reporte de Medicamentos");

            var header = [{ title: "Código", dataKey: "codigo" },
            { title: "Nombre", dataKey: "nombre" },
            { title: "Precio(Q.)", dataKey: "precio" },
            { title: "Descripción", dataKey: "descripcion" },
            { title: "Cantidad", dataKey: "cantidad" }]
            var rows = []

            for (var i in response) {
                var objeto = {
                    "codigo": response[i].Codigo,
                    "nombre": response[i].Nombre,
                    "precio": response[i].Precio,
                    "descripcion": response[i].Descripcion,
                    "cantidad": response[i].Cantidad
                }
                rows.push(objeto)
            }

            doc.autoTable(header, rows, {
                theme: 'grid',
                margin: { top: 25 }
            });
            doc.save("reporteMedicamentos.pdf");

        })
}

/**===============================================================================================================================*/
/**FUNCION PARA ELIMINAR UN USUARIO  */
function eliminar(boton) {
    var username = boton.value

    fetch(`https://backend-proyecto-2.herokuapp.com/Usuarios/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            console.log(response);
            alert(response.Mensaje);
            location.reload();
        })

}

/** FUNCION QUE LLAMA A TODAS LAS FUNCIONES PARA MOSTRAR LOS DATOS EN LAS TABLAS DEL ADMIN */
function mostrarTablasAdmin() {
    mostrarPacientes();
    mostrarDoctores();
    mostrarEnfermeras();
    mostrarMedicamentos();
}

