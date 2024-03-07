import React from 'react';
import { fabric } from 'fabric';
import './TablePreview.css'
import { toPng } from "html-to-image";
import { toSvg } from 'html-to-image';
import { useRef } from 'react';

export default function TablePreview(props) {

    const elementRef = useRef(null);

    // const addTableNutricional = () => {
    //     // Aquí debes crear un objeto de imagen fabric usando la URL de la imagen
    //     let tableNutricionalImage = new fabric.Image.fromURL(props.img, (img) => {
    //         img.set({

    //             width: 300,
    //             // Otras propiedades de estilo y diseño aquí
    //         });

    //         // Agregar la imagen al canvas y establecerla como objeto activo
    //         props.canvas.add(img).setActiveObject(img);
    //     });
    // };

    function filter (node) {
        return (node.tagName !== 'i');
      }

    const addTableNutricional = () => {
        //var rect = new fabric.Rect({ fill: "red", width: 100, height: 100 });
       // props.canvas.add(rect)
        toSvg(elementRef.current, { filter: filter })
          .then((dataUrl) => {
            console.log(dataUrl);
            fabric.Image.fromURL(dataUrl,function(img){
                props.canvas.add(img).setActiveObject(img)
                props.canvas.centerObject(img)
                console.log('entra')
            });
          })
          .catch((err) => {
            console.log(err);
          });
    };
    

    return (
        <div className="absolute w-[400px] h-full bg-white  z-50 
        flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none 
        focus:outline-none border border-gray-600">
            <button className="absolute top-0 right-0 p-3 text-gray-500 hover:text-gray-700" onClick={props.onClose}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div className='flex flex-col gap-y-3 items-center justify-center'  >
                <h1>Este es un ejemplo de como va a quedar la tabla nutricional de tu producto</h1>

            <div ref={elementRef}>
                <section id="tabla" className="performance-facts" >
                    <header className="performance-facts__header">
                        <h1 className="performance-facts__title">Nutrition Facts</h1>
                        <p>Serving Size 1/2 cup (about 82g)</p>
                        <p>Serving Per Container 8</p>
                    </header>

                    <table className="performance-facts__table">
                        <thead>
                            <tr>
                                <th colSpan="3" className="small-info">
                                    Amount Per Serving
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan="2">
                                    <b>Calories</b>
                                    200
                                </th>
                                <td>
                                    Calories from Fat
                                    130
                                </td>
                            </tr>
                            <tr className="thick-row">
                                <td colSpan="3" className="small-info">
                                    <b>% Daily Value*</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Total Fat</b>
                                    14g
                                </th>
                                <td>
                                    <b>22%</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>
                                    Saturated Fat
                                    9g
                                </th>
                                <td>
                                    <b>22%</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>
                                    Trans Fat
                                    0g
                                </th>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Cholesterol</b>
                                    55mg
                                </th>
                                <td>
                                    <b>18%</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Sodium</b>
                                    40mg
                                </th>
                                <td>
                                    <b>2%</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Total Carbohydrate</b>
                                    17g
                                </th>
                                <td>
                                    <b>6%</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>
                                    Dietary Fiber
                                    1g
                                </th>
                                <td>
                                    <b>4%</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>
                                    Sugars
                                    14g
                                </th>
                                <td>
                                </td>
                            </tr>
                            <tr className="thick-end">
                                <th colSpan="2">
                                    <b>Protein</b>
                                    3g
                                </th>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="performance-facts__table--grid">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    Vitamin A
                                    10%
                                </td>
                                <td>
                                    Vitamin C
                                    0%
                                </td>
                            </tr>
                            <tr className="thin-end">
                                <td colSpan="2">
                                    Calcium
                                    10%
                                </td>
                                <td>
                                    Iron
                                    6%
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>

                    <table className="performance-facts__table--small small-info">
                        <thead>
                            <tr>
                                <td colSpan="2"></td>
                                <th>Calories:</th>
                                <th>2,000</th>
                                <th>2,500</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan="2">Total Fat</th>
                                <td>Less than</td>
                                <td>65g</td>
                                <td>80g</td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>Saturated Fat</th>
                                <td>Less than</td>
                                <td>20g</td>
                                <td>25g</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Cholesterol</th>
                                <td>Less than</td>
                                <td>300mg</td>
                                <td>300 mg</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Sodium</th>
                                <td>Less than</td>
                                <td>2,400mg</td>
                                <td>2,400mg</td>
                            </tr>
                            <tr>
                                <th colSpan="3">Total Carbohydrate</th>
                                <td>300g</td>
                                <td>375g</td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th colSpan="2">Dietary Fiber</th>
                                <td>25g</td>
                                <td>30g</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="small-info">Calories per gram:</p>
                    <p className="small-info text-center">
                        Fat 9
                        &bull;
                        Carbohydrate 4
                        &bull;
                        Protein 4
                    </p>
                </section>
                </div>



                <button className='bg-blue-700 w-36 rounded-lg mb-4 text-white hover:bg-white hover:text-blue-700 
                hover:border hover:border-blue-700' onClick={addTableNutricional}>Agregar tabla nutricional</button>
            </div>
        </div>

    );
}