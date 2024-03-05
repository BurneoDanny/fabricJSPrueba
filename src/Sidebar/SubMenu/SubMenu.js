import InitialInfo from "./InitialInfo/InitialInfo";
import TextSM from "./TextSM/TextSM";


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

            {props.name === "texto" &&
                   <TextSM canvas = {props.canvas}/>
            }
        </section>


    );
}
