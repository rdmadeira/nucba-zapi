import { css } from 'styled-components';

export const fixed = ({ x = 0, y = 0, propX = 'left', propY = 'top' } = {}) => {
  return css`
    position: fixed;
    ${propX}: ${x};
    ${propY}: ${y};
  `;
};
