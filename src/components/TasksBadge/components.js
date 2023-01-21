import Badge from '@mui/material/Badge';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledBadge = styled(Badge)`
  position: relative;
  left: ${({ left }) => (left ? '10px' : '-10px')};
  visibility: ${({ display }) => (display ? 'visible' : 'hidden')};
`;
