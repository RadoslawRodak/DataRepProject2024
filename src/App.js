import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Content from './components/Content';
import AddRecipe from './components/AddRecipe';
import DeleteRecipe from './components/DeleteRecipe';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<Content/>} />
        <Route path="/read" element={<AddRecipe/>} />
        <Route path="/create" element={<DeleteRecipe/>} />
      </Routes>
    </Router>
  );
}

export default App;