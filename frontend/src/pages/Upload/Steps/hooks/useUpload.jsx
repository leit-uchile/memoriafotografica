import { useState, useEffect } from "react";

/**
 * DISCLAIMER: Uploading and putting data on different models is hard.
 *
 * What follows is all the necessary steps to upload photos with new metadata
 * and finally an album
 *
 * They are called in order as follows
 */
const useUpload = (
  createMultipleMetas, // func
  uploadImages, // func
  metadataCreation, // metadata status object
) => {
  const [state, setState] = useState({
    data: { photos: [], meta: {} }, // All info to upload
    newMetadata: [],
    uploading: false,
    waitForMeta: false,
  });

  /**
   * MAIN METHOD
   * filtered photos, general photo info as meta
   */
  const startProcess = (photos, photoInfo) => {
    // Manage metadata creation:
    // Merge tags in one array
    let newMetadata = [];
    photos.forEach((photo) => {
      photo.meta.tags.forEach((tag) => {
        if (tag.id === undefined) {
          newMetadata.push(tag.value);
        }
      });
    });
    photoInfo.tags.forEach((tag) => {
      if (tag.id === undefined) {
        newMetadata.push(tag.value);
      }
    });

    // If API call isn't necessary
    if (newMetadata.length !== 0) {
      createMultipleMetas(newMetadata);
      setState({
        ...state,
        data: { photos: [...photos], photoInfo },
        uploading: true,
        waitForMeta: true,
      });
    } else {
      setState({
        ...state,
        data: { photos: [...photos], photoInfo },
        uploading: true,
        waitForMeta: false,
      });
    }
  };

  useEffect(() => {
    if (metadataCreation && !metadataCreation.creating && state.uploading) {
      // Update metadata from props info
      setState({
        ...state,
        newMetadata: [...metadataCreation.newIds],
        waitForMeta: false,
      });
    }
  }, [metadataCreation]);

  // Call AssociateMeta after state update
  useEffect(() => {
    if (!state.waitForMeta && state.uploading) {
      consolidateMetadata();
    }
  }, [state]);

  const consolidateMetadata = () => {
    // Map all new names to a valid id
    let meta_mapped = {};
    state.newMetadata.forEach((t) => {
      meta_mapped[t.value] = t.id;
    });

    // get default metadata
    // As an array of IDs as 1,2,3
    let default_metadata = state.data.photoInfo.tags
      .map((t) => (t.id ? t.id : meta_mapped[t.value])) // If it doesnt exist is new!
      .join();

    // Read from photoList and change metadata
    let photo_copy = state.data.photos.map((el) => {
      // Add CC rights
      let cc = el.meta.cc == null ? state.data.photoInfo.cc : el.meta.cc;

      // If the information is uniform
      if (el.meta.tags.length === 0) {
        return {
          ...el,
          meta: {
            ...el.meta, tags: default_metadata,
            cc, date: state.data.photoInfo.date,
          },
        };
      } else {
        let custom_metadata = el.meta.tags
          .map((t) => (t.id ? t.id : meta_mapped[t.value]))
        custom_metadata.push(...default_metadata)
          
        return {
          ...el,
          meta: {
            ...el.meta, tags: custom_metadata.join(),
            cc, date: state.data.photoInfo.date,
          },
        };
      }
    });

    // Update photos and Start process
    setState({ data: { ...state.data, photos: photo_copy } });
    uploadImages(photo_copy);
    
  };

  return [startProcess];
};

export default useUpload;
