import { useState } from 'react';
import TablePreview from './TablePreview/TablePreview';
import TablaNutricional from '../../../img/tablaEjemplo.jpg'

export default function NutritionF(props) {

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div id='tablasNutricionales' className='flex flex-col'>
      <button id='dropdown-button' className='text-left' onClick={toggleMenu}>Tabla Nutricional</button>
      {menuVisible && (
        <div id="menu" className='flex flex-col justify-start'>
          <button className="px-4 py-2 mr-4 text-black rounded hover:bg-blue-600" onClick={toggleModal}>Standar Format</button>
          <button className="px-4 py-2 mr-4 text-black rounded hover:bg-blue-600" onClick={toggleModal}>Tabular Format</button>
          <button className="px-4 py-2 mr-4 text-black rounded hover:bg-blue-600" onClick={toggleModal}>Linear Format</button>
        </div>
      )}
      {modalVisible && <TablePreview onClose={toggleModal} img={TablaNutricional} canvas={props.canvas}/> }

    </div>
  );
}


