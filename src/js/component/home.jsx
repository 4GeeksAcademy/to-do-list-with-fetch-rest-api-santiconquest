import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue,setInputValue]=useState("")
	const [tareas,setTareas]=useState([])

	useEffect(()=>{
		getTask()
	},[])

	function getTask() {
		console.log("Presionaaste el boton Get Task")
		fetch("https://playground.4geeks.com/todo/users/Lebron")
		.then((response)=>response.json())
		//Se me actualice el estado cada vez que se presiona Get
		.then((data)=>setTareas(data.todos))
		
	}

	function addTask() {
		console.log("Presionaaste el boton Add Task")
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				{
					"label": inputValue,
					"is_done": false
				})
		};
		fetch('https://playground.4geeks.com/todo/todos/Lebron', requestOptions)
			.then(response => response.json())
			.then(data => getTask(),setInputValue([]));
	}

	function deleteTask(id) {
		console.log("Presionaaste el boton Delete Task",id)
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify()
		};
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,
			requestOptions
		)
		.then((response) => {
			if(response.ok){
				getTask(setTareas)
			}
	})
		.then((result) => console.log(result))
	}

	return(
		<>
			<div>
				<h1>Lista de tareas</h1>
				<ul>
					<li> 
								<input 
									type="text" 
									placeholder="Ingrese tarea a realizar"
									onChange={(e)=>setInputValue(e.target.value)}
									value={inputValue}
									
									/>
					</li>
					{tareas.map((elemento,index) => 
					<li className="d-flex justify-content-between" key={elemento.id}>
						{/* //elemento me devuelve un objeto, por eso le pongo el label para que me traiga el valor de la tarea */}
						<div>{elemento.label}</div>
						<div><i 
							className="fas fa-times"
							onClick={()=>deleteTask(elemento.id)}
						></i></div>
					</li>)}
					<span>{tareas.length} tareas</span>
				</ul>

				{/* <button onClick={getTask}>Ver tareas</button> */}
				<button onClick={addTask}>Agregar tarea</button>
				{/* <button onClick={deleteTask}>Eliminar tarea</button> */}

					
			</div>
		</>
	)
}
	
	
export default Home;