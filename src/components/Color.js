import React, { useState } from "react";
import { HuePicker } from "react-color";

const Color = () => {
  const [color, setColor] = useState("#fff");

  return (
    <div>
      <HuePicker
        direction="vertical"
        width="12px"
        height="180px"
        color={color}
        onChange={(updatedColor) => setColor(updatedColor.hex)}
      />
      <p>{color}</p>
    </div>
  );
};

export default Color;
