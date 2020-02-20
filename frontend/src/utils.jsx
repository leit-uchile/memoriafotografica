import React from 'react';

const getPermissionLogo = (name, w, h) => {
  var url;
  switch (name) {
    case "CC BY":
      url = "/assets/CCBY.svg";
      break;
    case "CC BY-NC":
      url = "/assets/CCBYNC.svg";
      break;
    case "CC BY-NC-ND":
      url = "/assets/CCBYNCND.svg";
      break;
    case "CC BY-NC-SA":
      url = "/assets/CCBYNCSA.svg";
      break;
    case "CC BY-ND":
      url = "/assets/CCBYND.svg";
      break;
    case "CC BY-SA":
      url = "/assets/CCBYSA.svg";
      break;
    default:
      url = "/assets/CCBYSA.svg";
  }
  return <img width={w} height={h} src={url} alt='' key={name}/>;
};

export {
  getPermissionLogo
};