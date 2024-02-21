import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.color.border_post_controls};
  border-bottom: 1px solid ${({ theme }) => theme.color.border_post_controls};
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ControlsIcon = styled.img`
  width: 20px;
  height: 20px;

  fill: #fff;
  transition: filter 100ms;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const MenuItem = styled.li`
  padding: 0.5rem 1rem;

  font-size: 0.9rem;
  font-weight: 300;
  list-style-type: none;

  transition: color 100ms, background-color 100ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_clr_secondary};
  }

  &:first-child {
    padding-top: 1rem;
  }

  &:last-child {
    padding-bottom: 1rem;
  }
`;