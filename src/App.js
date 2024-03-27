
import Navbar from './Navbar/Navbar'
import CanvasContainer from './CanvasContainer/CanvasContainer';
import Fiber3d from './Fiber3d/Fiber3d';

function App() {

  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main>
        <div className='flex flex-col'>
        <div>
        <CanvasContainer/>
        </div>
        <div>
        <Fiber3d/>
        </div>
        </div>
      </main>
    </div>
  );
}

export default App;
