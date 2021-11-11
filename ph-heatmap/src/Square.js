import React from 'react'
function Square(props) {
	return (
		<div
			className="DateSquare"
			id={'square'+props.i}
			style={{
				width: props.multiplier * 0.65 + "vw",
				height: props.multiplier * 0.65 + "vw",
				top: (props.index % 7) * props.multiplier + "vw",
				left: Math.floor(props.index / 7) * props.multiplier + "vw",
				backgroundImage: `url(${props.date.img ? props.date.img : ""})`,
				// border: "2px solid #333E56",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundColor: "#333E56",
			}}
			onClick={() => props.setActive(props.i)}
		></div>
	);
}
export default React.memo(Square);
