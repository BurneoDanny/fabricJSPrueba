import React from 'react';
import TablaNutricional from '../TablaNutricional.jpg'

export default function Modal({ onClose }){
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <button className="absolute top-0 right-0 p-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Standar Format</h2>
                    <p className="text-gray-600">Un preview de como se veria la tabla</p>
                    {/*<img src={TablaNutricional} className="w-full h-auto"/>*/}
                </div>
                <div className="p-4 border border-gray-400 w-64">
                    <h2 className="font-bold text-lg">Nutrition Facts</h2>
                    <p>48 porciones por envase</p>
                    <p>Tamaño de porción: 1 galleta (26g)</p>
                    <div className="border-t border-gray-400 pt-2">
                        <span className="font-bold">110</span> 
                        <span>Calorías</span>
                    </div>
                </div>
            </div>
        </div>
        
        /*<div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <button className="absolute top-0 right-0 p-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
                    <p className="text-gray-600">This is a modal content.</p>
                </div>
            </div>
        </div>*/

    );
}