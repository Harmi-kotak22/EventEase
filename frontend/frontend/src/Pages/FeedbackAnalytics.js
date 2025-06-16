import React, { useEffect, useState, useCallback } from 'react';
import api from '../Api';
import styled from '@emotion/styled';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* match AdminDashboard */
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

function FeedbackAnalytics() {
  const [feedbackStats, setFeedbackStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const eventsRes = await api.get('/events', {
        headers: { Authorization: `Basic ${token}` }
      });

      const events = eventsRes.data;

      const analytics = await Promise.all(
        events.map(event =>
          api.get(`/feedback-form/analytics/${event.id}`, {
            headers: { Authorization: `Basic ${token}` }
          }).then(res => ({
            eventId: event.id,
            eventName: event.eventName,
            averageRating: res.data.averageRating,
            totalResponses: res.data.totalResponses
          }))
        )
      );

      setFeedbackStats(analytics);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) return <Container>Loading feedback analytics...</Container>;

  return (
    <Container>
      <SectionTitle>Feedback Analytics</SectionTitle>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={feedbackStats}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="eventName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="averageRating" fill="#8884d8" name="Average Rating" />
            <Bar dataKey="totalResponses" fill="#82ca9d" name="Responses" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
}

export default FeedbackAnalytics;
