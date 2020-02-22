export function image64toCanvasRef (canvasRef, image64, pixelCrop) {
    const canvas = canvasRef
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = image64
    if(pixelCrop.width===0){
        pixelCrop.width = Math.max(1, Math.floor(pixelCrop.width));
    }
    if(pixelCrop.height===0){
        pixelCrop.height = Math.max(1, Math.floor(pixelCrop.height));
    }
    image.onload = function () {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )
    }
}