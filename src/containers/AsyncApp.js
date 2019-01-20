import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchPostsIfNeeded,
} from '../redux/actions';
import Posts from '../components/Posts';

class AsyncApp extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPostsIfNeeded('learnprogramming'));
    }

    render() {
        const { posts, isFetching, lastUpdated } = this.props;

        return (
            <div>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty</h2>}
                {posts.length > 0 && (
                    <div>
                        <Posts posts={posts} />
                    </div>
                )}
            </div>
        )
    }
}

// AsyncApp.propTypes = {
//     posts: PropTypes.array.isRequired,
//     dispatch: PropTypes.func.isRequired
// }

function mapStateToProps(state) {
    const { postsBySubreddit } = state;
    const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
        "learnprogramming"
    ] || {
            isFetching: true,
            items: []
        }

    return {
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp);