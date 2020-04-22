import React, { Component } from 'react';
// import styled from 'styled-components';

import { breakpoint } from '../../settings';
import { setSpace } from '../../mixins';

const Element = styled(({ align, ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'flex-start')};
  ${breakpoint.phone} {
    align-items: stretch;
    flex-direction: column;
    text-align: center;
    width: 100%;
    & > *:not(:first-child) {
      ${setSpace('mts')};
    }
    & > *:not(:last-child) {
      ${setSpace('mbs')};
    }
  }
  ${breakpoint.tabletPlus} {
    & > *:not(:first-child) {
      ${setSpace('mlm')};
    }
    & > *:not(:last-child) {
      ${setSpace('mrm')};
    }
  }
`;

class ActionBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    // console.group('ActionBar.js');
    // console.log(this.props);
    // console.groupEnd();

    return <Element {...this.props}>{children}</Element>;
  }
}

export default ActionBar;

ActionBar.propTypes = {};
ActionBar.defaultProps = {};
