import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';

import styles from './styles.js';


export default function App() {
  return (

    <div className="bg-black1 w-full overflow-hidden">
      
      <div className={`my-5 w-full`}>
        <NavBar/>
      </div>

      <div className={`flex ${styles.marginX} ${styles.marginY}`}>
        <Routes>
            
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        
        </Routes>
      </div>

      <div className={`my-5  w-full`}>
        <Footer/>
      </div>
      
      
    </div>


    

  )
}
