import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

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
    <div className="App" style={{display:'flex', width:'100vw', height:'100vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
		<h1 style={{}}>TEST PODUCT HUNT 365</h1>
		<div style={{display:'flex', justifyContent:'center', width:'100vw', alignItems:'center', height:'30vh'}}>
			{daysOfYear.length === 365 && (
				<div style={{position:'relative'}}>
					{daysOfYear.map((date, i) => {
            			let index = i + daysOfYear[0].getDay()
						return (<div className='DateSquare' style={{width: multiplier * 0.65 + 'vw', height:multiplier * 0.65 + 'vw', top:(index%7)*multiplier + 'vw', left:Math.floor(index/7)*multiplier + 'vw', backgroundImage:`url(${date.img ? date.img :  ''})`,  border:'2px solid #e5e5e5', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundColor:'#e2e2e2', transform:`translate(-${multiplier * 26.5 + 'vw'}, -${multiplier * 3.5 + 'vw'})` }} onMouseOver={()=>setActive(i)}></div>);
					})}
				</div>
			)}
		</div>
		<div style={{border:'1px solid #e5e5e5', borderRadius:'2%', margin:'0 0vh', height:'auto'}}>
			{daysOfYear[active] &&
				<iframe width="1000" height="600" frameborder="0" style={{}} title='t' src={daysOfYear[active]['url']}></iframe>
			}
		</div>
    </div>
	);
}
export default App;
