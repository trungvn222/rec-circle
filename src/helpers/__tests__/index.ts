import { collisionCheckCircleRect } from "../index";
import { ICircle, IRectangle } from "models/interfaces";

describe("collisionCheckCircleRect", () => {
	it("Circle should inside Rect", () => {
		const circle: ICircle = {
			x: 30,
			y: 30,
			r: 30,
		};
		const rec: IRectangle = {
			x: 0,
			y: 0,
			width: 200,
			height: 200,
		};

		const result = collisionCheckCircleRect(circle, rec);
		expect(result).toBe(true);
	});
	it("Circle should outside Rect", () => {
		const circle: ICircle = {
			x: 250,
			y: 250,
			r: 30,
		};
		const rec: IRectangle = {
			x: 0,
			y: 0,
			width: 200,
			height: 200,
		};

		const result = collisionCheckCircleRect(circle, rec);
		expect(result).toBe(false);
	});

	it("Circle touche Rectangle follow x axis", () => {
		const circle: ICircle = {
			x: 230,
			y: 200,
			r: 30,
		};
		const rec: IRectangle = {
			x: 0,
			y: 0,
			width: 200,
			height: 200,
		};

		const result = collisionCheckCircleRect(circle, rec);
		expect(result).toBe(true);
	});

	it("Circle touche Rectangle follow y axis", () => {
		const circle: ICircle = {
			x: 100,
			y: 230,
			r: 30,
		};
		const rec: IRectangle = {
			x: 0,
			y: 0,
			width: 200,
			height: 200,
		};

		const result = collisionCheckCircleRect(circle, rec);
		expect(result).toBe(true);
	});
});
