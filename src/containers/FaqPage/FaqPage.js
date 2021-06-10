import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from './FaqPage.duck';
import ReactMarkdown from "react-markdown"
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './FaqPage.module.css';

const FaqPage = ({ getData, answer }) => {

  useEffect(() => {

    getData();
  }, [])

  // console.log(content);

  // prettier-ignore
  return (
    <StaticPage
      title="FAQ"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FaqPage',
        description: 'About Saunatime',
        name: 'FAQ page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

            <div className={css.contentMain}>
              
              <ReactMarkdown source={answer && answer} />

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

  const { answer } = state.FaqPage.contents
  // console.log(answer);
  return {
    answer
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getData: () => dispatch(getData())
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(FaqPage);
