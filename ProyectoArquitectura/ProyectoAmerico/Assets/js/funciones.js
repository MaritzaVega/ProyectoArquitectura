let tblUsuarios,tblProductos,tblProductosReporte;
document.addEventListener("DOMContentLoaded", function(){
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + "Usuarios/listar",
            dataSrc:''
        },
        columns:[
            {
            'data' : 'id'
            },
            {
            'data' : 'usuario'
            },
            {
            'data' :'nombre'
            },
            {
            'data' :'numdoc'
            },
            {
            'data' : 'estado'
            },
            {
            'data' : 'acciones'
            }
        ]
        
    });
    //Fin de tabla ususarios
    tblProductos = $('#tblProductos').DataTable({
        ajax: {
            url: base_url + "Productos/listar",
            dataSrc:''
        },
        columns:[
            {
            'data' : 'id'
            },
            {
            'data' : 'imagen'
            },
            {
            'data' : 'codigo'
            },
            {
            'data' :'descripcion'
            },
            {
            'data' :'precio_venta'
            },
            {
            'data' : 'cantidad'
            },
            {
            'data' : 'nivel'
            },
            {
            'data' : 'estado'
            },
            {
            'data' : 'acciones'
            }
        ]
        
    });
    //Fin de Producto
    $('#t_reporte_c').DataTable({
        ajax: {
            url: base_url + "Compras/listar_reporte",
            dataSrc:''
        },
        columns:[
            {
            'data' : 'id'
            },
            {
            'data' : 'total'
            },
            {
            'data' : 'fecha'
            },
            {
            'data' : 'acciones'
            }
        ]
        
    });
    //Fin de tabla ususarios
    tblProductosReporte = $('#tblProductosReporte').DataTable({
        ajax: {
            url: base_url + "ProductosReporte/listar",
            dataSrc:''
        },
        columns:[
            {
            'data' : 'id'
            },
            {
            'data' : 'imagen'
            },
            {
            'data' : 'codigo'
            },
            {
            'data' :'descripcion'
            },
            {
            'data' :'precio_venta'
            },
            {
            'data' : 'cantidad'
            },
            {
            'data' : 'nivel'
            },
            {
            'data' : 'estado'
            }
        ]
        
    });
})



//abre le modal de los usuarios
function frmUsuario(){
    document.getElementById("title").innerHTML = "Registrar Nuevo Usuario";
    document.getElementById("btnAccion").innerHTML = "Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo-usuario").modal("show"); 
    document.getElementById("id").value="";
}
//esta funcion trabaja con ->Usuarios.php
function registrarUser(e){ // detiene que la página se cargue de nuevo
    e.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    const documentos = document.getElementById("documentos");
    const numDocumento = document.getElementById("numDocumento");
    //Valida campos vacio
    if(usuario.value == "" || nombre.value == "" || documentos =="" || numDocumento.value == ""){
       //SwetAlert 
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000,
            position: 'center'
            
          })
    }else{
        //peticion
        const url = base_url + "Usuarios/registrar";
        const frm = document.getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true); //ejecutar de forma asincrona
        http.send(new FormData(frm));
        http.onreadystatechange = function(){//se ejecutara cada vez que cambia
            if(this.readyState == 4 && this.status == 200){
                const res = JSON.parse(this.responseText);
                if(res == "si")
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    frm.reset();
                    $("#nuevo-usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                }else if(res=="Modificado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo-usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            } 
        }
            
    }

}  

function btnEditarUser(id){ // detiene que la página se cargue de nuevo
   document.getElementById("title").innerHTML = "Actualizar Usuario";
   document.getElementById("btnAccion").innerHTML = "Modificar";

    //mostrar los datos en el modal
    const url = base_url + "Usuarios/editar/"+id;
    const frm = document.getElementById("frmUsuario");
    const http = new XMLHttpRequest();
    http.open("GET", url, true); //ejecutar de forma asincrona
    http.send();
    http.onreadystatechange = function(){//se ejecutara cada vez que cambia
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);

            document.getElementById("id").value = res.id;
            document.getElementById("usuario").value = res.usuario;
            document.getElementById("nombre").value = res.nombre;
            document.getElementById("documentos").value = res.id_numdoc;
            document.getElementById("numDocumento").value = res.numdoc;
            document.getElementById("claves").classList.add("d-none");
            $("#nuevo-usuario").modal("show");
        } 
    }

    

} 

function btnEliminarUser(id ){
    Swal.fire({
        title: 'Está seguro de eliminar?',
        text: "El usuario no se eliminará de forma permanente, solo cambiará su estado a INACTIVO!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
                //mostrar los datos en el modal
                const url = base_url + "Usuarios/eliminar/"+id;
                const frm = document.getElementById("frmUsuario");
                const http = new XMLHttpRequest();
                http.open("GET", url, true); //ejecutar de forma asincrona
                http.send();
                http.onreadystatechange = function(){//se ejecutara cada vez que cambia
                    if(this.readyState == 4 && this.status == 200){
                        const res = JSON.parse(this.responseText);
                        if(res == "ok"){
                            Swal.fire(
                                'Mensaje!',
                                'Usuario eliminado con éxito.',
                                'success'
                            )
                            tblUsuarios.ajax.reload();
                        }else{
                            Swal.fire(
                                'Mensaje!',
                                 res,
                                'error'
                            )
                        }
                    } 
                }
                
        }
      })

}

function btnReingresarUser(id ){
    Swal.fire({
        title: 'Está seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
                //mostrar los datos en el modal
                const url = base_url + "Usuarios/reingresar/"+id;
                const frm = document.getElementById("frmUsuario");
                const http = new XMLHttpRequest();
                http.open("GET", url, true); //ejecutar de forma asincrona
                http.send();
                http.onreadystatechange = function(){//se ejecutara cada vez que cambia
                    if(this.readyState == 4 && this.status == 200){
                        const res = JSON.parse(this.responseText);
                        if(res == "ok"){
                            Swal.fire(
                                'Mensaje!',
                                'Usuario reingresado con éxito.',
                                'success'
                            )
                            tblUsuarios.ajax.reload();
                        }else{
                            Swal.fire(
                                'Mensaje!',
                                 res,
                                'error'
                            )
                        }
                    } 
                }
                
        }
      })

}
//Fin usuario
function frmProducto(){
    document.getElementById("title").innerHTML = "Nuevo Producto";
    document.getElementById("btnAccion").innerHTML = "Registrar";
    document.getElementById("frmProducto").reset();
    $("#nuevo-producto").modal("show"); 
    document.getElementById("id").value="";
    deleteImg();
}
//esta funcion trabaja con ->Usuarios.php
function registrarPro(e){ // detiene que la página se cargue de nuevo
    e.preventDefault();
    const codigo = document.getElementById("codigo");
    const nombre = document.getElementById("nombre");
    const precio_compra = document.getElementById("precio_compra");
    const precio_venta = document.getElementById("precio_venta");
    const nivel = document.getElementById("nivel");
    //Valida campos vacio
    if(codigo.value == "" || nombre.value == "" || precio_compra =="" || precio_venta.value == "" || nivel ==""){
       //SwetAlert 
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000,
            position: 'center'
            
          })
    }else{
        //peticion
        const url = base_url + "Productos/registrar";
        const frm = document.getElementById("frmProducto");
        const http = new XMLHttpRequest();
        http.open("POST", url, true); //ejecutar de forma asincrona
        http.send(new FormData(frm));
        http.onreadystatechange = function(){//se ejecutara cada vez que cambia
            if(this.readyState == 4 && this.status == 200){
                const res = JSON.parse(this.responseText);
               if(res == "si")
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Producto registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    frm.reset();
                    $("#nuevo-producto").modal("hide");
                    tblProductos.ajax.reload();
                }else if(res=="Modificado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Producto modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo-producto").modal("hide");
                    tblProductos.ajax.reload();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            } 
        }
            
    }

}  

function btnEditarPro(id){ // detiene que la página se cargue de nuevo
   document.getElementById("title").innerHTML = "Actualizar Producto";
   document.getElementById("btnAccion").innerHTML = "Modificar";

    //mostrar los datos en el modal
    const url = base_url + "Productos/editar/"+id;
    const frm = document.getElementById("frmUsuario");
    const http = new XMLHttpRequest();
    http.open("GET", url, true); //ejecutar de forma asincrona
    http.send();
    http.onreadystatechange = function(){//se ejecutara cada vez que cambia
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);

            document.getElementById("id").value = res.id;
            document.getElementById("codigo").value = res.codigo;
            document.getElementById("nombre").value = res.descripcion;
            document.getElementById("precio_compra").value = res.precio_compra;
            document.getElementById("precio_venta").value = res.precio_venta;
            //foto
            document.getElementById("img-preview").src = base_url + 'Assets/img/'+res.foto;
            document.getElementById("icon-cerrar").innerHTML = `<button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button>`;
            document.getElementById("icon-image").classList.add("d-none");
            document.getElementById("foto_actual").value = res.foto;

            document.getElementById("nivel").value = res.nivel;
            $("#nuevo-producto").modal("show");
        } 
    }

    

} 

function btnEliminarPro(id ){
    Swal.fire({
        title: 'Está seguro de eliminar?',
        text: "El producto no se eliminará de forma permanente, solo cambiará su estado a INACTIVO!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
                //mostrar los datos en el modal
                const url = base_url + "Productos/eliminar/"+id;
                const frm = document.getElementById("frmUsuario");
                const http = new XMLHttpRequest();
                http.open("GET", url, true); //ejecutar de forma asincrona
                http.send();
                http.onreadystatechange = function(){//se ejecutara cada vez que cambia
                    if(this.readyState == 4 && this.status == 200){
                        const res = JSON.parse(this.responseText);
                        if(res == "ok"){
                            Swal.fire(
                                'Mensaje!',
                                'Producto eliminado con éxito.',
                                'success'
                            )
                            tblProductos.ajax.reload();
                        }else{
                            Swal.fire(
                                'Mensaje!',
                                 res,
                                'error'
                            )
                        }
                    } 
                }
                
        }
      })

}

function btnReingresarPro(id ){
    Swal.fire({
        title: 'Está seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
                //mostrar los datos en el modal
                const url = base_url + "Productos/reingresar/"+id;
                const frm = document.getElementById("frmUsuario");
                const http = new XMLHttpRequest();
                http.open("GET", url, true); //ejecutar de forma asincrona
                http.send();
                http.onreadystatechange = function(){//se ejecutara cada vez que cambia
                    if(this.readyState == 4 && this.status == 200){
                        const res = JSON.parse(this.responseText);
                        if(res == "ok"){
                            Swal.fire(
                                'Mensaje!',
                                'Producto reingresado con éxito.',
                                'success'
                            )
                            tblProductos.ajax.reload();
                        }else{
                            Swal.fire(
                                'Mensaje!',
                                 res,
                                'error'
                            )
                        }
                    } 
                }
                
        }
      })

}

function preview(e) {
    const url = e.target.files[0];
    const urlTmp = URL.createObjectURL(url);
    document.getElementById("img-preview").src = urlTmp;
    document.getElementById("icon-image").classList.add("d-none");
    document.getElementById("icon-cerrar").innerHTML = `<button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button> ${url["name"]}`;
}

function deleteImg() {
    document.getElementById("icon-cerrar").innerHTML = '';
    document.getElementById("icon-image").classList.remove("d-none");
    document.getElementById("img-preview").src = '';
    document.getElementById("imagen").value = '';
    document.getElementById("foto_actual").value = '';
}

//Buscar codigo
function buscarCodigo(e){
    e.preventDefault();
    if(e.which == 13){
        const cod = document.getElementById("codigo").value;
        const url = base_url + "Compras/buscarCodigo/"+cod;
        const http = new XMLHttpRequest();
        http.open("GET", url, true); //ejecutar de forma asincrona
        http.send();
        http.onreadystatechange = function(){//se ejecutara cada vez que cambia
             if(this.readyState == 4 && this.status == 200){
                const res = JSON.parse(this.responseText);
                if(res){
                    document.getElementById("nombre").value = res.descripcion;
                document.getElementById("precio").value = res.precio_compra;
                document.getElementById("id").value = res.id;
                document.getElementById("cantidad").focus();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Producto no existente',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    document.getElementById("codigo").value = '';
                    document.getElementById("codigo").focus();
                }
            }
        }
    }

}
////vista compra
function calcularPrecio(e){

        e.preventDefault();
        const cant = document.getElementById("cantidad").value;
        const precio = document.getElementById("precio").value;
        document.getElementById("sub_total").value = precio * cant;

        if(e.which == 13){ //tecla ENTER = 13
            if(cant>0){
                const url = base_url + "Compras/ingresar/";
                const frm = document.getElementById("frmCompra");
                const http = new XMLHttpRequest();
                http.open("POST", url, true); //ejecutar de forma asincrona
                http.send(new FormData(frm));
                http.onreadystatechange = function(){//se ejecutara cada vez que cambia
                    if(this.readyState == 4 && this.status == 200){
                        console.log(this.responseText);
                        const res = JSON.parse(this.responseText);
                        if (res == 'ok'){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Producto Ingresado',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                            frm.reset();
                            cargarDetalle();
                        }else if(res == 'modificado'){
                            Swal.fire(
                               {
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Producto Actualizado',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                            frm.reset();
                            cargarDetalle();
                        }
                        
                    }
                }

            }
        }

    
}

if(document.getElementById('tblDetalle')){
    cargarDetalle();
}
function cargarDetalle(){
    const url = base_url + "Compras/listar/";
    const http = new XMLHttpRequest();
    http.open("GET", url, true); //ejecutar de forma asincrona
    http.send();
    http.onreadystatechange = function(){//se ejecutara cada vez que cambia
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            let html = '';
            res.detalle.forEach(row => {
                html += `<tr> 
                <td>${row['id']}</td>
                <td>${row['descripcion']}</td>
                <td>${row['cantidad']}</td>
                <td>${row['precio']}</td>
                <td>${row['sub_total']}</td>
                <td>
                <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row['id']})">
                <i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>`;
            });
            document.getElementById("tblDetalle").innerHTML=html;
            document.getElementById("total").value=res.total_pagar.total;
        }
    }
       
}
function deleteDetalle(id){
    const url = base_url + "Compras/delete/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true); //ejecutar de forma asincrona
    http.send();
    http.onreadystatechange = function(){//se ejecutara cada vez que cambia
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            if (res == 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto eliminado',
                    showConfirmButton: false,
                    timer: 3000
                })
                cargarDetalle();
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al eliminar el producto',
                    showConfirmButton: false,
                    timer: 3000
                })
            }

        }
    }
}  
function generarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
                //mostrar los datos en el modal
                const url = base_url + "Compras/registrarCompra/";
                const http = new XMLHttpRequest();
                http.open("GET", url, true); //ejecutar de forma asincrona
                http.send();
                http.onreadystatechange = function(){//se ejecutara cada vez que cambia
                    if(this.readyState == 4 && this.status == 200){
                        const res = JSON.parse(this.responseText);
                        if(res.msg == "ok"){
                            Swal.fire(
                                'Mensaje!',
                                'Compra generada.',
                                'success'
                            )
                            const ruta = base_url + 'Compras/generarPdf/'+ res.id_compra;
                            window.open(ruta);
                            setTimeout(() => {
                                window.location.reload();
                            }, 300);

                        }else{
                            Swal.fire(
                                'Mensaje!',
                                 res,
                                'error'
                            )
                        }
                    } 
                }
                
        }
      })
}

function modificarEmpresa() {
    const frm = document.getElementById('frmEmpresa');

    const url = base_url + "Administracion/modificar";
    const http = new XMLHttpRequest();
    http.open("POST", url, true); //ejecutar de forma asincrona
    http.send(new FormData(frm));
    http.onreadystatechange = function(){//se ejecutara cada vez que cambia
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            if(res == 'ok'){
                //alert('Modificado');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Modificado exitosamente',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        } 
    }
}




