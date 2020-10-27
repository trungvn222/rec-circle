import React, { useState, PointerEvent, useRef, useEffect } from "react";
import {
	IPosition,
	IShapeStyleProps,
	ICircle,
	IShapeEventsProps,
} from "models/interfaces";
import "./style.scss";

export interface ICircleProps
	extends IShapeStyleProps,
		IShapeEventsProps<ICircle>,
		ICircle {}

function Circle({
	r,
	x = 0,
	y = 0,
	style,
	onInit,
	onMove,
	onStart,
	onStop,
}: ICircleProps) {
	const [position, setPosition] = useState<IPosition>({
		x: x,
		y: y,
		offset: { x: 0, y: 0 },
	});
	const [active, setActive] = useState<boolean>(false);

	const element = useRef<SVGCircleElement>(null);

	useEffect(() => {
		if (element.current && !!onInit) {
			onInit({
				x: position.x,
				y: position.y,
				r,
			});
		}
	}, [element, onInit, position.x, position.y, r]);

	const handlePointerDown = (e: PointerEvent<SVGCircleElement>) => {
		const el: SVGCircleElement = e.target as SVGCircleElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;
		el.setPointerCapture(e.pointerId);
		if (!!onStart) {
			onStart({
				x: position.x,
				y: position.y,
				r,
			});
		}

		setPosition({
			...position,
			offset: {
				x,
				y,
			},
		});
		setActive(true);
	};
	const handlePointerMove = (e: PointerEvent<SVGCircleElement>) => {
		const el: SVGCircleElement = e.target as SVGCircleElement;
		const bbox = el.getBoundingClientRect();
		let x = e.clientX - bbox.left;
		let y = e.clientY - bbox.top;
		x = position.x - (position.offset.x - x);
		y = position.y - (position.offset.y - y);

		if (active) {
			if (!!onMove) {
				onMove({
					x: x,
					y: y,
					r,
				});
			}
			setPosition({
				...position,
				x,
				y,
			});
		}
	};

	const handlePointerUp = () => {
		if (!!onStop) {
			onStop({
				x: position.x,
				y: position.y,
				r,
			});
		}
		setPosition({
			...position,
		});
		setActive(false);
	};

	return (
		<circle
			className="circle"
			ref={element}
			cx={position.x}
			cy={position.y}
			r={r}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerMove={handlePointerMove}
			style={style}
		/>
	);
}

export default Circle;
