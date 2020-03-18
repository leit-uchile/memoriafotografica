// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Soruce: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object
export function base64StringtoFile(base64String, filename) {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data){
    return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
}