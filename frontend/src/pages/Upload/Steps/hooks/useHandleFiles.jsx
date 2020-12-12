import { useState } from "react"
import uuid from "uuid";

const imageMaxSize = 8000000; // Bytes ~ 8MB

/**
 * Handle File upload and photo state managment
 */
const useHandleFiles = (sendAlert) => {
  const [state, setState] = useState({photos: [],length: 0,});

  const handleOnDrop = (files) => {
    var images = [];
    if (files && files.length > 0) {
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*") || f.size > imageMaxSize) {
          sendAlert(
            "Error: Extension no valida o archivo muy pesado",
            "warning"
          );
        } else {
          images.push(f);
        }
      }
      handleUpload(images);
    }
  };

  const handleUpload = (file) => {
    var f = file.map((el) => ({
        id: uuid.v4(),
        photo: el,
        meta: {
          description: "",
          tags: [],
          cc: null,
          previewCalled: false,
          collapse: false,
        },}));
    setState({
      photos: [...state.photos, ...f],
      length: state.photos.length + 1,
    });
  }

  const saveMeta = (info, key) => {
    var newphotos = [];
    // Update info at key
    state.photos.forEach((element, i) => {
      if (i === key) {
        var el;
        el = {
          id: element.id,
          photo: element.photo,
          meta: { ...info },
        };
        newphotos = newphotos.concat(el);
      } else {
        newphotos = newphotos.concat(element);
      }
    });
    setState({ photos: newphotos, length: newphotos.length });
  }
  
  const handleErase = (key) => {
    var newphotos = state.photos.filter((el, i) => i !== key);
    setState({ photos: newphotos, length: newphotos.length });
  }

  return [state, setState, handleOnDrop, saveMeta, handleErase]
}

export default useHandleFiles;