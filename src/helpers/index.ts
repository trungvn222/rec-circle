import { ICircle, IRectangle } from "models/interfaces";
export function collisionCheckCircleRect(circle: ICircle, rect: IRectangle) {
	const rX1 = rect.x;
	const rY1 = rect.y;
	const rX2 = rX1 + rect.width;
	const rY2 = rY1 + rect.height;

	const xn = Math.max(rX1, Math.min(circle.x, rX2));
	const yn = Math.max(rY1, Math.min(circle.y, rY2));

	const dx = xn - circle.x;
	const dy = yn - circle.y;
	return dx * dx + dy * dy <= circle.r * circle.r;
}
