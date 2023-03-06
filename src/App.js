import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FamilyList from "./pages/FamilyList";
import Insert from "./pages/Insert";

function App() {
	
	return (
		<div>
		<Router>
			<Routes>
				<Route exact path="/" element={<FamilyList />} />
				<Route path="/insert" element={<Insert />} />
			</Routes>
		</Router>
		</div>
	);
}
 
export default App;