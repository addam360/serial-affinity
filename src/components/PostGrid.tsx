import React, { Component } from 'react';

/* Stylesheets */
import '../styles/PostGrid.css';

/* Child Components */
import Post from '../components/Post';

class PostGrid extends Component<any, any> {

	/* Initialise Default Values */
	constructor(props: any) {
		super(props);
		this.state = {
			subreddit: 'redditdev',
			posts: [],
			after: ''
		};
	}

	/* Present something at load time - better UX than empty page */
	componentDidMount() {
		this.getPostsFromSubreddit('redditdev', '');
	}

	/* Load More onClick Action */
	getNextPostsFromSubreddit = (e: React.MouseEvent) => {
		this.getPostsFromSubreddit(this.state.subreddit, this.state.after);
	}

	/* Enter Subreddit onChange Action */
	setSubreddit = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			subreddit: e.currentTarget.value,
			after: ''
		}, () => {
			this.getPostsFromSubreddit(this.state.subreddit, '');	
		})
	}

	/* AJAX to reddit API, get post listing */
	getPostsFromSubreddit = (subreddit: string, after: string) => {
		/* Set API URL with CORS */
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const redditUrl = `https://reddit.com/r/${subreddit}/hot.json?after=${after}`;

		/* GET method */
		fetch(proxyUrl + redditUrl)
		.then(response => {
			return response.json();
		})
		.then(results => {

			/* Initialise defaults, returned in case of error */
			let posts = [];
			let after = '';

			/* Handling for Error response from Reddit API */
			if(results.error != null) {
				posts = [];
				after = '';
			} else {
				let listing = results.data.children;
				
				/* Iterate through all posts, return Post component array */
				posts = listing.map((post: any) => {
	  			let { id, subreddit, title, selftext, author, downs, ups, url, num_comments } = post.data;
					let fullname=`${post.kind}_${id}`;
					return(
						<Post key={id}
							id={id}
							subreddit={subreddit}
							title={title}
							selftext={selftext}
							author={author}
							ups={ups}
							downs={downs}
							url={url}
							fullname={fullname}
							num_comments={num_comments}
						/>
					)
				})

				/* Error Handling on Empty Posts List */
				if(posts.length > 0) {
					/* Set 'after' value for pagination */
					after = posts[posts.length-1].props.fullname;
				} else {
					after = '';		
				}
			}

			/* Update state with new Posts */
			this.setState({
				subreddit: subreddit,
				posts: posts,
				after: after
			});

			/* Scroll to new posts for smooth UX */
			window.scrollTo(0,0);

		})
	}

  render() {
    return(
      <>
      	<form className='SubredditSearch'>
      		Enter a Subreddit: <input type='text' 
      			ref= 'subreddit'
      			name='subreddit'
      			placeholder='redditdev'
      			onChange={this.setSubreddit}
      		/>
      	</form>

      	<div className='PostGrid'>
      		{this.state.posts}
      		<button className='LoadMoreButton' 
      			onClick={this.getNextPostsFromSubreddit}>
      			Load more Posts
      		</button>
      	</div>
      </>
    );
  }

}

export default PostGrid;
