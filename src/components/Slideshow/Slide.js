import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const MIN_HEIGHT = 350;

const useStyles = (maskColor, textColor) =>
  makeStyles(theme => ({
    slideRoot: {
      width: '100%',
    },
    slideFigure: {
      backgroundColor: maskColor || 'transparent',
      color: textColor || 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: theme.spacing(3),
      position: 'relative',
      width: '100%',
    },
    slideObj: {
      alignItems: 'center',
      display: 'flex',
      flex: '1 0 auto',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    slideCaption: {
      display: 'flex',
      flex: '0 1 auto',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'relative',
      textAlign: 'center',
      zIndex: 50,
    },
    slideCount: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    slideArrow: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      '&:hover': {
        background: 'transparent',
      },
    },
  }));

export default function Slide({
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

  const { fluid } = image.childImageSharp;
  const { aspectRatio } = fluid;

  const [winDimensions, setWinDimensions] = useState(null);
  const [objDimensions, setObjDimensions] = useState(null);

  const getDimensions = () => {
    const wh = window.innerHeight;
    const ww = window.innerWidth;

    const h = fullSize ? wh : wh / 2 < MIN_HEIGHT ? MIN_HEIGHT : wh / 2;
    const w = ww;
    const r = w / h;

    setWinDimensions({ wh, ww });
    setObjDimensions({
      oh: aspectRatio < r ? (h / 5) * 3 : ((w / 5) * 3) / aspectRatio,
      ow: aspectRatio < r ? (h / 5) * 3 * aspectRatio : (w / 5) * 3,
    });
  };

  useEffect(() => {
    getDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', getDimensions);
    return () => window.removeEventListener('resize', getDimensions);
  });

  return (
    <BackgroundImage fluid={fluid} className={classes.slideRoot} {...props}>
      <figure
        className={classes.slideFigure}
        style={{
          height: fullSize
            ? `${winDimensions?.wh}px`
            : `${winDimensions?.wh / 2 < MIN_HEIGHT ? MIN_HEIGHT : winDimensions?.wh / 2}px`,
        }}>
        <div className={classes.slideObj}>
          <Img
            fluid={fluid}
            style={{
              height: objDimensions?.oh,
              width: objDimensions?.ow,
            }}
          />
        </div>
        <figcaption className={classes.slideCaption}>
          {count > 1 ? (
            <Typography className={classes.slideCount} variant="caption" component="div">
              <IconButton className={classes.slideArrow} color="inherit" onClick={onCallPrev} size="small">
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
              {image.order < 10 ? `0${image.order}` : image.order} / {count < 10 ? `0${count}` : count}
              <IconButton className={classes.slideArrow} color="inherit" onClick={onCallNext} size="small">
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
  );
}

Slide.propTypes = {};
