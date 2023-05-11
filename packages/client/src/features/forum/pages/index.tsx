import MainPageTemplate from '@/components/MainPageTemplate';
import { Fragment, FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import Thread from './Thread';
import ThreadList from './ThreadList';

const ForumPages: FunctionComponent = () => {
  return (
    <Fragment>
      <MainPageTemplate>
        <Routes>
          <Route path="/:id" element={<Thread />} />
          <Route path="*" element={<ThreadList />} />
        </Routes>
      </MainPageTemplate>
    </Fragment>
  );
};

export default ForumPages;
