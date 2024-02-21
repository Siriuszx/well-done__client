import styled from 'styled-components';

export const Wrapper = styled.div`
  grid-area: main;
  display: grid;
  grid-template-columns: minmax(50ch, 80ch) minmax(30ch, 40ch);
  justify-content: center;
  gap: 4rem;

  min-height: 100%;
`;
