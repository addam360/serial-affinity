import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/* Stylesheets */
import './styles/App.css';
import './styles/destyle.css'; // reset sane defaults

/* Components */
import PostGrid from './components/PostGrid';
import Thread from './components/Thread';

const App: React.FC = () => {
	/* Router set up for Thread Links */
  return (
    <Router>
    	<div className='App'>

	      <Route exact path='/' component={PostGrid} />
	      <Route path='/thread' component={Thread} />

      </div>
    </Router>
  );
}

export default App;
