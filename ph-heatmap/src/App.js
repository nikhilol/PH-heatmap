import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Square from "./Square";
import {Button, Popover, Dialog, TextField} from '@mui/material'
import ClickAwayListener from "@mui/core/ClickAwayListener";
const axios = require('axios').default

const multiplier = 1.5
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function App() {
	const [daysOfYear, setDaysOfYear] = useState([]);
	const [active, setActive] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false)
	const [emailValue, setEmailValue] = useState(null)

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
  
  function submit(){
		if(emailValue.length){
			axios.post('https://us-central1-ph-365.cloudfunctions.net/api/interest?email=' + emailValue).then(res=>{
				if(res.status===200){
					setDialogOpen(false)
				}
			})
		} else {alert('Please enter something into the box!')}
	}

	return (
    <div className="App" style={{display:'flex', width:'100vw', height:'100vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
		<div>
			<img width='75px' src='/PHLogo.png'></img>
			<a href='https://twitter.com/Niikhiil_P'><img width='75px' src='/me.jpg' style={{borderRadius:'50%', marginLeft:'-3vh'}}></img></a>
		</div>
		<h1 style={{borderBottom:'1px solid #DA552F', color:'#DA552F', paddingBottom:'2vh'}}>My Product Hunt <span style={{color:'#1A202C', background:'#DA552F', borderRadius:'2px', padding:'2px 5px'}}>365</span></h1>
		<p style={{width:'40%', fontWeight:'600'}}>👋Hey! I'm Nikhil, welcome!</p>
		<p style={{width:'40%', fontWeight:'600'}}>💡 The idea for this project is to build a GitHub style heatmap of my favourite products every day for a year! I will also be posting every choice I make on <a href='https://twitter.com/Niikhiil_P'>Twitter</a>, so follow me over there for updates! 👽</p>
		<div style={{display:'flex', width:'100vw', justifyContent:'center', alignItems:'flex-start', height: 7*multiplier+'vw', marginTop:'10vh', zIndex:'5'}}>
			{daysOfYear.length === 365 ? (
				<>
				<ClickAwayListener onClickAway={()=>{setActive(null)}}>
					<div style={{position:'relative'}}>
						<div style={{position:'relative', height:7*multiplier+'vw', width: 53*multiplier + 'vw'}}>
							{daysOfYear.map((data, i) => {
								let day = new Date(daysOfYear[i].toString().split('00:00:00')[0]).getDay()
								let even = day%2
								let date = new Date(daysOfYear[i].toString().split('00:00:00')[0]).getDate()
								let month = new Date(daysOfYear[i].toString().split('00:00:00')[0]).getMonth()
								let offset = new Date(daysOfYear[0].toString().split('00:00:00')[0]).getDay()
								let index = i + offset
								return (
									<>
										{(i<7 && even) ? <div style={{position:'absolute', left:-0.65*multiplier + 'vw', top: day*multiplier + 'vw', transform:'translate(-100%, 0)', fontSize:'small'}}>{days[day]}</div> : null}
										{date===1 && <div style={{position:'absolute', left:Math.floor(index / 7) * multiplier + "vw", top: -1*multiplier + 'vw', transform:'translate(-25%, 0)', fontSize:'small'}}>{months[month]}</div>}
										<Square multiplier={multiplier} data={data} i={i} index={index} setActive={setActive}></Square>
									</>
								);
							})}
						</div>
					</div>
				</ClickAwayListener>
				</>
			)
			: <div>{}</div>
		}
		</div>
		<Popover open={active && daysOfYear[active]['url']} anchorEl={document.getElementById(`square${active}`)} sx={{backgroundColor:'green'}} style={{backgroundColor:'transparent', zIndex:20}}
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
			<div style={{border:'1px solid #1A202C', borderRadius:'2%', padding:'2vh', backgroundColor:'#333E56'}}>
				{daysOfYear[active] &&
					<iframe style={{backgroundColor:'white'}} width="500" height={window.innerHeight * 0.5} frameborder="0" title='t' src={daysOfYear[active]['url']}></iframe>
				}
			</div>
		</Popover>
		<div style={{position:'absolute', top:0, right:0, margin:'2vh'}}>
			<p style={{fontSize:'small'}}>Need help posting consistently?</p>
			<Button onClick={()=>{setDialogOpen(true)}} sx={{backgroundColor:'#DA552F', color:'white', fontFamily:'Montserrat', fontWeight:'bolder'}}>I want my own PH-365</Button>
		</div>
		<Dialog open={dialogOpen} onClose={()=>{setDialogOpen(false)}} PaperProps={{backgroundColor:'white !important'}}>
			<div style={{padding:'5vh', background:'white', display:'flex', flexDirection:'column', alignItems:'center'}}>
				<div>
					<img width='75px' src='/PHLogo.png'></img>
					<img width='75px' src='/me.jpg' style={{borderRadius:'50%', marginLeft:'-3vh'}}></img>
				</div>
				<h3 style={{textAlign:'center'}}>{"Hey! Thanks for your interest!"}</h3>
				<p style={{textAlign:'center'}}>{"I'm still looking to validate that people want to create these for themselves to help post more consistently online! Enter an email address, or just say hello to let me know you're interested!"}</p>
				<div style={{width:'60%'}}>
					<TextField fullWidth placeholder="Email" size='small' variant='outlined' onChange={(e)=>{setEmailValue(e.target.value)}}></TextField>
					<Button fullWidth onClick={submit} sx={{backgroundColor:'#DA552F', color:'white', fontFamily:'Montserrat', fontWeight:'bolder', marginTop:'1vh'}}>I'm interested!</Button>
				</div>
			</div>
		</Dialog>
    </div>
	);
}
export default App;
