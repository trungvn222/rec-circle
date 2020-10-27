import React from "react";
import { mount, shallow } from "enzyme";
import Rectangle from "components/Rectangle";
import { IRectangle } from "models/interfaces";

describe("Rectangle", () => {
	it("render without error", () => {
		const component = mount(
			<Rectangle x={0} y={0} width={200} height={200} />,
		);
		expect(component.find("rect")).toHaveLength(1);
	});

	it("x should be 200", () => {
		const component = mount(
			<Rectangle x={200} y={0} width={200} height={200} />,
		);
		expect(component.find("rect").props().x).toBe(200);
	});
	it("y should be 200", () => {
		const component = mount(
			<Rectangle x={200} y={200} width={200} height={200} />,
		);
		expect(component.find("rect").props().y).toBe(200);
	});
	it("width should be 200", () => {
		const component = mount(
			<Rectangle x={200} y={200} width={200} height={200} />,
		);
		expect(component.find("rect").props().width).toBe(200);
	});
	it("height should be 200", () => {
		const component = mount(
			<Rectangle x={200} y={200} width={200} height={200} />,
		);
		expect(component.find("rect").props().height).toBe(200);
	});

	it("onInit should be call one time when component mounted and emit data correct", (done) => {
		const handleInit = jest.fn((position: IRectangle) => {
			expect(position).toEqual({
				x: 200,
				y: 200,
				width: 200,
				height: 200,
			});
			done();
		});
		mount(
			<Rectangle
				x={200}
				y={200}
				width={200}
				height={200}
				onInit={handleInit}
			/>,
		);
		expect(handleInit.call.length).toBe(1);
	});
	it("onStart should be call one time when component mouse down", (done) => {
		const handleStart = jest.fn;
		const component = shallow(
			<Rectangle
				x={200}
				y={200}
				width={200}
				height={200}
				onStart={handleStart}
			/>,
		);
		const e = {
			clientX: 100,
			clientY: 100,
			target: {
				getBoundingClientRect() {
					return {
						left: 100,
						top: 100,
					};
				},
				setPointerCapture: jest.fn(() => {
					done();
				}),
			},
		};
		component.simulate("pointerdown", e);
		expect(handleStart.call.length).toBe(1);
	});
	it("onMove should be call 1 time when mouse move", (done) => {
		const handleMove = jest.fn(() => {
			done();
		});
		const component = mount(
			<Rectangle
				x={200}
				y={200}
				width={200}
				height={200}
				onMove={handleMove}
			/>,
		);
		const e = {
			clientX: 100,
			clientY: 100,
			target: {
				getBoundingClientRect() {
					return {
						left: 100,
						top: 100,
					};
				},
				setPointerCapture: jest.fn(() => {
					done();
				}),
			},
		};

		component.simulate("pointerdown", e);
		component.simulate("pointermove", e);
		expect(handleMove.call.length).toBe(1);
	});
	it("onStop should be call 1 time when mouse up", (done) => {
		const handleStop = jest.fn(() => {
			done();
		});
		const component = mount(
			<Rectangle
				x={200}
				y={200}
				width={200}
				height={200}
				onStop={handleStop}
			/>,
		);

		component.simulate("pointerup");
		expect(handleStop.call.length).toBe(1);
	});
});
