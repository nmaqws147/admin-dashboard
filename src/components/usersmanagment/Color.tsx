import { useEffect, useState } from "react";
import { useSideBar } from "../sidebar";
import {ReactComponent as Logo} from '../img/logo.svg';
import { HexColorPicker } from "react-colorful";

const Color: React.FC = () => {
    const storedColor = localStorage.getItem("color")
  const [color, setColor] = useState<string>(storedColor || "");
    console.log(color);
    useEffect(() => {
    if(color){
        localStorage.setItem("color",color);
    }
    }, [color])
    const {isOpen} = useSideBar();
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "70vh",
      marginLeft: isOpen ? "240px" : "0",
      transition: "0.5s ease all"
    }}>
      <Logo style={{ width: "600px", height: "auto", marginBottom: "10px", color:color }} />
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default Color;
