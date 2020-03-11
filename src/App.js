import React,{useState,useEffect, Fragment } from 'react';


function Cita({cita,index,eliminarCita}){
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
      <button
      onClick={()=>eliminarCita(index)}
      type="button" className="button eliminar u-full-width"
      >ELIMINAR X</button>
    </div>
  )
}



function Formulario({crearCita}){
  const stateInicial=({
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''
  })

  const [cita,actualizarCita] = useState(stateInicial);

  //actualizar
  const handleChange = (e)=>{
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  //enviar cita 
  const handleSubmit = (e)=>{
   e.preventDefault();

   //pasar la cita hacia el componente principal 
   crearCita(cita);

   //reiniciar el state
  //  actualizarCita(
  //   {
  //     mascota:'',
  //     propietario:'',
  //     fecha:'',
  //     hora:'',
  //     sintomas:''
  //   }
  //  )
  actualizarCita(stateInicial);
     
  }

 
  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form 
      onSubmit={handleSubmit}
      >
                  <label>Nombre Mascota</label>
                  <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width" 
                    placeholder="Nombre Mascota" 
                    onChange={handleChange}
                    value={cita.mascota}
                  />

                  <label>Nombre Dueño</label>
                  <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"  
                    placeholder="Nombre Dueño de la Mascota" 
                    onChange={handleChange}
                    value={cita.propietario}
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={handleChange}
                    value={cita.fecha}
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={handleChange}
                    value={cita.hora}
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={cita.sintomas}
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment> 
  )
}

function App(){


//cargar las citas de localstorage como state inicial
let citasIniciales= JSON.parse(localStorage.getItem('citas'))
if (!citasIniciales) {
 citasIniciales= []
}//al pasar por este ciclo pasa a ser STATE INICIAL


const [citas,guardarCita] = useState(citasIniciales);

//Agregar citas desde el formulario
const crearCita = citaCliente =>{
//tomar una copia del sate y agregarla al nuevo clinete
  const nuevasCita = [...citas,citaCliente];
//almacenamos en el state
  guardarCita(nuevasCita);

} 

const eliminarCita = index =>{
  const copiaparaEliminar=[...citas]
  copiaparaEliminar.splice(index,1);
  guardarCita(copiaparaEliminar);
}



useEffect(()=>{
   
    let citasIniciales= JSON.parse(localStorage.getItem('citas'))
    if (citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas]
)

   
//cargar Condicionalmente un titulo
const titulo = Object.keys(citas).length === 0 ?<h2>No hay Citas</h2>: <h2>Administrar las citas</h2> 
//object.keys te retorna las
return(
<Fragment>
<h1>Administrador de Paciente</h1>
  <div className="container">
    <div className="row">
      <div className="one-half column">
        <Formulario
        crearCita = {crearCita}
        />
      </div>
      <div className="one-half column">
      {titulo}
      {citas.map((cita,index)=>(
        <Cita 
        key={index}
        index={index}
        cita={cita}
        eliminarCita={eliminarCita}
        />
      ))}

      </div>
    </div>
  </div>
  
</Fragment>
)
}
export default App;