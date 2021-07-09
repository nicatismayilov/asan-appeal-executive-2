import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store, persistor } from "store";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate persistor={persistor}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</PersistGate>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
