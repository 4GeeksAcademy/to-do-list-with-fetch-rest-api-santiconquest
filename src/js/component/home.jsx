import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue,setInputValue]=useState("")
	const [tareas,setTareas]=useState([])

	function pressEnter(e) {
		if (e.key=="Enter"){
			console.log("Oprimiste enter")
			setTareas(tareas.concat(inputValue))
			setInputValue("")
		}
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
									onKeyDown={pressEnter}
									/>
					</li>
					{tareas.map((elemento,index) => 
					<li className="d-flex justify-content-between">
						<div>{elemento}</div>
						<div><i 
							className="fas fa-times"
							onClick={()=>setTareas(tareas.filter((elemento,newIndex)=>index!=newIndex))}
						></i></div>
					</li>)}
					<span>{tareas.length} tareas</span>
				</ul>
			</div>
		</>
	)
}
	
	
export default Home;