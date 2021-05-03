import React from 'react'
import ReactDOM from 'react-dom';
import { rootApp, rootElement } from 'index';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should render without crashing", () => {
    ReactDOM.render(rootApp, rootElement)
    expect(ReactDOM.render).toHaveBeenCalledWith(rootApp, rootElement)
  });
});

