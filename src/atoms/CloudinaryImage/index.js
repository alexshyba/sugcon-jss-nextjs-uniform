import React from 'react';
import { Image } from 'cloudinary-react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const CloudinaryImage = ({ src, className }) => {
  // TODO: add experience editor

  // capping query string from Sitecore media url
  const originImagePath = src.split('?')[0];

  const cloudinaryAccount = publicRuntimeConfig.cloudinaryAccount;
  const imageUrl = `https://res.cloudinary.com/${cloudinaryAccount}/image/fetch/c_scale,q_70,w_300/${originImagePath}`;

  if (!cloudinaryAccount) {
    console.error('CLOUDINARY_ACCOUNT environment variable is not specified.');
    return <img src={src} />;
  }

  return <img src={imageUrl} className={className} />;
};

export default CloudinaryImage;
