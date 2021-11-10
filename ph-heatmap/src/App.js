import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Square from "./Square";

const dummy_data = [
{img:'https://ph-files.imgix.net/c6d53ac5-426b-45fa-aada-b291819e61a0.gif', url:'https://cards.producthunt.com/cards/posts/318000?v=1', date:'30/10/2021'},
{img:'https://ph-files.imgix.net/e3b5cb7b-1ac3-4a63-ad0f-c91167f90f21.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'31/10/2021'},
{img:'https://ph-files.imgix.net/82baa912-dc90-4044-97a7-e1760cb66756.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'01/11/2021'},
{img:'https://ph-files.imgix.net/96a2d8e2-b4a8-4afc-a2ab-8c97bc78e8ab.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'02/11/2021'},
{img:'https://ph-files.imgix.net/148e8922-73b6-4100-a9ba-c1b1facc3f75.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'03/11/2021'},
{img:'https://ph-files.imgix.net/bb462aff-b7f9-457f-88e8-7d7a386f33b6.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'04/11/2021'},
{img:'https://ph-files.imgix.net/9cbbd73e-edd0-4ad8-a063-03778da962c6.png', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'05/11/2021'},
{img:'https://ph-files.imgix.net/7bdd73ed-45c5-4232-9e47-1ad393cf061a.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'06/11/2021'},
{img:'https://ph-files.imgix.net/361125be-2b20-4c88-8e11-4ba0fdebb5fb.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'07/11/2021'},
{img:'', url:''},
{img:'https://ph-files.imgix.net/6488fb81-885f-409a-9652-c9e2d7834d38.gif', url:'https://cards.producthunt.com/cards/posts/319000?v=1', date:'09/11/2021'},
]

const multiplier = 1.5

function App() {
	const [daysOfYear, setDaysOfYear] = useState([]);
	const [active, setActive] = useState(362);

	useEffect(() => {
    dateConfig()
	}, []);

  function dateConfig(){
	var now = new Date();
	let temp=[]
	for (var d = new Date(2020, 7, 11); d <= now; d.setDate(d.getDate() + 1)) {
		temp.push(new Date(d))
	}
	temp = temp.slice(0).slice(-365)
    dummy_data.forEach(item=>{
		temp[temp.length - 1 - dummy_data.indexOf(item)] = item;
	})
	setDaysOfYear(temp)
  }

	return (
    <div className="App" style={{display:'flex', width:'100vw', height:'auto', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
		<div>
			<img width='75px' src='/PHLogo.png'></img>
			<img width='75px' src='/me.jpg' style={{borderRadius:'50%', marginLeft:'-3vh'}}></img>
		</div>
		<h1 style={{borderBottom:'1px solid #e5e5e5', color:'#DA552F', padding:'2vh'}}>My Product Hunt <span style={{color:'white', background:'#DA552F', borderRadius:'2px', padding:'2px 5px'}}>365</span></h1>
		<p style={{width:'40%', fontWeight:'bold'}}>👋Hey! I'm Nikhil, welcome!</p>
		<p style={{width:'40%', fontWeight:'bold'}}>The idea for this project is to build a Github style heatmap of my favourite products every day for a year! I will also be posting every choice I make on <a href='https://twitter.com/Niikhiil_P'>Twitter</a>, so follow me there!</p>
		<div style={{display:'flex', width:'100vw', justifyContent:'center', alignItems:'flex-start', height: 7*multiplier+'vw'}}>
			<div>
			{daysOfYear.length === 365 && (
				<div style={{position:'relative', height:4.55*multiplier+'vw', width: 53*multiplier + 'vw'}}>
					{daysOfYear.map((date, i) => {
            			let index = i + daysOfYear[0].getDay()
						return (<Square multiplier={multiplier} date={date} i={i} index={index} setActive={setActive}></Square>);
					})}
				</div>
			)}
			</div>
		</div>
		<div style={{border:'1px solid #e5e5e5', borderRadius:'2%'}}>
			{daysOfYear[active] &&
				<iframe width="1000" height={window.innerHeight * 0.5} frameborder="0" style={{}} title='t' src={daysOfYear[active]['url']}></iframe>
			}
		</div>
    </div>
	);
}
export default App;
