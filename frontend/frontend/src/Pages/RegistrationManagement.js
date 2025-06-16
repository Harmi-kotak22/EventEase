import React, { useState, useEffect, useCallback } from 'react';
import api from '../Api';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  border-radius: 4px 4px 0 0;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  background: ${props => {
    if (props.approve) return '#28a745';
    if (props.reject) return '#dc3545';
    return '#007bff';
  }};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  background: ${props => {
    switch (props.status) {
      case 'PENDING':
        return '#ffc107';
      case 'CONFIRMED':
        return '#28a745';
      case 'REJECTED':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
  color: white;
`;

const ErrorText = styled.p`
  color: red;
  margin: 10px 0;
`;

const SuccessText = styled.p`
  color: green;
  margin: 10px 0;
`;

function RegistrationManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [participantRequests, setParticipantRequests] = useState([]);
  const [audienceRequests, setAudienceRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [approvedRegistrations, setApprovedRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/events', {
        headers: { Authorization: `Basic ${token}` }
      });
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    }
  }, []);

  const fetchApprovedRegistrations = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const result = {};

      for (const event of events) {
        try {
          const res = await api.get('/registrations', {
            params: { eventId: event.id , status: 'APPROVED'},
            headers: { Authorization: `Basic ${token}` }
          });

          result[event.id] = res.data || [];
        } catch (innerErr) {
          result[event.id] = [];
        }
      }

      setApprovedRegistrations(result);
    } catch (err) {
      setError('Failed to fetch approved registrations');
    }
  }, [events]);

  const fetchRegistrations = useCallback(async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await api.get('/registrations', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });

      const participants = response.data.filter(reg => reg.registrationType === 'PARTICIPANT' && reg.status === 'PENDING');
      const audience = response.data.filter(reg => reg.registrationType === 'AUDIENCE' && reg.status === 'PENDING');

      setParticipantRequests(participants);
      setAudienceRequests(audience);
    } catch (err) {
      setError('Failed to fetch registrations: ' + (err.response?.data?.message || err.message));
    }
  }, []);

  useEffect(() => {
    const loadAll = async () => {
      await fetchEvents();
      await fetchRegistrations();
    };
    loadAll();
  }, [fetchEvents, fetchRegistrations]);

  useEffect(() => {
    if (events.length > 0) {
      fetchApprovedRegistrations();
    }
  }, [events, fetchApprovedRegistrations]);

  const handleUpdateStatus = async (registrationId, newStatus) => {
    try {
      setError('');
      setSuccess('');
      setProcessing(true);

      const token = localStorage.getItem('token');
      await api.patch(`/registrations/${registrationId}`, { status: newStatus }, {
        headers: { Authorization: `Basic ${token}` }
      });

      setSuccess(`Registration ${newStatus.toLowerCase()} successfully`);
      await fetchRegistrations();
      fetchApprovedRegistrations();
    } catch (err) {
      setError('Failed to update registration: ' + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(false);
    }
  };

  const RegistrationCard = ({ registration }) => (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>{registration.event.eventName}</h3>
        <StatusBadge status={registration.status}>{registration.status}</StatusBadge>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p><strong>Student:</strong> {registration.student.username}</p>
        <p><strong>Type:</strong> {registration.registrationType}</p>
        <p><strong>Event Date:</strong> {new Date(registration.event.eventDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {registration.event.eventTime}</p>
        <p><strong>Venue:</strong> {registration.event.venue}</p>
      </div>

      {registration.status === 'PENDING' && (
        <div>
          <Button approve onClick={() => handleUpdateStatus(registration.id, 'APPROVED')} disabled={processing}>
            {processing ? 'Processing...' : 'Approve'}
          </Button>
          <Button reject onClick={() => handleUpdateStatus(registration.id, 'REJECTED')} disabled={processing}>
            {processing ? 'Processing...' : 'Reject'}
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <Container>
      <h1>Manage Registrations</h1>
      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}

      <TabContainer>
        <Tab active={tabValue === 0} onClick={() => setTabValue(0)}>Pending Requests</Tab>
        <Tab active={tabValue === 1} onClick={() => setTabValue(1)}>Approved Registrations</Tab>
      </TabContainer>

      {tabValue === 0 && (
        <>
          <h2>Participant Registration Requests</h2>
          {participantRequests.length > 0 ? (
            participantRequests.map(reg => <RegistrationCard key={reg.id} registration={reg} />)
          ) : (
            <p>No pending participant registrations.</p>
          )}

          <h2>Audience Registration Requests</h2>
          {audienceRequests.length > 0 ? (
            audienceRequests.map(reg => <RegistrationCard key={reg.id} registration={reg} />)
          ) : (
            <p>No pending audience registrations.</p>
          )}
        </>
      )}

      {tabValue === 1 && (
        <>
          <h2>Approved Registrations by Event</h2>
          {events.map(event => {
            const approved = approvedRegistrations[event.id] || [];
            return (
              <Card key={event.id}>
                <h3>{event.eventName}</h3>
                {approved.length > 0 ? (
                  approved.map((reg, i) => (
                    <p key={i}>
                      {reg.student?.username || 'Unknown'} – {reg.registrationType || 'Type'}
                    </p>
                  ))
                ) : (
                  <p>No approved registrations.</p>
                )}
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
}

export default RegistrationManagement;
