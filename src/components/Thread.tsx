import React, { Component } from 'react';

/* Stylesheets */
import '../styles/Thread.css';
import '../styles/Post.css';
import { Link } from 'react-router-dom';

class Thread extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      subreddit: 'Subreddit',
      title: 'Title',
      selftext: 'Lorem Ipsum',
      author: 'Anonymous',
      downs: 0,
      ups: 0,
      url: '',
      num_comments: 0
    };
  }

  componentDidMount() {
    /* Get state from Post */
    this.setState(this.props.location.state.threadState, () => {
      console.log(this.state.threadState);
    });
  }

  render() {
    
    let { subreddit, title, author, selftext, downs, ups, url, num_comments } = this.state;
    return(
      <>
        <div className='ThreadContainer'>
          <h2 className='ThreadSubreddit'>{subreddit}</h2>
          <Link to={url} className='ThreadTitle'>{title}</Link>
          <h2 className='ThreadAuthor'>by {author}</h2>
          <p className='ThreadSelftext'>{selftext}</p>
          <div className='PostVotes'>
            <span className='PostVotesUps'>▲ {ups}</span>
            <span className='PostVotesDowns'>▼ {downs}</span>
            <Link to={url} className='CommentsLink'>
              {num_comments} Comments
            </Link>
          </div>
        </div>
      </>
    );
  }

}

export default Thread;
