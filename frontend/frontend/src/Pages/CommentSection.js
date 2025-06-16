import React, { useEffect, useState } from 'react';
import api from '../Api';

const CommentSection = ({ eventId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/event/${eventId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error loading comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/comments/${eventId}`, {
        text: newComment,
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4>Discussion</h4>
      <div>
        {comments.map((c, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
            <strong style={{ color: c.admin ? 'darkred' : 'black' }}>
              {c.admin ? 'Admin' : c.student?.username || 'Unknown'}:
            </strong>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
      <textarea
        rows={3}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment"
        style={{ width: '100%' }}
      />
      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </div>
  );
};

export default CommentSection;
