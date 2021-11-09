import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [daysOfYear, setDaysOfYear] = useState([]);

	useEffect(() => {
    dateConfig()
	}, []);

  function dateConfig(){
		var now = new Date();
    let temp=[]
		for (var d = new Date(2020, 7, 11); d <= now; d.setDate(d.getDate() + 1)) {
      temp.push(new Date(d))
		}
    setDaysOfYear(temp.slice(0).slice(-365));
  }

	return (
    <>
		<div className="App" style={{display:'flex', justifyContent:'center', width:'100vw', alignItems:'center', height:'100vh'}}>
			{daysOfYear.length == 365 && (
				<div style={{width:'80%', marginBottom:'50vh', position:'relative'}}>
					{daysOfYear.map((date, i) => {
            let index = i + daysOfYear[0].getDay()
						return <div className='DateSquare' style={{top:(index%7)*19, left:Math.floor(index/7)*19, background: `rgba(246, 73, 0, ${Math.random()*0.7 +0.1})` }}></div>;
					})}
				</div>
			)}
		</div>
    </>
	);
}
export default App;
