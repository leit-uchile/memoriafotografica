import React from 'react';

const getPermissionLogo = (permissionObject, w, h) => {
  return <img width={w} height={h} src={permissionObject.image} alt='' key={permissionObject.code} />;
};

export {
  getPermissionLogo
};