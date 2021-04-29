import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import 'styles/index.scss';

const ListingPage = lazy(() => import('pages/listing'));
const DetailPage = lazy(() => import('pages/detail'));

const Main = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <ListingPage />
            </Route>
            <Route exact path="/detail/:id">
              <DetailPage />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default Main;
