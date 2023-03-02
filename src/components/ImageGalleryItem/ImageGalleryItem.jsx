import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ url, alt, onClick, largeImageURL }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={url}
        alt={alt}
        className={css.ImageGalleryItemImage}
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
