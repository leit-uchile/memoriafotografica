import React from 'react';

const getPermissionLogo = (name, w, h) => {
  var url;
  switch (name) {
    case "CC BY":
      url = "/assets/CC/CCBY.svg";
      break;
    case "CC BY-NC":
      url = "/assets/CC/CCBYNC.svg";
      break;
    case "CC BY-NC-ND":
      url = "/assets/CC/CCBYNCND.svg";
      break;
    case "CC BY-NC-SA":
      url = "/assets/CC/CCBYNCSA.svg";
      break;
    case "CC BY-ND":
      url = "/assets/CC/CCBYND.svg";
      break;
    case "CC BY-SA":
      url = "/assets/CC/CCBYSA.svg";
      break;
    default:
      url = "/assets/CC/CCBYSA.svg";
  }
  return <img width={w} height={h} src={url} alt='' key={name}/>;
};

export {
  getPermissionLogo
};