import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchBookmarks,
  selectBookmarkList,
  selectFetchBookmarksState,
} from '../miscListSlice';

import { BookmarkList, CalloutText, Header, Wrapper } from './BookmarkContainer.styled';
import BookmarkItem from './BookmarkItem';
import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';

const BookmarkContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const bookmarkList = useAppSelector(selectBookmarkList);
  const { isLoading, error } = useAppSelector(selectFetchBookmarksState);

  return (
    <Wrapper>
      <Header>Recently Saved</Header>
      <BookmarkList>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Error />
        ) : bookmarkList.length === 0 ? (
          <CalloutText>No bookmarks yet!</CalloutText>
        ) : (
          bookmarkList
            .slice(0)
            .reverse()
            .map((b) => <BookmarkItem key={b._id} {...b} />)
        )}
      </BookmarkList>
    </Wrapper>
  );
};

export default BookmarkContainer;
