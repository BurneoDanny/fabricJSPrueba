import { useEffect, useState } from 'react';

import { ReactComponent as QuestionMarkSVG } from '../icons/question-solid.svg';


import SideItem from './sideItem/sideItem'
import SubMenu from './SubMenu/SubMenu';


export default function SideBar(props) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [menuName, setMenuName] = useState("");

  const toggleSubMenu = (name) => {
    setSubMenuOpen((prev) => (prev && menuName === name) ? false : true);
    setMenuName(name);
  };

  useEffect(() => {
    localStorage.setItem('isSubMenuOpen', JSON.stringify(isSubMenuOpen));
  }, [isSubMenuOpen]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      props.onImageUpload(url);
    }
  };

  return (
    <aside className='bg-white z-50 animate-fade-in flex flex-col-reverse fixed w-[300px]
    top-[calc(100vh-1.5rem)] -translate-y-full left-2/4 -translate-x-2/4 p-2.5  justify-around gap-4 
    shrink-0 grow-0 border rounded-2xl border-gray-200 shadow-lg
    dark:border-slate-600/60 dark:bg-slate-800/5
    sm:w-[400px] md:w-[500px] lg:w-[700px]
    xl:flex-row xl:h-[700px] xl:max-h-[calc(100%-1.5rem)] xl:w-fit xl:top-2/4 xl:mb-0 xl:-translate-y-2/4 xl:left-6 xl:-translate-x-0'>
      <nav className="overflow-auto flex flex-1 space-x-5 xl:space-x-0 justify-normal md:justify-around 
      xl:flex-col xl:justify-start xl:space-y-4 xl:gap-4">
        <SideItem name="Esencial" svg={<QuestionMarkSVG />} toogle={() => toggleSubMenu("initialInfo")} />
        <SideItem name="Demas" svg={<QuestionMarkSVG />} toogle={() => toggleSubMenu("demas")} />
        <div className="hidden md:block xl:hidden border-r-2 mx-2 "></div>
        <hr className="hidden xl:block border-2 mt-10 mx-2" />
        <SideItem name="mobile testing" svg={<QuestionMarkSVG />} toogle={() => toggleSubMenu("texto1")} />
        <input
          type="file"
          id="imageUploadInput"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          className="flex flex-col w-20 h-15 items-center justify-center space-y-1
                text-black dark:text-gray-300 p-2
                transition-colors duration-300 transform rounded-lg
                hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 
                hover:text-gray-700"
          onClick={props.generateDownload}>
          <div className=' w-5 h-5 xl:w-8 xl:h-8'>
            <QuestionMarkSVG />
          </div>
          <span className="hidden xl:block mx-2 text-xs font-medium text-center">Exportar</span>
        </button>
      </nav>
      <SubMenu flag={isSubMenuOpen} name={menuName} />
    </aside>


  );
}
