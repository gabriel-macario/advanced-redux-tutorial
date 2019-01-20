import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from '../redux/actions';
import Posts from '../components/Posts';
import Picker from '../components/Picker';

const pickerOptions = ['reactjs', 'frontend', 'learnprogramming']

class AsyncApp extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = this.props;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handlePickerChange = (nextSubreddit) => {
        this.props.dispatch(selectSubreddit(nextSubreddit));
        this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
    }

    handleRefreshClick = (event) => {
        event.preventDefault();

        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    render() {
        const { posts, selectedSubreddit, isFetching, lastUpdated } = this.props;

        return (
            <div>
                <Picker
                    value={selectedSubreddit}
                    onChange={this.handlePickerChange}
                    options={pickerOptions} 
                />
                <p>
                    {lastUpdated && (
                        <span>
                            last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
                        </span>

                    )}
                    {!isFetching && (
                        <button onClick={this.handleRefreshClick}>Refresh</button>
                    )}
                </p>
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

AsyncApp.propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }
  

function mapStateToProps(state) {
    const { postsBySubreddit, selectedSubreddit } = state;
    const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit
    ] || {
            isFetching: true,
            items: []
        }

    return {
        posts,
        isFetching,
        lastUpdated,
        selectedSubreddit
    }
}

export default connect(mapStateToProps)(AsyncApp);