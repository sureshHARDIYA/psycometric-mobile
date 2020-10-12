import React, { useState } from 'react';

export function BackgroundImage() {

  const [backgroundImage, setBackgroundImage] = useState('pinkishBeach');

  let image;
  switch (backgroundImage) {
    case('pinkishBeach'):
      image = require('../../../../assets/images/moodtrackingapp/pinkishBeach.jpg');
      break;
    case('bali'):
      image = require('../../../../assets/images/moodtrackingapp/bali.jpg');
      break;
    case('water'):
      image = require('../../../../assets/images/moodtrackingapp/water.jpg');
      break;
    case('ocean'):
      image = require('../../../../assets/images/moodtrackingapp/ocean.jpg');
      break;
  }
  return {
    setBackgroundImage,
    backgroundImage,
    image,
  };

}

