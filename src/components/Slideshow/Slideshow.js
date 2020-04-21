import './react-slick.css';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import sortBy from 'lodash/sortBy';

import Slide from './Slide';

export default function Slideshow({ fullSize = false, images, maskColor, textColor, style = null, ...props }) {
  const sliderRef = useRef();

  const sliderSettings = {
    adaptiveHeight: false,
    arrows: false,
    dots: false,
    fade: true,
    slidesToShow: 1,
    variableWidth: false,
  };

  console.group('Slideshow.js');
  console.log({ images });
  // console.log(images.length);
  console.groupEnd();

  return (
    <Slider {...sliderSettings} ref={sliderRef} style={style}>
      {sortBy(images, [o => o.order]).map((image, i) => {
        const settings = {
          fullSize,
          image: {
            ...image,
            order: i + 1,
          },
          maskColor,
          textColor,
        };
        return (
          <Slide
            canvasHeight={props.canvasHeight}
            count={images.length}
            key={image.order}
            onCallNext={() => sliderRef.current.slickNext()}
            onCallPrev={() => sliderRef.current.slickPrev()}
            settings={settings}
            sliderRef={sliderRef}
          />
        );
      })}
    </Slider>
  );
}

Slideshow.propTypes = {};
