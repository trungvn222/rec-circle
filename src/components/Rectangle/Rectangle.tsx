import React, { useState, PointerEvent, useEffect, useRef } from "react";
import {
	IPosition,
	IShapeStyleProps,
	IRectangle,
	IShapeEventsProps,
} from "models/interfaces";
import "./style.scss";

export interface IRectangleProps
	extends IRectangle,
		IShapeStyleProps,
		IShapeEventsProps<IRectangle> {}

function Rectangle({
	width,
	height,
	x = 0,
	y = 0,
	style,
	onInit,
	onMove,
	onStart,
	onStop,
}: IRectangleProps) {
	const [position, setPosition] = useState<IPosition>({
		x,
		y,
		offset: {
			x: 0,
			y: 0,
		},
	});
	const [active, setActive] = useState<boolean>(false);
	const element = useRef<SVGRectElement>(null);

	useEffect(() => {
		if (element.current && !!onInit) {
			onInit({
				x: position.x,
				y: position.y,
				width,
				height,
			});
		}
	}, [element, onInit, position.x, position.y, width, height]);

	const handlePointerDown = (e: PointerEvent<SVGRectElement>) => {
		const el: SVGRectElement = e.target as SVGRectElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;
		el.setPointerCapture(e.pointerId);

		if (!!onStart) {
			onStart({
				x: position.x,
				y: position.y,
				width,
				height,
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

	const handlePointerMove = (e: PointerEvent<SVGRectElement>) => {
		const el: SVGRectElement = e.target as SVGRectElement;
		const bbox = el.getBoundingClientRect();
		let x = e.clientX - bbox.left;
		let y = e.clientY - bbox.top;

		x = position.x - (position.offset.x - x);
		y = position.y - (position.offset.y - y);
		if (active) {
			if (!!onMove) {
				onMove({
					x,
					y,
					width,
					height,
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
				width,
				height,
			});
		}
		setPosition({
			...position,
		});
		setActive(false);
	};

	return (
		<rect
			ref={element}
			className="rectangle"
			x={position.x}
			y={position.y}
			width={width}
			height={height}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			style={style}
		/>
	);
}

export default Rectangle;
