import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Square from "./Square";
import Popover from '@mui/material/Popover'
import ClickAwayListener from "@mui/core/ClickAwayListener";
const axios = require('axios').default

const multiplier = 1.5

function App() {
	const [daysOfYear, setDaysOfYear] = useState([]);
	const [active, setActive] = useState(null);

	useEffect(()=>{
		axios.get('https://us-central1-ph-365.cloudfunctions.net/api/dates').then(data=>data.data).then((data)=>dateConfig(data))
	},[])

  function dateConfig(data){
	var now = new Date();
	let temp=[]
	for (var d = new Date(2020, 7, 11); d <= now; d.setDate(d.getDate() + 1)) {
		temp.push(new Date(d))
	}
	temp = temp.slice(0).slice(-365)
	console.log(data)
    data.forEach(item=>{
		temp[temp.length - 1 - data.indexOf(item)] = item;
	})
	console.log(temp)
	setDaysOfYear([...temp])
	setDaysOfYear([...temp])
  }

	return (
			
    <div className="App" style={{display:'flex', width:'100vw', height:'100vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
		<div>
			<img width='75px' src='/PHLogo.png'></img>
			<img width='75px' src='/me.jpg' style={{borderRadius:'50%', marginLeft:'-3vh'}}></img>
		</div>
		<h1 style={{borderBottom:'1px solid #DA552F', color:'#DA552F', paddingBottom:'2vh'}}>My Product Hunt <span style={{color:'#1A202C', background:'#DA552F', borderRadius:'2px', padding:'2px 5px'}}>365</span></h1>
		<p style={{width:'40%', fontWeight:'600'}}>👋Hey! I'm Nikhil, welcome!</p>
		<p style={{width:'30%', fontWeight:'600'}}>💡 The idea for this project is to build a Github style heatmap of my favourite products every day for a year! I will also be posting every choice I make on <a href='https://twitter.com/Niikhiil_P'>Twitter</a>, so why not follow me there! 👽</p>
		<div style={{display:'flex', width:'100vw', justifyContent:'center', alignItems:'flex-start', height: 7*multiplier+'vw', marginTop:'10vh', zIndex:'5'}}>
			{daysOfYear.length === 365 && (
				<ClickAwayListener onClickAway={()=>{setActive(null)}}>
					<div style={{position:'relative', height:7*multiplier+'vw', width: 53*multiplier + 'vw'}}>
						{daysOfYear.map((data, i) => {
							let offset = new Date(daysOfYear[0].toString().split('00:00:00')[0]).getDay()
							let index = i + offset
							return (
								<Square multiplier={multiplier} data={data} i={i} index={index} setActive={setActive}></Square>
							);
						})}
					</div>
				</ClickAwayListener>
			)}
		</div>
		<Popover open={active && daysOfYear[active]['url']} anchorEl={document.getElementById(`square${active}`)} style={{backgroundColor:'transparent', zIndex:20}}
		  anchorOrigin={{
			vertical: 'top',
			horizontal: 'center',
		  }}
		  transformOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		  }}
		  PaperProps={{background:'blue'}}
		  >
			<div style={{border:'1px solid #e5e5e5', borderRadius:'2%'}}>
				{daysOfYear[active] &&
					<iframe width="500" height={window.innerHeight * 0.5} frameborder="0" style={{}} title='t' src={daysOfYear[active]['url']}></iframe>
				}
			</div>
		</Popover>
    </div>
	);
}
export default App;
