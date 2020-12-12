import { useState, useEffect } from "react";

/**
 * DISCLAIMER: Uploading and putting data on different models is hard.
 *
 * What follows is all the necessary steps to upload photos with new metadata
 * and finally an album
 *
 * They are called in order as follows
 */
const useUpload = (createMultipleMetas, uploadImages, metadataCreation, metadata = [], uploadPhotos = () => {}) => {
  const [state, setState] = useState({
    data: {}, // All info to upload
    uploading: false,
    cacheCreatedPhotoIds: [], // In case of upload error
    metadata: [], // Used during metadata creation
  });

  /**
   * MAIN METHOD
   * filtered photos, general photo info as meta
   */
  const startProcess = (photos, meta) => {
    // Manage metadata creation:
    // Merge tags in one array
    let metadata = {};
    state.data.tags.forEach((tag) => {
      metadata[tag.value] = { ...tag };
    });
    meta.forEach((tag) => {
      metadata[tag.value] = { ...tag };
    });

    setState({ ...state, data: { ...state.data, ...photos } });
    createMetadata(Object.values(metadata));
  };

  // On success componentDidUpdate will call
  // associateMeta()
  const createMetadata = (meta) => {

    // Filtrar fotos
    // // Create additional meta from photos
    // // Using a dictionnary
    // let additional_metadata = {};
    // this.state.photos.forEach((current_photo) => {
    //   current_photo.meta.tags.forEach((tag) => {
    //     additional_metadata[tag.name] = { ...tag };
    //   });
    // });

    let new_metas = meta
      .filter((el) => el.id === undefined)
      .map((el) => el.value);
    let id_metas = meta.filter((el) => el.id !== undefined);

    // If API call isn't necessary
    if (new_metas.length === 0) {
      setState(
        {
          metadata: id_metas,
        },
        () => associateMeta()
      );
    } else {
      // Save partial metadata state
      // New metadata will be populated later
      setState({
        ...state,
        metadata: id_metas,
      });

      createMultipleMetas(new_metas);
    }
  };

  // Call method associateMeta if needed
  useEffect(() => {
    if (metadataCreation && !metadataCreation.uploading) {
      // Update metadata from props info
      setState({
        ...state,
        metadata: [...metadata, ...metadataCreation.newIds],
      });
      // Call AssociateMeta after state update
      //associateMeta();
    }
  }, [metadataCreation]);

  const associateMeta = () => {
    let meta_mapped = {};
    state.metadata.forEach((t) => {
      meta_mapped[t.value] = t.id;
    });

    // get default metadata
    // As an array of IDs as 1,2,3
    let default_metadata = state.data.tags
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