import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removePost, goToPage } from './redux/postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const { currentPosts, totalPages, currentPage, loading } = useSelector(state => state.posts);
  const [inputPage, setInputPage] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRemovePost = (postId) => {
    dispatch(removePost(postId));
  };

  const handlePageClick = (pageNum) => {
    dispatch(goToPage(pageNum));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(goToPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(goToPage(currentPage - 1));
    }
  };

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(inputPage, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      dispatch(goToPage(pageNum));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const date = new Date().toUTCString();

  const pageNumbers = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div>
      <div className="posts-grid">
        {currentPosts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title.slice(0, 55)}...</h3>
            <p>{post.body.slice(0, 55)}...</p>
            <p>{date}</p>
            <img src='https://images.pexels.com/photos/27778938/pexels-photo-27778938/free-photo-of-neon-lights.jpeg?auto=compress&cs=tinysrgb&w=600&h=150&dpr=1' alt="Post" />
            <button onClick={() => handleRemovePost(post.id)}>❌</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePrevPage}>{"<<"}</button>
        )}

        <div className="page-buttons">
          {pageNumbers.map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={pageNum === currentPage ? 'active' : ''}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {currentPage < totalPages && (
          <button onClick={handleNextPage}>{">>"}</button>
        )}

        {/* Uncomment this block if you want to include page input */}
        {/* <form onSubmit={handlePageInputSubmit} className="page-input-form">
          <input
            type="number"
            value={inputPage}
            onChange={handlePageInputChange}
            min="1"
            max={totalPages}
            placeholder="Go to page"
          />
          <button type="submit">Go</button>
        </form> */}
      </div>
    </div>
  );
};

export default Posts;

