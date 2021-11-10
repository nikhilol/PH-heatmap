import React from 'react'
function Square(props) {
	return (
		<div
			className="DateSquare"
			style={{
				width: props.multiplier * 0.65 + "vw",
				height: props.multiplier * 0.65 + "vw",
				top: (props.index % 7) * props.multiplier + "vw",
				left: Math.floor(props.index / 7) * props.multiplier + "vw",
				backgroundImage: `url(${props.date.img ? props.date.img : ""})`,
				border: "2px solid #e5e5e5",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundColor: "#e2e2e2",
			}}
			onMouseOver={() => props.setActive(props.i)}
		></div>
	);
}
export default React.memo(Square);
