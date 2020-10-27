import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RootRoute from "./Route";
import "assets/styles/general.scss";

function App() {
	return (
		<div className="wrapper">
			<Suspense fallback={<div>loading</div>}>
				<BrowserRouter>
					<RootRoute />
				</BrowserRouter>
			</Suspense>
		</div>
	);
}

export default App;
