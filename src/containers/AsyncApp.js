import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from '../redux/actions';
import Posts from '../components/Posts';

class AsyncApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPostsIfNeeded('learnprogramming'));
    }

    render() {
        const { posts, isFetching, lastUpdated } = this.props;
        return (
            <div>
                {/* {posts.length > 0 && (
                    <div>
                        <Posts posts={posts} />
                    </div>
                )} */}
                Test
            </div>
        )
    }
}

// AsyncApp.propTypes = {
//     posts: PropTypes.array.isRequired,
//     dispatch: PropTypes.func.isRequired
// }

// function mapStateToProps(state) {
//     const { selectedSubreddit, postsBySubreddit } = state;
// }

export default connect()(AsyncApp);