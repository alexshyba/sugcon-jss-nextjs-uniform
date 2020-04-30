import React from "react";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Logo = ({ src, width }) => {
  const cloudinaryAccount = publicRuntimeConfig.cloudinaryAccount;
  if (!cloudinaryAccount) {
    console.error(
      "CLOUDINARY_ACCOUNT environment variable is not specified."
    );
    return <img src={src} />;
  }
  const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryAccount}/image/fetch/f_auto,q_90,w_${width}/`;
  const imageSrc = src ? src.split("?")[0] : src;
  return <img src={`${cloudinaryUrl}${imageSrc}`} />;
};

export default Logo;
