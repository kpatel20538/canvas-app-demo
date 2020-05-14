import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { getFile, deleteFile, setFile } from "../util/fileUtils";
import {
  getMouseCoordinates,
  clearCanvas,
  drawImageBlob,
  extractImageBlob,
} from "../util/canvasUtils";

const Home = () => {
  const [isDrawing, setIsDrawing] = useState();
  const [color, setColor] = useState("black");
  const canvasRef = useRef();
  const contextRef = useRef();

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");
    setColor(contextRef.current.fillStyle);
  }, []);

  useEffect(() => {
    contextRef.current.fillStyle = color;
  }, [color]);

  return (
    <main>
      <Navbar
        onNew={() => {
          clearCanvas(contextRef.current);
        }}
        onOpen={async (fileName) => {
          const file = await getFile(fileName);
          await drawImageBlob(contextRef.current, file);
        }}
        onSave={async (fileName) => {
          const file = await extractImageBlob(contextRef.current);
          await setFile(fileName, file);
        }}
        onDelete={async (fileName) => {
          await deleteFile(fileName);
        }}
      />
      <Section>
        <div className="box is-paddingless">
          <canvas
            width="300"
            height="300"
            ref={canvasRef}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseMove={(event) => {
              if (isDrawing) {
                const { x, y } = getMouseCoordinates(contextRef.current, event);
                contextRef.current.fillRect(x - 5, y - 5, 10, 10);
              }
            }}
          />
        </div>
        <input
          className="input"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </Section>
    </main>
  );
};

export default Home;
