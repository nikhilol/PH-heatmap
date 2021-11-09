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
		for (var d = new Date(2021, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
      temp.push(new Date(d))
		}
    setDaysOfYear(temp);
  }

	return (
    <>
		<div className="App" style={{display:'flex', justifyContent:'center', width:'100vw'}}>
			{daysOfYear.length > 300 && (
				<div style={{width:'80%', marginBottom:'50vh'}}>
					{daysOfYear.map((date, i) => {
            let index = i + daysOfYear[0].getDay()
						return <div style={{width:'15px', height:'15px', background:'#eeffee', borderRadius:'25%', margin:'4px', position:'absolute', top:(index%7)*19, left:Math.floor(index/7)*19}}></div>;
					})}
				</div>
			)}
		</div>
    </>
	);
}
export default App;
