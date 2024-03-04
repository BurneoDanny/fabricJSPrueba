import InitialInfo from "./InitialInfo/InitialInfo";


export default function SubMenu(props) {
    return (
        //animate-slide-in-left 
        <section className={`h-[150px] overflow-auto w-full
        xl:w-[250px] xl:h-auto xl:py-6 xl:overflow-y-auto
         dark:bg-gray-900 dark:border-gray-700 ${props.flag ? 'visible' : 'hidden'}`}>

            {props.name === "initialInfo" &&
                <>
                    <h2 className="px-2 text-sm xl:text-base font-semibold text-center text-gray-800 dark:text-white">Información Esencial</h2>
                    <div className="mt-2 xl:mt-8 space-y-4">
                        <InitialInfo/>
                    </div>
                </>
            }

            {props.name === "demas" &&
                <>
                    <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Demas</h2>
                    <div className="mt-6 space-y-4">
                        <p>Lorem Ipsum
                            "Neque porro quisquamn a suscipit a, lobortis id enim. Interdum et malesuad
                            a fames ac ante ipsum primis in faucibus. Mauris suscipit odio at efficitu
                            r posuere. Praesent sodales nec odio sed facilisis. Suspendisse potenti. Ut 
                            pulvinar fermentum metus, ac faucibus erat iaculis sit amet. Nam placerat maxi
                            mus sem quis mattis. Vestibulum vitae lobortis dolor.</p>

                    </div>
                </>
            }

            {props.name === "texto1" &&
                <div className="flex flex-row h-full overflow-x-auto xl:block">
                    <h2 className="px-5 text-sm font-medium text-center text-gray-800 dark:text-white">Demas</h2>
                    <div className="mt-8 space-x-4">
                        <p className="whitespace-nowrap">Lorem Ipsum
                            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                            adipisci velit..."
                            usto magna,"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                            adipisci velit..."
                            usto magna, </p>

                    </div>
                </div>
            }
            
            {props.name === "Exportar" &&
                <div className="flex flex-row h-full overflow-x-auto">
                    <div>
                     <button
                      className="flex flex-col w-20 h-15 items-center justify-center space-y-1
                       text-black dark:text-gray-300 p-2
                       transition-colors duration-300 transform rounded-lg
                       hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 
                       hover:text-gray-700"
                       onClick={props.generateDownload}>  
                      <div className=' w-5 h-5 xl:w-8 xl:h-8'>
                      {props.svg}
                     </div> 
                      <span className="hidden xl:block mx-2 text-xs font-medium text-center">PNG</span>
                       </button>
                    </div>

                    <div>
                    <button
                      className="flex flex-col w-20 h-15 items-center justify-center space-y-1
                       text-black dark:text-gray-300 p-2
                       transition-colors duration-300 transform rounded-lg
                       hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 
                       hover:text-gray-700"
                       onClick={props.generatePDF}>  
                      <div className=' w-5 h-5 xl:w-8 xl:h-8'>
                      {props.svg}
                     </div> 
                      <span className="hidden xl:block mx-2 text-xs font-medium text-center">PDF</span>
                       </button>
                    </div>
                    
                </div>
            }
        </section>


    );
}
