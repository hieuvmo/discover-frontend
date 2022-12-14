import styled from "styled-components";

import { ColorPalette } from "constants/color";

export const LabelWrapper = styled.div`
  font-size: 14px;
  color: ${ColorPalette.gray_3};
  text-transform: capitalize;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const RequireText = styled.span`
  color: ${ColorPalette.redMain};
  font-size: 18px !important;
`;
