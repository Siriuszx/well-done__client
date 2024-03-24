import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  height: 100dvh;
  width: 100dvw;
`;

export const Backdrop = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.dialog_backdrop_bg};
`;
