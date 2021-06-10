import React , {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getData } from './Article.duck';
import ReactMarkdown from "react-markdown"
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './Article.module.css';

// const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const Article = ({getData, content}) => {

  const [ data, setData ] = useState([]);

  
  useEffect(() => {

    getData();
  }, [])

  useEffect(() => {

    let indexValue =  window.location.href.slice(window.location.href.indexOf('?')).slice(7)

    setData(content[indexValue])
  }, [content]);

  console.log(content)
  
  return (
    <div className="post-content-view">
    <StaticPage
      title="Article"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Article',
        description: 'About Saunatime',
        name: 'Article',
      }}
    >

      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
            <TopbarContainer />
        </LayoutWrapperTopbar>
          <LayoutWrapperMain  className={css.staticPageWrapper}>

            <div className={css.contentWrapper}>
              <div className={css.contentSide}>
                
              </div>
                <div className={css.mainCard}>
                <div className={css.BlogCard}>
               
              </div>

              {/* {
                data && data.length > 0 ? data.map( (item, index) => <p key={item.index}> {item.content} </p> ) : <h1>no result found</h1>
              } */}

              <ReactMarkdown source={data && data.content} transformImageUri={uri =>
                uri.startsWith("http") ? uri : `${process.env.REACT_APP_IMAGE_URL}${uri}`
              }/>
              
              </div>
              
            </div>
          </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
    </div>
  );
}

const mapStatetoProps = state => {
  console.log(state);

  const content = state.Article.contents;
  console.log(content);
  return {
    content
  }
}

const mapDispatchtoProps = dispatch => {
  return {

    getData: () => dispatch(getData())
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Article);
