import Header from "../header/Header";
import Works from "../works/Works";
import AddWork from "../addWork/AddWork";
import Work from "../work/Work";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = ()=> {
  return (
    <>
			<Router>
        <Header/>
				<Routes>
					<Route path="/" element={<Works />} />
          <Route path="/add-work" element={<AddWork />} />
          <Route path="/update-work/:id" element={<AddWork />} />
				</Routes>
			</Router>
		</>
  );
} 

export default App;
