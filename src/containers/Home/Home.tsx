import React, { useState, useEffect, useCallback } from "react";
import Circle from "components/Circle";
import Rectangle from "components/Rectangle";
import { ICircle, IRectangle } from "models/interfaces";
import { collisionCheckCircleRect } from "helpers";
import "./style.scss";

function Home() {
	const [circleOutSide, setCircleOutSide] = useState(false);
	const [recPosition, setRecPosition] = useState<IRectangle>({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});
	const [circlePosition, setCirclePosition] = useState<ICircle>({
		x: 0,
		y: 0,
		r: 0,
	});

	useEffect(() => {
		if (collisionCheckCircleRect(circlePosition, recPosition)) {
			setCircleOutSide(true);
		} else {
			setCircleOutSide(false);
		}
	}, [recPosition, circlePosition]);

	const handleRect = useCallback((position: IRectangle) => {
		setRecPosition(position);
	}, []);

	const handleCircle = useCallback((position: ICircle) => {
		setCirclePosition(position);
	}, []);
	return (
		<svg
			style={{
				background: "#ffffff",
			}}
			width="100%"
			height="100%">
			<Rectangle
				x={0}
				y={0}
				width={300}
				height={300}
				onInit={handleRect}
				onStart={handleRect}
				onMove={handleRect}
				onStop={handleRect}
			/>
			<Circle
				x={30}
				y={30}
				r={30}
				onInit={handleCircle}
				onStart={handleCircle}
				onMove={handleCircle}
				onStop={handleCircle}
				style={{
					fill: circleOutSide ? "red" : "green",
				}}
			/>
		</svg>
	);
}

export default Home;
