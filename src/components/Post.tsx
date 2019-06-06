import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* Stylesheets */
import '../styles/Post.css';

class Post extends Component<any, any> {

  render() {
  	let { id, subreddit, title, selftext, author, downs, ups, url, fullname, num_comments } = this.props;
    let threadState = {
      subreddit: subreddit,
      title: title,
      selftext: selftext,
      author: author,
      downs: downs,
      ups: ups,
      url: url,
      num_comments: num_comments
    }

    return(
      <>
      	<div className='Post'>
      		<div className='PostHeader'>
            <Link to={{
                pathname: `/thread`,
                state: {threadState}
              }} className='PostTitle'>
              {title}
            </Link>
		      	<p>{author}</p>
		      </div>
      		<div className='PostVotes'>
      			<span className='PostVotesUps'>▲ {ups}</span>
      			<span className='PostVotesDowns'>▼ {downs}</span>
            <Link to={{
                pathname: `/thread`,
                state: {threadState}
              }} className='CommentsLink'>
              {num_comments} Comments
            </Link>
      		</div>
      	</div>
      </>
    );
  }

}

export default Post;
