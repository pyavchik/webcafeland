import React, { useState } from 'react';
import { Button } from '../';
import useAuth from '../../hooks/useAuth';
import { signInWithGoogle, signOutUser } from '../../services/auth';
import { addDocument, getDocuments } from '../../services/firestore';
import { COLLECTIONS } from '../../utils/constants';
import './FirebaseDemo.css';

const FirebaseDemo = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      setMessage(`✅ Welcome, ${result.user.displayName}!`);
    } else {
      setMessage(`❌ Sign in failed: ${result.error}`);
    }
  };

  const handleSignOut = async () => {
    const result = await signOutUser();
    if (result.success) {
      setMessage('👋 Signed out successfully');
    } else {
      setMessage(`❌ Sign out failed: ${result.error}`);
    }
  };

  const handleAddPost = async () => {
    if (!isAuthenticated) {
      setMessage('❌ Please sign in first');
      return;
    }

    const postData = {
      title: 'Test Post',
      content: 'This is a test post from Web Cafe Land!',
      author: user.displayName || user.email,
      authorId: user.uid,
    };

    const result = await addDocument(COLLECTIONS.POSTS, postData);
    if (result.success) {
      setMessage('✅ Post added successfully!');
      loadPosts(); // Refresh posts
    } else {
      setMessage(`❌ Failed to add post: ${result.error}`);
    }
  };

  const loadPosts = async () => {
    setLoadingPosts(true);
    const result = await getDocuments(COLLECTIONS.POSTS, {
      orderByField: 'createdAt',
      orderDirection: 'desc',
      limitCount: 5,
    });

    if (result.success) {
      setPosts(result.data);
      setMessage(`✅ Loaded ${result.count} posts`);
    } else {
      setMessage(`❌ Failed to load posts: ${result.error}`);
    }
    setLoadingPosts(false);
  };

  if (loading) {
    return (
      <div className="firebase-demo">
        <div className="loading">🔄 Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="firebase-demo">
      <h2>🔥 Firebase Demo</h2>

      {message && <div className="message">{message}</div>}

      <div className="auth-section">
        <h3>Authentication</h3>
        {isAuthenticated ? (
          <div className="user-info">
            <p>
              👤 Signed in as: <strong>{user.displayName || user.email}</strong>
            </p>
            <Button onClick={handleSignOut} variant="danger" size="medium">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="sign-in">
            <p>👋 Sign in to test Firestore operations</p>
            <Button
              onClick={handleGoogleSignIn}
              variant="primary"
              size="medium"
            >
              🔐 Sign in with Google
            </Button>
          </div>
        )}
      </div>

      <div className="firestore-section">
        <h3>Firestore Database</h3>
        <div className="actions">
          <Button
            onClick={handleAddPost}
            variant="success"
            size="medium"
            disabled={!isAuthenticated}
          >
            ➕ Add Test Post
          </Button>
          <Button onClick={loadPosts} variant="secondary" size="medium">
            📄 Load Posts
          </Button>
        </div>

        {loadingPosts && <div className="loading">Loading posts...</div>}

        {posts.length > 0 && (
          <div className="posts">
            <h4>Recent Posts:</h4>
            {posts.map(post => (
              <div key={post.id} className="post">
                <h5>{post.title}</h5>
                <p>{post.content}</p>
                <small>
                  By {post.author} •{' '}
                  {post.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseDemo;
