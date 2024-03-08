import React from 'react';
import { fabric } from 'fabric';
import './TablePreview2.css'
import { toSvg } from 'html-to-image';
import { useRef } from 'react';

export default function TablePreview2(props) {

    const elementRef = useRef(null);

    function filter (node) {
        return (node.tagName !== 'i');
      }

    const addTableNutricional = () => {
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
            <section class="nutrition-label vertical-label">
  <div class="nutrition-row">
    <div class="nutrition-column">
      <header class="nutrition-header">
        <h1 class="nutrition-facts border-b">Nutrition Facts</h1>
        <div class="nutrition-row">
          <div class="nutrition-column">
            <div class="servings">8 servings per container</div>
            <div class="text-md text-bold show-tablet">Serving size</div>
          </div>
        </div>
        <div class="nutrition-row border-b-lg border-b-tablet">
          <div class="nutrition-column hide-tablet">
            <div class="text-md text-bold">Serving size</div>
          </div>
          <div class="nutrition-column">
            <div class="text-md text-bold text-right text-left-tablet">2/3 cup (55g)</div>
          </div>
        </div>
        <div class="nutrition-row border-b-md border-b-none-tablet">
          <div class="nutrition-column text-bold">
            <div class="text-sm hide-tablet">Amount per serving</div>
            <div class="calories">Calories</div>
            <div class="text-sm show-tablet">per serving</div>
          </div>
          <div class="nutrition-column calories amount align-bottom text-right">
            230
          </div>
        </div>
      </header>
    </div>
    <div class="nutrition-column">
      <div class="nutrition-row">
        <div class="nutrition-column">
          <div class="nutrition-row border-b border-b-md-tablet">
            <div class="nutrition-column text-bold text-sm show-tablet">
              Amount/serving
            </div>
            <div class="nutrition-column text-right text-bold text-sm">
              % Daily Value *
            </div>
          </div>
          <div class="nutrition-row border-b">
            <div class="nutrition-column">
              <span class="text-bold">Total Fat</span> 8g
            </div>
            <div class="nutrition-column text-bold text-right">
              10%
            </div>
          </div>
          <div class="nutrition-row border-b">
            <div class="nutrition-column">
              <span class="text-indent">Saturated Fat 1g</span>
            </div>
            <div class="nutrition-column text-bold text-right">
              5%
            </div>
          </div>
          <div class="nutrition-row border-b">
            <div class="nutrition-column">
              <span class="text-indent">
                    <i>Trans</i> Fat 0g</span>
            </div>
            <div class="nutrition-column text-bold text-right">
            </div>
          </div>
          <div class="nutrition-row border-b">
            <div class="nutrition-column">
              <span class="text-bold">Cholesterol</span> 0mg
            </div>
            <div class="nutrition-column text-bold text-right">
              0%
            </div>
          </div>
          <div class="nutrition-row border-b border-b-md-tablet">
            <div class="nutrition-column">
              <span class="text-bold">Sodium</span> 160mg
            </div>
            <div class="nutrition-column text-bold text-right">
              7%
            </div>
          </div>
        </div>
        <div class="nutrition-column">
          <div class="nutrition-row border-b-md show-tablet">
            <div class="nutrition-column text-bold text-sm">
              Amount/serving
            </div>
            <div class="nutrition-column text-right text-bold text-sm">
              % Daily Value *
            </div>
          </div>
          <div class="nutrition-row border-b">
            <div class="nutrition-column">
              <span class="text-bold">Total Carbohydrate</span> 37g
            </div>
            <div class="nutrition-column text-bold text-right">
              13%
            </div>
          </div>
          <div class="nutrition-row border-b">
            <div class="nutrition-column">
              <span class="text-indent">Dietary Fiber 4g</span>
            </div>
            <div class="nutrition-column text-bold text-right">
              14%
            </div>
          </div>
          <div class="nutrition-row">
            <div class="nutrition-column">
              <span class="text-indent">Total Sugars 12g</span>
            </div>
            <div class="nutrition-column text-bold text-right">
            </div>
          </div>
          <div class="nutrition-row text-indent-md border-t-sm">
            <div class="nutrition-column">
              Includes 10g Added Sugars
            </div>
            <div class="nutrition-column text-bold text-right">
              20%
            </div>
          </div>
          <div class="nutrition-row border-t-sm border-b-lg border-b-md-tablet">
            <div class="nutrition-column">
              <span class="text-bold">Protein</span> 3g
            </div>
            <div class="nutrition-column text-bold text-right">
            </div>
          </div>
        </div>
      </div>
      <div class="nutrition-row">
        <div class="nutrition-column">
          Vitamin D 2mcg 10% • Calcium 260mg 20% • Iron 8mg 45% • Potassium 235mg 6% • Thiamin 15% • Riboflavin 8% • Niacin 10% • Vitamin B6 0.4mg 25%
        </div>
      </div>
    </div>
    <div class="nutrition-column">
      <footer class="nutrition-footer">
        <div class="asteric">*</div>
        <div class="footnote">
          The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
        </div>
      </footer>
    </div>
  </div>
</section>
                </div>



                <button className='bg-blue-700 w-36 rounded-lg mb-4 text-white hover:bg-white hover:text-blue-700 
                hover:border hover:border-blue-700' onClick={addTableNutricional}>Agregar tabla nutricional</button>
            </div>
        </div>

    );
}