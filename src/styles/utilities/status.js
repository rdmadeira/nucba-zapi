import { theme } from './colors';
import { css } from 'styled-components';

export const status = (type) => {
  switch (type) {
    case 'approved':
      return css`
        color: ${theme.success};
        background-color: ${theme.bgSuccess};
      `;
    case 'active':
      return css`
        color: ${theme.pending};
        background-color: ${theme.bgPending};
      `;
    case 'rejected':
      return css`
        color: ${theme.canceled};
        background-color: ${theme.bgCanceled};
      `;
    default:
      return css`
        color: ${theme.pending};
        background-color: ${theme.bgPending};
      `;
  }
};
