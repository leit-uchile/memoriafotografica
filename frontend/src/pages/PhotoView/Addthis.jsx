import React, { useState, useCallback, useEffect } from "react";
import LoadScript from "react-load-script";

const Addthis = ({ title, description, thumbnail }) => {
  var [loaded, SetLoaded] = useState(false);

  const handleScriptLoad = (loaded) => {
    window.addthis.init();
    window.addthis.toolbox(".addthis_inline_share_toolbox");
    if (!loaded) {
      SetLoaded(true);
    }
  };

  useEffect(
    () => {
      if (loaded) { 
        try{
          window.addthis.layers.refresh()
        }catch{
          console.log("AddThis Failed")
        }
      }
    }, [title, description, thumbnail])

  return (
    <div>
      {loaded ? null : (
        <LoadScript
          url="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e7cf8ed6dc9088f"
          onLoad={() => handleScriptLoad(loaded)}
        />
      )}
      <div
        style={{ display: "inline-block" }}
        class="addthis_inline_share_toolbox"
        data-url="http://memoriafotografica.ing.fcfm.cl/"
        data-title={title}
        data-description={description}
        data-media={thumbnail}
      ></div>
    </div>
  );
};

export default Addthis;
