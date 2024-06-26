import styled from 'styled-components';
import ShakeOnOverflow from '../../../components/general/ShakeOnOverflow';
import tw from 'twin.macro';

export const Form = styled.form`
  ${tw`p-4 flex flex-col gap-2 shadow rounded text-sm`}
`;

export const FormWrapper = styled.div``;

export const Header = styled.h2`
  ${tw`text-lg`}
`;

export const CommentList = styled.ol`
  ${tw`flex flex-col`}
`;

export const BottomWrapper = styled.div`
  ${tw`flex justify-between items-center px-1`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex gap-4`}
`;

export const StyledCounter = styled(ShakeOnOverflow)`
  ${tw`min-w-[7ch] font-light text-right`}
`;
