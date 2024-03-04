

export default function SideItem(props) {
    return (
        <a
            className="flex flex-col w-20 h-15 items-center justify-center space-y-1
                text-black dark:text-gray-300 p-2
                transition-colors duration-300 transform rounded-lg
                hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 
                hover:text-gray-700"
            href="#"
            onClick={() => props.toogle()}>
            <div className=' w-5 h-5 xl:w-8 xl:h-8'>
                {props.svg}
            </div>
            {props.name && <span className="hidden xl:block mx-2 text-xs font-medium text-center">{props.name}</span>}
        </a>
    );
}
