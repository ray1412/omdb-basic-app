import logo from '../assets/logo.svg';
import '../styles/index.scss';

function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        <p>
          omdb url: &nbsp;
          {process.env.REACT_APP_OMDB_API_URL}
        </p>
      </header>
    </div>
  );
}

export default Main;
