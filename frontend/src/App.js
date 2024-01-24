
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Route,Routes,Router } from 'react-router-dom';
import Chat from './Pages/chat';
import Home from './Pages/home';
function App() {
  return (
    <div className="App">
      <Routes>
   <Route path='/' Component={Home} exact/>
   <Route path='/chats' Component={Chat} exact/>
   </Routes>
    </div>
  );
}

export default App;
