import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import setSpace from '../../themes/mixins/setSpace';

const SLIDER_PADDING = 80;

const useStyles = (maskColor, textColor) =>
  makeStyles(theme => ({
    imageRoot: {},
    imageChild: {
      '&:before': {
        webkitFilter: 'blur(5px)',
        filter: 'blur(5px)',
      },
      '&:after': {
        webkitFilter: 'blur(5px)',
        filter: 'blur(5px)',
      },
    },
    imageFigure: {
      backgroundColor: maskColor || 'transparent',
      color: textColor || 'inherit',
      display: 'block',
      position: 'relative',
      width: '100vw',
    },
    imageImg: {
      overflow: 'hidden',
      padding: `${SLIDER_PADDING}px`,
    },
    imageCaption: {
      bottom: 0,
      display: 'block',
      left: 0,
      marginBottom: '20px',
      position: 'absolute',
      right: '0',
      textAlign: 'center',
      zIndex: '50',
    },
    imageCount: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    imageArrow: {
      ...setSpace('mh200'),
      '&:hover': {
        background: 'transparent',
      },
    },
  }));

export default function Image({
  count,
  maxHeight,
  onCallNext,
  onCallPrev,
  sliderRef,
  slideNo,
  settings: { fullSize = null, image = null, maskColor = null, textColor = null },
  ...props
}) {
  const classes = useStyles(maskColor, textColor)();

  const { innerHeight, innerWidth } = window;
  const { fluid, fixed } = image.childImageSharp;

  const [dimensions, setDimensions] = useState(null);

  const getDimensions = () => {
    var wh = window.innerHeight;
    var ww = window.innerWidth;

    const { aspectRatio } = fluid;

    if (aspectRatio > 1) {
      const h = (wh / ww) * aspectRatio;
      const w = ww;
      setDimensions({ h, w });
    } else if (aspectRatio < 1) {
      const h = wh;
      const w = ww * ((wh / ww) * aspectRatio);
      setDimensions({ h: h, w: w + SLIDER_PADDING });
    } else {
      const d = wh > wh ? wh : ww;
      setDimensions({ h: d, w: d });
    }
  };

  useEffect(() => {
    getDimensions();
  }, []);

  useEffect(() => {
    getDimensions();
  }, [slideNo]);

  useEffect(() => {
    window.addEventListener('resize', getDimensions);
    return () => window.removeEventListener('resize', getDimensions);
  });

  // console.group('Image.js');
  // console.log('image:', image);
  // console.groupEnd();

  return (
    <BackgroundImage fluid={fluid} className={classes.imageRoot} {...props}>
      <BackgroundImage fluid={fluid} className={classes.imageChild}>
        <figure className={classes.imageFigure}>
          <div
            className={classes.imageImg}
            style={{
              minHeight: fullSize ? `${window.innerHeight}px` : 'auto',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Img
              fluid={fluid}
              style={{
                height: fullSize ? `${dimensions?.h - SLIDER_PADDING * 2}px` : 'auto',
                width: fullSize ? `${dimensions?.w - SLIDER_PADDING * 2}px` : 'auto',
              }}
              src=""
            />
          </div>
          <figcaption className={classes.imageCaption}>
            {count > 1 ? (
              <Typography className={classes.imageCount} variant="caption" component="div">
                <IconButton className={classes.imageArrow} color="inherit" onClick={onCallPrev} size="small">
                  <ArrowBackIcon fontSize="inherit" />
                </IconButton>
                {image.order < 10 ? `0${image.order}` : image.order} / {count < 10 ? `0${count}` : count}
                <IconButton className={classes.imageArrow} color="inherit" onClick={onCallNext} size="small">
                  <ArrowForwardIcon fontSize="inherit" />
                </IconButton>
              </Typography>
            ) : null}
            <Typography noWrap variant="body1">
              {image.caption}
            </Typography>
          </figcaption>
        </figure>
      </BackgroundImage>
    </BackgroundImage>
  );
}

Image.propTypes = {};
