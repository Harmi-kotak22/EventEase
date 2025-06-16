// import React, { useState, useEffect, useCallback } from 'react';
// import api from '../Api';
// import styled from '@emotion/styled';
// import ParticipantForm from './ParticipantForm';
// import StudentProfile from './StudentProfile';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const TabContainer = styled.div`
//   border-bottom: 1px solid #ddd;
//   margin-bottom: 20px;
// `;

// const Tab = styled.button`
//   padding: 10px 20px;
//   margin-right: 10px;
//   border: none;
//   background: ${props => (props.active ? '#007bff' : 'transparent')};
//   color: ${props => (props.active ? 'white' : '#333')};
//   cursor: pointer;
//   border-radius: 4px 4px 0 0;
//   &:focus {
//     outline: 2px solid #0056b3;
//   }
// `;

// const Card = styled.div`
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   padding: 20px;
//   margin-bottom: 20px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const Button = styled.button`
//   padding: 8px 16px;
//   margin-right: 10px;
//   border: ${props => (props.outlined ? '1px solid #007bff' : 'none')};
//   background: ${props => (props.outlined ? 'transparent' : '#007bff')};
//   color: ${props => (props.outlined ? '#007bff' : 'white')};
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover:not(:disabled) {
//     opacity: 0.9;
//   }
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const ErrorText = styled.p`
//   color: red;
//   margin: 10px 0;
// `;

// const SuccessText = styled.p`
//   color: green;
//   margin: 10px 0;
// `;

// function StudentDashboard() {
  // const [tabValue, setTabValue] = useState(0);
  // const [events, setEvents] = useState([]);
  // const [registeredEvents, setRegisteredEvents] = useState([]);
  // const [participatingEvents, setParticipatingEvents] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  // const [registering, setRegistering] = useState(false);
  // const [showForm, setShowForm] = useState(false);
  // const [selectedEventId, setSelectedEventId] = useState(null);

  // // Clear messages on tab change
  // const handleTabChange = (index) => {
  //   setTabValue(index);
  //   setError('');
  //   setSuccess('');
  // };

  // const fetchEvents = useCallback(async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await api.get('/events', {
  //       headers: { Authorization: `Basic ${token}` }
  //     });
  //     setEvents(response.data);
  //   } catch (err) {
  //     setError('Failed to fetch events');
  //     console.error(err);
  //   }
  // }, []);

  // const fetchRegisteredEvents = useCallback(async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const user = JSON.parse(localStorage.getItem('user'));

  //     if (!token || !user) {
  //       setError('Authentication required. Please log in again.');
  //       return;
  //     }

  //     const response = await api.get('/registrations', {
  //       headers: { Authorization: `Basic ${token}` }
  //     });

  //     // Filter registrations for the current user
  //     const userRegistrations = response.data.filter(reg =>
  //       reg.student && reg.student.username === user.username
  //     );

  //     // Separate participant and audience registrations based on registration type
  //     const participating = userRegistrations.filter(reg => reg.registrationType === 'PARTICIPANT');
  //     const attending = userRegistrations.filter(reg => reg.registrationType === 'AUDIENCE');

  //     setParticipatingEvents(participating);
  //     setRegisteredEvents(attending);
  //   } catch (err) {
  //     console.error('Failed to fetch registrations:', err.response?.data);
  //     setError('Failed to fetch registered events: ' + (err.response?.data?.message || err.message));
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchEvents();
  //   fetchRegisteredEvents();
  // }, [fetchEvents, fetchRegisteredEvents]);

  // // Auto-clear error and success after 5 seconds
  // useEffect(() => {
  //   if (error || success) {
  //     const timer = setTimeout(() => {
  //       setError('');
  //       setSuccess('');
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [error, success]);

  // const handleRegister = async (eventId, type) => {
  //   try {
  //     setError('');
  //     setSuccess('');
  //     setRegistering(true);

  //     const token = localStorage.getItem('token');
  //     const user = JSON.parse(localStorage.getItem('user'));

  //     if (!token || !user) {
  //       setError('Authentication required. Please log in again.');
  //       setRegistering(false);
  //       return;
  //     }

  //     const registration = {
  //       status: 'PENDING',
  //       registrationType: type, // 'PARTICIPANT' or 'AUDIENCE'
  //       event: { id: eventId },
  //       student: { username: user.username }
  //     };

  //     if (type === 'PARTICIPANT') {
  //       setSelectedEventId(eventId);
  //       setShowForm(true);
  //       return; // delay actual registration until form is submitted
  //     }
  //     await api.post('/registrations', registration, {
  //       headers: { Authorization: `Basic ${token}` }
  //     });

  //     setSuccess(`Registration submitted as ${type.toLowerCase()}, waiting for confirmation`);

  //     // Refresh registrations
  //     await fetchRegisteredEvents();

  //     // Switch to the appropriate tab
  //     if (type === 'PARTICIPANT') setTabValue(1);
  //     else setTabValue(2);
  //   } catch (err) {
  //     console.error('Registration error:', err.response?.data);
  //     setError('Failed to register for event: ' + (err.response?.data?.message || err.message));
  //   } finally {
  //     setRegistering(false);
  //   }
  // };

  // const handleParticipantSubmit = async (participantData) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const user = JSON.parse(localStorage.getItem('user'));

  //     if (!token || !user) {
  //       setError('Authentication required. Please log in again.');
  //       return;
  //     }

  //     const registration = {
  //       status: 'PENDING',
  //       registrationType: 'PARTICIPANT',
  //       event: { id: selectedEventId },
  //       student: { username: user.username }
  //     };

  //     // First create registration
  //     await api.post('/registrations', registration, {
  //       headers: { Authorization: `Basic ${token}` }
  //     });

  //     // Then submit participant details
  //     await api.post(`/participants/event/${selectedEventId}`, participantData, {
  //       headers: { Authorization: `Basic ${token}` }
  //     });

  //     setSuccess('Registered as participant. Waiting for confirmation.');
  //     setTabValue(1);
  //     await fetchRegisteredEvents();
  //   } catch (err) {
  //     console.error('Error submitting participant info:', err.response?.data);
  //     setError('Failed to register: ' + (err.response?.data?.message || err.message));
  //   } finally {
  //     setRegistering(false);
  //     setShowForm(false);
  //   }
  // };


  // // Filter events not yet registered as participant or audience
  // const availableEvents = events.filter(event =>
  //   !participatingEvents.some(reg => reg.event.id === event.id) &&
  //   !registeredEvents.some(reg => reg.event.id === event.id)
  // );

  // // Check if user is already registered for event to disable buttons
  // const isRegistered = (eventId) =>
  //   participatingEvents.some(reg => reg.event.id === eventId) ||
  //   registeredEvents.some(reg => reg.event.id === eventId);

  // const EventCard = ({ event, registration, showRegisterButton = true }) => {
  //   // Format time nicely
  //   const formattedTime = event.eventTime
  //     ? new Date(`1970-01-01T${event.eventTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     : '';

  //   return (
  //     <Card>
  //       <h3>{event.eventName}</h3>
  //       <p>{event.description}</p>
  //       <div style={{ marginBottom: '10px' }}>
  //         <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
  //         <br />
  //         <strong>Time:</strong> {formattedTime}
  //         <br />
  //         <strong>Venue:</strong> {event.venue}
  //         {registration && (
  //           <>
  //             <br />
  //             <strong>Status:</strong> {registration.status}
  //           </>
  //         )}
  //       </div>
  //       {showRegisterButton && (
  //         <div>
  //           <Button
  //             onClick={() => handleRegister(event.id, 'PARTICIPANT')}
  //             disabled={registering || isRegistered(event.id)}
  //             aria-disabled={registering || isRegistered(event.id)}
  //             aria-label={`Register as participant for ${event.eventName}`}
  //           >
  //             {registering ? 'Registering...' : 'Register as Participant'}
  //           </Button>
  //           <Button
  //             outlined
  //             onClick={() => handleRegister(event.id, 'AUDIENCE')}
  //             disabled={registering || isRegistered(event.id)}
  //             aria-disabled={registering || isRegistered(event.id)}
  //             aria-label={`Register as audience for ${event.eventName}`}
  //           >
  //             {registering ? 'Registering...' : 'Register as Audience'}
  //           </Button>
  //         </div>
  //       )}
  //     </Card>
  //   );
  // };

//   if (loading) return <Container>Loading...</Container>;

//   return (
//     <Container>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '20px'
//       }}>
//         <h1>Student Dashboard</h1>
//         <StudentProfile />
//       </div>
      

//       {error && <ErrorText role="alert">{error}</ErrorText>}
//       {success && <SuccessText role="status">{success}</SuccessText>}

//       <TabContainer role="tablist" aria-label="Event categories">
//         <Tab
//           role="tab"
//           aria-selected={tabValue === 0}
//           tabIndex={tabValue === 0 ? 0 : -1}
//           active={tabValue === 0}
//           onClick={() => handleTabChange(0)}
//         >
//           Available Events
//         </Tab>
//         <Tab
//           role="tab"
//           aria-selected={tabValue === 1}
//           tabIndex={tabValue === 1 ? 0 : -1}
//           active={tabValue === 1}
//           onClick={() => handleTabChange(1)}
//         >
//           My Participations
//         </Tab>
//         <Tab
//           role="tab"
//           aria-selected={tabValue === 2}
//           tabIndex={tabValue === 2 ? 0 : -1}
//           active={tabValue === 2}
//           onClick={() => handleTabChange(2)}
//         >
//           Events I'm Attending
//         </Tab>
//       </TabContainer>

//       <div hidden={tabValue !== 0}>
//         <h2>Available Events</h2>
//         {availableEvents.length > 0 ? (
//           availableEvents.map(event => (
//             <EventCard key={event.id} event={event} />
//           ))
//         ) : (
//           <p>No available events to register.</p>
//         )}
//       </div>

//       <div hidden={tabValue !== 1}>
//         <h2>Events I'm Participating In</h2>
//         {participatingEvents.length > 0 ? (
//           participatingEvents.map(registration => (
//             <EventCard
//               key={registration.event.id}
//               event={registration.event}
//               registration={registration}
//               showRegisterButton={false}
//             />
//           ))
//         ) : (
//           <p>You haven't registered as a participant for any events yet.</p>
//         )}
//       </div>

//       <div hidden={tabValue !== 2}>
//         <h2>Events I'm Attending</h2>
//         {registeredEvents.length > 0 ? (
//           registeredEvents.map(registration => (
//             <EventCard
//               key={registration.event.id}
//               event={registration.event}
//               registration={registration}
//               showRegisterButton={false}
//             />
//           ))
//         ) : (
//           <p>You haven't registered as an audience for any events yet.</p>
//         )}
//       </div>
//       <ParticipantForm
//         open={showForm}
//         onClose={() => setShowForm(false)}
//         eventId={selectedEventId}
//         onSubmit={handleParticipantSubmit}
//       />

//     </Container>

//   );
// }

// export default StudentDashboard;
import React, { useState, useEffect, useCallback } from 'react';
import api from '../Api';
import styled from '@emotion/styled';
import ParticipantForm from './ParticipantForm';
import StudentProfile from './StudentProfile';
import CommentSection from './CommentSection';

const Page = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 20px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 12px 20px;
  margin-right: 10px;
  border: none;
  background: ${({ active }) => (active ? '#007bff' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: background 0.3s;

  &:hover {
    background: ${({ active }) => (active ? '#0056b3' : '#eee')};
  }

  &:focus {
    outline: 2px solid #0056b3;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 16px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  padding: 10px 18px;
  margin-right: 10px;
  border: ${({ outlined }) => (outlined ? '1px solid #007bff' : 'none')};
  background: ${({ outlined }) => (outlined ? 'white' : '#007bff')};
  color: ${({ outlined }) => (outlined ? '#007bff' : 'white')};
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ outlined }) => (outlined ? '#f0f8ff' : '#0056b3')};
    border-color: #0056b3;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #b00020;
  background: #ffe5e5;
  padding: 10px 15px;
  border-radius: 6px;
  margin: 10px 0;
`;

const SuccessText = styled.p`
  color: #0a7d32;
  background: #e6ffed;
  padding: 10px 15px;
  border-radius: 6px;
  margin: 10px 0;
`;
const lightTheme = {
  background: '#fff',
  text: '#000',
  cardBg: '#f9f9f9',
  border: '#ddd',
};

const darkTheme = {
  background: '#121212',
  text: '#fff',
  cardBg: '#1e1e1e',
  border: '#333',
};





function StudentDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [participatingEvents, setParticipatingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registering, setRegistering] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [eventCountdowns, setEventCountdowns] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
const [activeCommentEventId, setActiveCommentEventId] = useState(null);
const user = JSON.parse(localStorage.getItem('user')); 

  const theme = {
  background: darkMode ? '#121212' : '#f9f9f9',
  text: darkMode ? '#ffffff' : '#000000',
  cardBackground: darkMode ? '#1e1e1e' : '#ffffff',
  borderColor: darkMode ? '#333' : '#ddd',
};

  const [isDarkMode, setIsDarkMode] = useState(() => {
  return localStorage.getItem('theme') === 'dark';
});

useEffect(() => {
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}, [isDarkMode]);


  // Clear messages on tab change
  const handleTabChange = (index) => {
    setTabValue(index);
    setError('');
    setSuccess('');
  };
const getEventStatus = (eventDate, eventTime) => {
  const now = new Date();
  const start = new Date(`${eventDate}T${eventTime}`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours event

  if (now < start) {
    const diff = start - now;
    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    return { status: 'Upcoming', countdown: `${hours}:${minutes}:${seconds}` };
  } else if (now >= start && now <= end) {
    return { status: 'Live Now' };
  } else {
    return { status: 'Ended' };
  }
};

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/events', {
        headers: { Authorization: `Basic ${token}` }
      });
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    }
  }, []);

  const fetchRegisteredEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        setError('Authentication required. Please log in again.');
        return;
      }

      const response = await api.get('/registrations', {
        headers: { Authorization: `Basic ${token}` }
      });

      // Filter registrations for the current user
      const userRegistrations = response.data.filter(reg =>
        reg.student && reg.student.username === user.username
      );

      // Separate participant and audience registrations based on registration type
      const participating = userRegistrations.filter(reg => reg.registrationType === 'PARTICIPANT');
      const attending = userRegistrations.filter(reg => reg.registrationType === 'AUDIENCE');

      setParticipatingEvents(participating);
      setRegisteredEvents(attending);
    } catch (err) {
      console.error('Failed to fetch registrations:', err.response?.data);
      setError('Failed to fetch registered events: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, [fetchEvents, fetchRegisteredEvents]);

  // Auto-clear error and success after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);
useEffect(() => {
  const interval = setInterval(() => {
    const countdowns = {};
    events.forEach(event => {
      countdowns[event.id] = getEventStatus(event.eventDate, event.eventTime);
    });
    setEventCountdowns(countdowns);
  }, 1000);
  return () => clearInterval(interval);
}, [events]);

  const handleRegister = async (eventId, type) => {
    try {
      setError('');
      setSuccess('');
      setRegistering(true);

      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        setError('Authentication required. Please log in again.');
        setRegistering(false);
        return;
      }

      const registration = {
        status: 'PENDING',
        registrationType: type, // 'PARTICIPANT' or 'AUDIENCE'
        event: { id: eventId },
        student: { username: user.username }
      };

      if (type === 'PARTICIPANT') {
        setSelectedEventId(eventId);
        setShowForm(true);
        return; // delay actual registration until form is submitted
      }
      await api.post('/registrations', registration, {
        headers: { Authorization: `Basic ${token}` }
      });

      setSuccess(`Registration submitted as ${type.toLowerCase()}, waiting for confirmation`);

      // Refresh registrations
      await fetchRegisteredEvents();

      // Switch to the appropriate tab
      if (type === 'PARTICIPANT') setTabValue(1);
      else setTabValue(2);
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      setError('Failed to register for event: ' + (err.response?.data?.message || err.message));
    } finally {
      setRegistering(false);
    }
  };

  const handleParticipantSubmit = async (participantData) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        setError('Authentication required. Please log in again.');
        return;
      }

      const registration = {
        status: 'PENDING',
        registrationType: 'PARTICIPANT',
        event: { id: selectedEventId },
        student: { username: user.username }
      };

      // First create registration
      await api.post('/registrations', registration, {
        headers: { Authorization: `Basic ${token}` }
      });

      // Then submit participant details
      await api.post(`/participants/event/${selectedEventId}`, participantData, {
        headers: { Authorization: `Basic ${token}` }
      });

      setSuccess('Registered as participant. Waiting for confirmation.');
      setTabValue(1);
      await fetchRegisteredEvents();
    } catch (err) {
      console.error('Error submitting participant info:', err.response?.data);
      setError('Failed to register: ' + (err.response?.data?.message || err.message));
    } finally {
      setRegistering(false);
      setShowForm(false);
    }
  };


  // Filter events not yet registered as participant or audience
  const availableEvents = events.filter(event =>
    !participatingEvents.some(reg => reg.event.id === event.id) &&
    !registeredEvents.some(reg => reg.event.id === event.id)
  );
  const filteredEvents = availableEvents.filter(event =>
  event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  event.venue.toLowerCase().includes(searchQuery.toLowerCase())
);


  // Check if user is already registered for event to disable buttons
  const isRegistered = (eventId) =>
    participatingEvents.some(reg => reg.event.id === eventId) ||
    registeredEvents.some(reg => reg.event.id === eventId);

 const EventCard = ({ event, registration, showRegisterButton = true, eventCountdowns }) => {

    // Format time nicely
    const formattedTime = event.eventTime
      ? new Date(`1970-01-01T${event.eventTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    return (
      
      <Card theme={theme}>
        
        <h3>{event.eventName}</h3>
        <p>{event.description}</p>
        <div style={{ marginBottom: '10px' }}>
          <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
          <br />
          <strong>Time:</strong> {formattedTime}
          <br />
          <strong>Venue:</strong> {event.venue}
          {eventCountdowns?.[event.id]?.status === 'Upcoming' && (
  <>
    <br />
    <strong>Starts in:</strong> {eventCountdowns[event.id].countdown}
  </>
)}
{eventCountdowns?.[event.id]?.status === 'Live Now' && (
  <>
    <br />
    <strong style={{ color: 'green' }}>Status: Live Now</strong>
  </>
)}
{eventCountdowns?.[event.id]?.status === 'Ended' && (
  <>
    <br />
    <strong style={{ color: 'red' }}>Status: Ended</strong>
  </>
)}

          {registration && (
            <>
              <br />
              <strong>Status:</strong> {registration.status}
            </>
          )}
        </div>
        {showRegisterButton && (
          <div>
            
            <Button
              onClick={() => handleRegister(event.id, 'PARTICIPANT')}
              disabled={registering || isRegistered(event.id)}
              aria-disabled={registering || isRegistered(event.id)}
              aria-label={`Register as participant for ${event.eventName}`}
            >
              {registering ? 'Registering...' : 'Register as Participant'}
            </Button>
            <Button
              outlined
              onClick={() => handleRegister(event.id, 'AUDIENCE')}
              disabled={registering || isRegistered(event.id)}
              aria-disabled={registering || isRegistered(event.id)}
              aria-label={`Register as audience for ${event.eventName}`}
            >
              {registering ? 'Registering...' : 'Register as Audience'}
            </Button>
            <Button
  onClick={() => setActiveCommentEventId(event.id)}
  aria-label={`Open discussion for ${event.eventName}`}
>
  View Discussion
</Button>
          </div>
        )}
       

      </Card>
     

    );
  };

  if (loading) return <Page><Container>Loading...</Container></Page>;

  return (
    <Page>
      <Container theme={theme}>
        <Header>
  <h1>Student Dashboard</h1>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Button onClick={() => setDarkMode(prev => !prev)} outlined>
      Toggle {darkMode ? 'Light' : 'Dark'} Mode
    </Button>
    <StudentProfile />
  </div>
</Header>

        {error && <ErrorText role="alert">{error}</ErrorText>}
        {success && <SuccessText role="status">{success}</SuccessText>}

        <TabContainer role="tablist" aria-label="Event categories">
        
          <Tab
            role="tab"
            aria-selected={tabValue === 0}
            tabIndex={tabValue === 0 ? 0 : -1}
            active={tabValue === 0}
            onClick={() => handleTabChange(0)}

            
          >
          

            Available Events
          </Tab>
          <Tab
            role="tab"
            aria-selected={tabValue === 1}
            tabIndex={tabValue === 1 ? 0 : -1}
            active={tabValue === 1}
            onClick={() => handleTabChange(1)}
          >
            My Participations
          </Tab>
          <Tab
            role="tab"
            aria-selected={tabValue === 2}
            tabIndex={tabValue === 2 ? 0 : -1}
            active={tabValue === 2}
            onClick={() => handleTabChange(2)}
          >
            Events I'm Attending
          </Tab>
        </TabContainer>

        <div hidden={tabValue !== 0}>
          <SectionTitle>Available Events</SectionTitle>
          <input
    type="text"
    placeholder="Search events..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
      padding: '8px',
      width: '100%',
      marginBottom: '20px',
      border: `1px solid ${theme.borderColor}`,
      borderRadius: '4px',
      backgroundColor: theme.cardBackground,
      color: theme.text
    }}
  />

  {filteredEvents.length > 0 ? (
    filteredEvents.map(event => (
      <EventCard key={event.id} event={event} />
    ))
  ) : (
    <p>No matching events found.</p>
  )}
          
        </div>

        <div hidden={tabValue !== 1}>
          <SectionTitle>Events I'm Participating In</SectionTitle>
          {participatingEvents.length > 0 ? (
            participatingEvents.map(registration => (
              <EventCard
                key={registration.event.id}
                event={registration.event}
                eventCountdowns={eventCountdowns}
                registration={registration}
                showRegisterButton={false}
              />
             
              
            ))
          ) : (
            <p>You haven't registered as a participant for any events yet.</p>
          )}
        </div>

        <div hidden={tabValue !== 2}>
          <SectionTitle>Events I'm Attending</SectionTitle>
          {registeredEvents.length > 0 ? (
            registeredEvents.map(registration => (
              <EventCard
                key={registration.event.id}
                event={registration.event}
                registration={registration}
                showRegisterButton={false}
                eventCountdowns={eventCountdowns}
              />
            ))
          ) : (
            <p>You haven't registered as an audience for any events yet.</p>
          )}
        </div>

        <ParticipantForm
          open={showForm}
          onClose={() => setShowForm(false)}
          eventId={selectedEventId}
          onSubmit={handleParticipantSubmit}
        />
        {activeCommentEventId && (
  <div style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
    <h3>Discussion for Selected Event</h3>
    <CommentSection eventId={activeCommentEventId} user={JSON.parse(localStorage.getItem('user'))} />
    <Button onClick={() => setActiveCommentEventId(null)} style={{ marginTop: '10px' }}>
      Close Discussion
    </Button>
  </div>
)}

      </Container>
    </Page>
  );
}

export default StudentDashboard;
