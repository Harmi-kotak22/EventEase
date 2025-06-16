// src/pages/FeedbackForm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Api';

function FeedbackForm() {
  const { eventId, userEmail } = useParams();
  const [formData, setFormData] = useState({
    rating: '',
    comments: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback-form', {
        eventId,
        userEmail: decodeURIComponent(userEmail),
        ...formData,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback.');
    }
  };

  if (submitted) return <h2>Thank you for your feedback!</h2>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Feedback Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Rating (1–5):<br />
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            required
            value={formData.rating}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10 }}
          />
        </label>
        <br />
        <label>
          Comments:<br />
          <textarea
            name="comments"
            rows="4"
            value={formData.comments}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10 }}
          />
        </label>
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
