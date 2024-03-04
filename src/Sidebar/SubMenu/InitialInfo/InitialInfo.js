import { useState } from "react";
import { ReactComponent as QuestionMarkSVG } from '../../../icons/question-solid.svg';

export default function InitialInfo() {
    return (
        <section className="flex flex-col gap-6">
        <div className="flex-1">
            <h1 className="font-semibold text-sm left-0">
                Alérgenos
            </h1>
            <div className="flex justify-center xl:items-center mt-3">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 xl:grid-cols-4 gap-4">

                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    

                </div>
            </div>
        </div>
        <div className="flex-1">
            <h1 className="font-semibold text-sm left-0">
                Restricciones religiosas y  Dietéticas
            </h1>
            <div className="flex justify-center xl:items-center mt-3">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 xl:grid-cols-4 gap-4">

                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />
                    <QuestionMarkSVG className="w-5 hover:scale-110 mx-2" />

                </div>
            </div>
        </div>
    </section>  
    );
}