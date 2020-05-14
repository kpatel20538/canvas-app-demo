export const getMouseCoordinates = (context, event) => {
  const { top, left } = context.canvas.getBoundingClientRect();
  const { clientX, clientY } = event;
  return { x: clientX - left, y: clientY - top };
};

export const extractImageBlob = (context) =>
  new Promise((resolve) => context.canvas.toBlob(resolve));

export const drawImageBlob = async (context, blob) => {
  clearCanvas(context);
  const bitmap = await createImageBitmap(blob);
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
};

export const clearCanvas = (context) => {
  const { width, height } = context.canvas.getBoundingClientRect();
  context.clearRect(0, 0, width, height);
};
