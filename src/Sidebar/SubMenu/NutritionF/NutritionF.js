import { useState } from 'react';
import Modal from "./Modal/Modal"

export default function NutritionF(props) {

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
      setModalVisible(false);
  };

  return (
    <div id='tablasNutricionales'className='flex flex-col'>
        <button id='dropdown-button' className='text-left' onClick={toggleMenu}>Tabla Nutricional</button>
        {menuVisible && (
          <div id= "menu" className='flex flex-col justify-start'> 
            <button className="px-4 py-2 mr-4 text-black rounded hover:bg-blue-600" onClick={openModal}>Standar Format</button>
            <button className="px-4 py-2 mr-4 text-black rounded hover:bg-blue-600" onClick={openModal}>Tabular Format</button>
            <button className="px-4 py-2 mr-4 text-black rounded hover:bg-blue-600" onClick={openModal}>Linear Format</button>
          </div>
        )}
        {modalVisible && <Modal onClose={closeModal} />}
        
    </div>
  );
}


