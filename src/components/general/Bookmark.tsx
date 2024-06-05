import { StyledIcon } from './Bookmark.styled';

type BookmarkProps = {
  onBookmarked: () => void;
  className?: string;
  isBookmarked: boolean;
};

const Bookmark = ({ onBookmarked, className, isBookmarked }: BookmarkProps) => {
  const bookmarkSrc = isBookmarked ? '/bookmark.svg' : '/bookmark-outline.svg';

  return (
    <StyledIcon
      onClick={onBookmarked}
      className={className}
      src={bookmarkSrc}
      alt="Bookmark Icon"
    />
  );
};

export default Bookmark;
