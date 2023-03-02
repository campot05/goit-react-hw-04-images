import { Component } from 'react';
import cn from 'classnames';
import { Notify } from 'notiflix';
import { fetchImg } from 'components/services/api';
import { MutatingDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Button from 'components/Button';
import Modal from 'components/Modal';

export class ImageGallery extends Component {
  state = {
    hits: null,
    loading: false,
    total: 0,
    showModal: false,
    largeUrl: '',
  };
  page = 1;
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loading: true, hits: null, total: 0 });
      this.page = 1;
      const data = await fetchImg(this.props.query, this.page);
      this.setState({
        loading: false,
        hits: data.hits,
        total: data.totalHits,
      });

      if (data.total === 0) {
        return Notify.failure(`No results were found for ${this.props.query}`);
      }
    }
  }

  clickLoadMore = async () => {
    this.setState({ loading: true });
    this.page += 1;
    const data = await fetchImg(this.props.query, this.page);
    this.setState(prev => ({
      hits: [...prev.hits, ...data.hits],
      loading: false,
    }));
  };

  onShowModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImg = url => {
    this.setState({ largeUrl: url, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { hits, total, loading, showModal, largeUrl } = this.state;
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
                  onClick={this.onClickImg}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          </ul>
        )}
        {total > 12 * this.page && (
          <Button clickLoadMore={this.clickLoadMore}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={largeUrl} alt="items" className={css.ModalImg} />
          </Modal>
        )}
      </>
    );
  }
}
