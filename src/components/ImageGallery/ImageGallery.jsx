import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Notify } from 'notiflix';
import { fetchImg } from 'components/services/api';
import { MutatingDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Button from 'components/Button';
import Modal from 'components/Modal';

export function ImageGallery({ query }) {
  const [hits, setHits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');
  const [page, setPage] = useState(1);

  const onClickImg = url => {
    setLargeUrl(url);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }
    const getFetch = async () => {
      setLoading(true);
      const data = await fetchImg(query, page);
      setHits(prev => [...prev, ...data.hits]);
      setLoading(false);
    };
    getFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setPage(1);
    setLoading(true);
    setHits(null);
    setTotal(0);
    const getFetch = async () => {
      const data = await fetchImg(query, 1);
      setLoading(false);
      setHits(data.hits);
      setTotal(data.totalHits);
      if (data.total === 0) {
        return Notify.failure(`No results were found for ${query}`);
      }
    };
    getFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      {loading && <MutatingDots wrapperClass={css.spinner} />}
      {hits && (
        <ul
          className={cn(css.ImageGallery, {
            [css.ImageGalleryOverflow]: showModal,
          })}
        >
          {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                onClick={onClickImg}
                largeImageURL={largeImageURL}
              />
            );
          })}
        </ul>
      )}
      {total > 12 * page && (
        <Button clickLoadMore={loadMore}>
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      )}
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeUrl} alt="items" className={css.ModalImg} />
        </Modal>
      )}
    </>
  );
}
