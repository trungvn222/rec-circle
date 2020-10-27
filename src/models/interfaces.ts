export interface IOffset {
	x: number;
	y: number;
}

export interface IPosition {
	x: number;
	y: number;
	offset: IOffset;
}

export interface ICircle {
	x: number;
	y: number;
	r: number;
}

export interface IRectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface IShapeEventsProps<T> {
	onInit?: (position: T) => void;
	onMove?: (position: T) => void;
	onStart?: (position: T) => void;
	onStop?: (position: T) => void;
}

export interface IShapeStyleProps {
	style?: object;
}
