import React, {Suspense} from 'react';
import { cleanup } from '@testing-library/react'
import App from 'pages/main';

afterEach(cleanup)

describe('Should render root of pages' , () => {
  it('rendered lazily', async () => {
    const root = (
      <Suspense fallback={<div>loading...</div>}>
        <App/>
      </Suspense>
    );

    await App;
    expect(root).toMatchSnapshot();
  })
})
