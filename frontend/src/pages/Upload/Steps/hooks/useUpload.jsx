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
  createMultipleMetas,
  uploadImages,
  metadataCreation,
  metadata = [],
  uploadPhotos = () => {}
) => {
  const [state, setState] = useState({
    data: { photos: [], meta: {} }, // All info to upload
    uploading: false,
    newMetadata: [],
    waitForMeta: false,
  });

  /**
   * MAIN METHOD
   * filtered photos, general photo info as meta
   */
  const startProcess = (photos, meta) => {
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
    meta.forEach((tag) => {
      if (tag.id === undefined) {
        newMetadata.push(tag.value);
      }
    });

    // If API call isn't necessary
    if (newMetadata.length !== 0) {
      createMultipleMetas(newMetadata);
      setState({
        ...state,
        data: { photos: [...photos], meta },
        uploading: true,
        waitForMeta: true,
      });
    } else {
      setState({
        ...state,
        data: { photos: [...photos], meta },
        uploading: true,
        waitForMeta: false,
      });
    }
  };

  useEffect(() => {
    if (metadataCreation && !metadataCreation.uploading && state.uploading) {
      // Update metadata from props info
      setState({
        ...state,
        newMetadata: [metadataCreation.newIds],
        waitForMeta: false,
      });
    }
  }, [metadataCreation]);

  // Call method associateMeta if needed
  useEffect(() => {
    if (!state.waitForMeta && state.data.photos.length !== 0) {
      // Call AssociateMeta after state update
      associateMeta();
    }
  }, [state]);

  const associateMeta = () => {
    let meta_mapped = {};
    state.metadata.forEach((t) => {
      meta_mapped[t.value] = t.id;
    });

    // get default metadata
    // As an array of IDs as 1,2,3
    let default_metadata = state.data.meta
      .map((t) => {
        return meta_mapped[t.value];
      })
      .join();

    // Read from photoList and change meta
    let photo_copy = this.state.data.photos.map((el) => {
      // If the information is uniform
      if (el.meta.tags.length === 0) {
        return { ...el, meta: { ...el.meta, tags: default_metadata } };
      } else {
        let custom_metadata = el.meta.tags
          .map((t) => {
            // They have name saved
            return meta_mapped[t.value];
          })
          .join();
        return { ...el, meta: { ...el.meta, tags: custom_metadata } };
      }
    });

    // Start process
    setState({ data: { ...this.state.data, photos: photo_copy } });
    startUploading({});
  };

  // Once the metadata is ready we upload photos
  const startUploading = (newData) => {
    // Merge album info and photos from arg photos
    // Important: photos is used to store the images
    setState({
      ...state,
      data: { ...state.data, ...newData },
      uploading: true, // This may be removed (?)
    });
    // Upload all
    uploadPhotos(this.state.data);
  };

  return [startProcess];
};

export default useUpload;
