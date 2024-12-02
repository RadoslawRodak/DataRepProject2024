import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Content from './components/Content';
import AddRecipe from './components/Read';
import DeleteRecipe from './components/Create';
import Edit from './components/edit';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<Content/>} />
        <Route path="/read" element={<AddRecipe/>} />
        <Route path="/create" element={<DeleteRecipe/>} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;