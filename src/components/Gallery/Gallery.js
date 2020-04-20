import './react-slick.css';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import sortBy from 'lodash/sortBy';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Image from './Image';

const useStyles = fullSize => makeStyles(theme => ({}));

export default function Gallery({ fullSize, images, maskColor, textColor }) {
  const classes = useStyles(fullSize)();
  const sliderRef = useRef();

  const [slideNo, setSlideNo] = useState(null);

  const sliderSettings = {
    adaptiveHeight: false,
    arrows: false,
    dots: false,
    fade: true,
    slidesToShow: 1,
    variableWidth: false,
  };

  // console.group('Gallery.js');
  // console.log({ images });
  // console.log(images.length);
  // console.groupEnd();

  return (
    <Slider {...sliderSettings} ref={sliderRef} beforeChange={(oNo, nNo) => setSlideNo(nNo)}>
      {images.length > 1 ? (
        sortBy(images, [o => o.order]).map((image, i) => {
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
            <Image
              count={images.length}
              key={image.order}
              onCallNext={() => sliderRef.current.slickNext()}
              onCallPrev={() => sliderRef.current.slickPrev()}
              settings={settings}
              slideNo={slideNo}
              sliderRef={sliderRef}
            />
          );
        })
      ) : (
        <Image {...images[0]} settings={{ image: images[0], fullSize, maskColor, textColor }} />
      )}
    </Slider>
  );
}

Gallery.propTypes = {};
