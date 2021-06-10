import React from 'react';
import css from './BlogCard.module.css';
import { Link } from 'react-router-dom';

// const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

// console.log(IMAGE_URL);

const BlogCard = (props) => {
 const {
   category,
   title,
   content,
   publishedAt,
   slug,
   index,
   image,
  } = props

  // console.log(image);

  return (
   <>
    <Link to={`/blogpage/article/${slug}?index=${index}`}>
      <div className={css.staticPageWrapper}>
        
          <div className={css.contentWrapper}>
          <div className={css.mainCard}>
          <div className={css.card}>
          <div className={css.cardbanner}>
            <p className={css.categorytagpopular}>{category}</p>
          </div>
          <div className={css.cardbody}>
          
          {/* <div >
            <img src={image && image.url} transformImageUri={uri =>
                uri.startsWith("http") ? uri : `${process.env.REACT_APP_IMAGE_URL}${uri}`
            }/>
          </div> */}

            <p className={css.bloghashtag}>{publishedAt}</p>
            <h2 className={css.blogtitle}>{title}</h2>
            <p className={css.blogcontent}>{content}</p>

          <button className={css.blogbutton}>READ MORE</button>
          </div>
          </div>
          </div>
        </div>
      </div>
    </Link>
   </>
  );
};

export default BlogCard;
