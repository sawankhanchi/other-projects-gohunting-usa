import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getData } from './BlogPage.duck';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  BlogCard,
} from '../../components';
import css from './BlogPage.module.css';

const BlogPage = ({ getData, newData }) => {

  const [data, setData] = useState([]);

  console.log(newData);

  useEffect(() => {

    getData();
  }, []);

  useEffect(() => {
    
    setData(newData);
  }, [newData]);

  return (
    <StaticPage
      title="BlogPage"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'BlogPage',
        description: 'Blog Page',
        name: 'Blog page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Blog</h1>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
            
              <div className={css.categories}>

              </div>
            </div>
            {
              <div className={css.BlogCard}>

                {data && data.length > 0 ? (
                  data.map((item, index) => 
                  
                  <BlogCard title={item.title} index={index} slug={item.slug} image={item.image} content={item.content} id={item.id} publishedAt={item.publishedAt} />)
                ) : (
                  <h1>no result found</h1>
                )}
                
              </div>
            }
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

const mapStatetoProps = state => {

  const newData = state.Article.contents;   
  return {
    newData,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getData: () => dispatch(getData()),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(BlogPage);
