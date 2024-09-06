import React from "react";
import Button from "../ui/button";
import Icon from "../ui/icons";

const Journey = () => {
  return (
    <div>
      <h1 className="text-6xl text-center mb-9">
        Crafting Tradition <br /> with Modern Elegance
      </h1>

      <div className="mb-9">
        <div className="flex justify-center flex-row">
          <div className="bg-brown-200 h-20 w-[438px]  rotate-2 rounded-full text-center flex items-center justify-center">
            <div className="mr-4">
              <Icon type="pathFlow" />
            </div>
            <p className="text-xl">Our Journey</p>
          </div>

          <div className="relative  w-[438px]">
            <div className="absolute -left-10 -rotate-2 bg-brown-200 h-20 w-[438px] rounded-full text-center flex items-center justify-center">
              <div className="mr-4">
                <Icon type="qualityCraft" />
              </div>
              <p className="text-xl">Quality & Craftmanship</p>
            </div>
          </div>
        </div>

        <div className="flex mt-2 justify-center">
          <div className="relative w-[438px] h-20 ">
            <div className="bg-brown-200 h-20 absolute left-24 bottom-4 w-[438px] rounded-full text-center flex items-center justify-center">
              <div className="mr-4">
                <Icon type="award" />
              </div>
              <p className="text-xl">Awards & Recognitions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button title="About Us" />
      </div>
    </div>
  );
};

export default Journey;
