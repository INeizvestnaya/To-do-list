import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledTypography = styled(Typography)`
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
`;
