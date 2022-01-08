import {useEffect, useRef, useState} from "react";
import axios from "axios";
import config from "../config.json";

const Popup = (props) => {


	useEffect(()=>{
		axios({
			method: 'get',
			url: `${config.baseUri}score/get_pos`,
			headers: {
				temp: "temp",
				game: props.args.from,
				score: props.args.score,
			}
		}).then(res => {
			setPos(res.data.pos)
		})
	},[])



	const [state, setState] = useState('unsaved')
	const [pos, setPos] = useState('counting...')
	const refInput = useRef()
	const save = () => {
		setState('saving')
		axios({
			method: 'POST',
			url: `${config.baseUri}score`,
			headers: {
				game: props.args.from,
				score: props.args.score,
				nick: refInput.current.value,
			}
		}).then(res => {
			setState('saved')
		})

	}



	return (
		<>
			<div className={'global-layer'}></div>
			<div className={'popup'}>
				<h1>Your score: {props.args.score}</h1>
				<h2> Your position in scoreboard is {pos}</h2>
				{state === "saved" ?
					<h1>Saved</h1> : null
				}
				{state === "saving" ?
					<h1>Saving...</h1> : null
				}
				{state === "unsaved" ?
					<>
						<label htmlFor={"nickname-input"}> Save result as
							<input max={20} type="text" id={"nickname-input"} placeholder={'Enter your nickname'}
								   ref={refInput}/>
						</label>
						<button className={'save-btn'} onClick={save}> Save Result</button>
					</> : null
				}
				}
				<div className={"controls"}>
					<div className={"back-btn"} onClick={props.args.exit}></div>
					<div className={'restart-btn'} onClick={props.args.restart}></div>
				</div>
			</div>
		</>
	)
}

export default Popup