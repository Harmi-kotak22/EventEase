import React, { useEffect, useState } from 'react';
import api from '../Api';

const AdminCommentSection = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/event/${eventId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  const handlePost = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/comments/${eventId}`, {
        text: newComment,
        admin: "true"

      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error posting admin comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4>Comments & Announcements</h4>
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
        placeholder="Write an admin comment or announcement"
        style={{ width: '100%' }}
      />
      <button onClick={handlePost} disabled={submitting}>
        {submitting ? 'Posting...' : 'Post as Admin'}
      </button>
    </div>
  );
};

export default AdminCommentSection;
