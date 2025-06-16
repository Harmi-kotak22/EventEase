// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import api from '../Api';
// // import styled from '@emotion/styled';

// // const Container = styled.div`
// //   max-width: 1200px;
// //   margin: 0 auto;
// //   padding: 20px;
// // `;

// // const NavContainer = styled.div`
// //   display: flex;
// //   gap: 20px;
// //   margin-bottom: 30px;
// //   border-bottom: 1px solid #ddd;
// //   padding-bottom: 10px;
// // `;

// // const NavButton = styled.button`
// //   padding: 10px 20px;
// //   background: ${props => props.active ? '#007bff' : 'transparent'};
// //   color: ${props => props.active ? 'white' : '#007bff'};
// //   border: 1px solid #007bff;
// //   border-radius: 4px;
// //   cursor: pointer;
// //   &:hover {
// //     opacity: 0.9;
// //   }
// // `;

// // const Card = styled.div`
// //   border: 1px solid #ddd;
// //   border-radius: 8px;
// //   padding: 20px;
// //   margin-bottom: 20px;
// //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// // `;

// // const Button = styled.button`
// //   padding: 8px 16px;
// //   margin-right: 10px;
// //   border: none;
// //   background: ${props => props.approve ? '#28a745' : props.reject ? '#dc3545' : '#007bff'};
// //   color: white;
// //   border-radius: 4px;
// //   cursor: pointer;
// //   &:hover {
// //     opacity: 0.9;
// //   }
// //   &:disabled {
// //     opacity: 0.6;
// //     cursor: not-allowed;
// //   }
// // `;

// // const ErrorText = styled.p`
// //   color: red;
// // `;

// // const SuccessText = styled.p`
// //   color: green;
// // `;

// // function AdminDashboard() {
// //   const navigate = useNavigate();
// //   const [events, setEvents] = useState([]);
// //   const [pendingRegistrations, setPendingRegistrations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [processingId, setProcessingId] = useState(null);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [showCreateForm, setShowCreateForm] = useState(false);


// //   const [newEvent, setNewEvent] = useState({
// //     eventName: '',
// //     description: '',
// //     eventDate: '',
// //     eventTime: '',
// //     venue: ''
// //   });

// //   useEffect(() => {
// //     fetchEvents();
// //     fetchPendingRegistrations();
// //   }, []);

// //   const fetchEvents = async () => {
// //     try {
// //       setError('');
// //       const token = localStorage.getItem('token');
// //       const response = await api.get('/events', {
// //         headers: { Authorization: `Basic ${token}` }
// //       });
// //       setEvents(response.data);
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to fetch events.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPendingRegistrations = async () => {
// //     try {
// //       setError('');
// //       const token = localStorage.getItem('token');
// //       const response = await api.get('/registrations?status=PENDING', {
// //         headers: { Authorization: `Basic ${token}` }
// //       });
// //       setPendingRegistrations(response.data);
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to fetch pending registrations.');
// //     }
// //   };

// //   const handleUpdateStatus = async (registrationId, newStatus) => {
// //     try {
// //       setProcessingId(registrationId);
// //       setError('');
// //       setSuccess('');
// //       const token = localStorage.getItem('token');
// //       await api.patch(`/registrations/${registrationId}`, { status: newStatus }, {
// //         headers: { Authorization: `Basic ${token}` }
// //       });
// //       setSuccess(`Registration ${newStatus.toLowerCase()} successfully.`);
// //       await fetchPendingRegistrations();
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to update registration status.');
// //     } finally {
// //       setProcessingId(null);
// //     }
// //   };

// //   const handleCreateEventClick = () => {
// //     setShowCreateForm(true);
// //     setError('');
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewEvent(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleCreateEventSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem('token');
// //       await api.post('/events', newEvent, {
// //         headers: { Authorization: `Basic ${token}` }
// //       });
// //       setShowCreateForm(false);
// //       setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
// //       fetchEvents();
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to create event');
// //     }
// //   };

// //   const handleCancelCreate = () => {
// //     setShowCreateForm(false);
// //     setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
// //     setError('');
// //   };

// //   if (loading) return <Container>Loading...</Container>;

// //   return (
// //     <Container>
// //       <h1>Admin Dashboard</h1>

// //       <NavContainer>
// //         <NavButton onClick={() => navigate('/admin/generate-code')}>Generate Registration Code</NavButton>
// //         <NavButton onClick={() => navigate('/registration-management')}>Manage Registrations</NavButton>
// //         <NavButton onClick={handleCreateEventClick}>Create New Event</NavButton>
// //       </NavContainer>

// //       {error && <ErrorText role="alert">{error}</ErrorText>}
// //       {success && <SuccessText role="status">{success}</SuccessText>}

// //       {showCreateForm && (
// //         <Card>
// //           <h3>Create New Event</h3>
// //           <form onSubmit={handleCreateEventSubmit}>
// //             <input
// //               type="text"
// //               name="eventName"
// //               placeholder="Event Name"
// //               value={newEvent.eventName}
// //               onChange={handleInputChange}
// //               required
// //               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// //             />
// //             <textarea
// //               name="description"
// //               placeholder="Description"
// //               value={newEvent.description}
// //               onChange={handleInputChange}
// //               style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
// //             />
// //             <input
// //               type="date"
// //               name="eventDate"
// //               value={newEvent.eventDate}
// //               onChange={handleInputChange}
// //               required
// //               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// //             />
// //             <input
// //               type="time"
// //               name="eventTime"
// //               value={newEvent.eventTime}
// //               onChange={handleInputChange}
// //               required
// //               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// //             />
// //             <input
// //               type="text"
// //               name="venue"
// //               placeholder="Venue"
// //               value={newEvent.venue}
// //               onChange={handleInputChange}
// //               required
// //               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// //             />
// //             <Button type="submit">Create Event</Button>
// //             <Button type="button" onClick={handleCancelCreate}>Cancel</Button>
// //           </form>
// //         </Card>
// //       )}

// //       <h2>All Events</h2>
// //       {events.map(event => (
// //         <Card key={event.id}>
// //           <h3>{event.eventName}</h3>
// //           <p>{event.description}</p>
// //           <div>
// //             <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
// //             <br />
// //             <strong>Time:</strong> {event.eventTime}
// //             <br />
// //             <strong>Venue:</strong> {event.venue}
// //           </div>
// //         </Card>
// //       ))}

// //       <h2>Pending Registrations</h2>
// //       {pendingRegistrations.length === 0 ? (
// //         <p>No pending registration requests.</p>
// //       ) : (
// //         pendingRegistrations.map(reg => (
// //           <Card key={reg.id}>
// //             <p><strong>Event:</strong> {reg.event?.eventName || 'Event data unavailable'}</p>
// //             <p><strong>Student:</strong> {reg.student?.username || 'Unknown student'}</p>
// //             <p><strong>Type:</strong> {reg.registrationType || 'Unknown'}</p>
// //             <p><strong>Status:</strong> {reg.status || 'Unknown'}</p>
// //             <Button
// //               approve
// //               disabled={processingId === reg.id}
// //               onClick={() => handleUpdateStatus(reg.id, 'APPROVED')}
// //             >
// //               {processingId === reg.id ? 'Processing...' : 'Approve'}
// //             </Button>
// //             <Button
// //               reject
// //               disabled={processingId === reg.id}
// //               onClick={() => handleUpdateStatus(reg.id, 'REJECTED')}
// //             >
// //               {processingId === reg.id ? 'Processing...' : 'Reject'}
// //             </Button>
// //           </Card>
// //         ))
// //       )}
// //     </Container>
// //   );
// // }

// // export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../Api';
// import styled from '@emotion/styled';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const NavContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 30px;
//   border-bottom: 1px solid #ddd;
//   padding-bottom: 10px;
// `;

// const NavButton = styled.button`
//   padding: 10px 20px;
//   background: ${props => props.active ? '#007bff' : 'transparent'};
//   color: ${props => props.active ? 'white' : '#007bff'};
//   border: 1px solid #007bff;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
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
//   border: none;
//   background: ${props => props.approve ? '#28a745' : props.reject ? '#dc3545' : '#007bff'};
//   color: white;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
//   }
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const ErrorText = styled.p`
//   color: red;
// `;

// const SuccessText = styled.p`
//   color: green;
// `;

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);
//   const [pendingRegistrations, setPendingRegistrations] = useState([]);
//   const [approvedRegistrations, setApprovedRegistrations] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   const [newEvent, setNewEvent] = useState({
//     eventName: '',
//     description: '',
//     eventDate: '',
//     eventTime: '',
//     venue: ''
//   });

//   useEffect(() => {
//     const loadAllData = async () => {
//       try {
//         setLoading(true);
//         await fetchEvents();
//         await fetchPendingRegistrations();
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadAllData();
//   }, []);

//   useEffect(() => {
//     if (events.length > 0) {
//       fetchApprovedRegistrations();
//       console.log('Approved Registrations:', approvedRegistrations);

//     }
//   }, [events]);

//   const fetchEvents = async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('token');
//       const response = await api.get('/events', {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setEvents(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch events.');
//     }
//   };

//   const fetchPendingRegistrations = async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('token');
//       const response = await api.get('/registrations?status=PENDING', {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setPendingRegistrations(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch pending registrations.');
//     }
//   };

//   const fetchApprovedRegistrations = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const result = {};

//       for (const event of events) {
//         try {
//           const res = await api.get('/registrations/approved', {
//             params: { event_id: event.id },
//             headers: { Authorization: `Basic ${token}` }
//           });
//           result[event.id] = res.data;
//         } catch (innerErr) {
//           console.warn(`Failed to fetch approved for event ${event.id}`);
//         }
//       }

//       setApprovedRegistrations(result);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch approved registrations.');
//     }
//   };

//   const handleUpdateStatus = async (registrationId, newStatus) => {
//     try {
//       setProcessingId(registrationId);
//       setError('');
//       setSuccess('');
//       const token = localStorage.getItem('token');
//       await api.patch(`/registrations/${registrationId}`, { status: newStatus }, {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setSuccess(`Registration ${newStatus.toLowerCase()} successfully.`);
//       await fetchPendingRegistrations();
//       await fetchApprovedRegistrations();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to update registration status.');
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleCreateEventClick = () => {
//     setShowCreateForm(true);
//     setError('');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCreateEventSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await api.post('/events', newEvent, {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setShowCreateForm(false);
//       setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
//       await fetchEvents();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to create event.');
//     }
//   };

//   const handleCancelCreate = () => {
//     setShowCreateForm(false);
//     setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
//     setError('');
//   };

//   if (loading) return <Container>Loading...</Container>;

//   return (
//     <Container>
//       <h1>Admin Dashboard</h1>

//       <NavContainer>
//         <NavButton onClick={() => navigate('/admin/generate-code')}>Generate Registration Code</NavButton>
//         <NavButton onClick={() => navigate('/registration-management')}>Manage Registrations</NavButton>
//         <NavButton onClick={handleCreateEventClick}>Create New Event</NavButton>
//       </NavContainer>

//       {error && <ErrorText role="alert">{error}</ErrorText>}
//       {success && <SuccessText role="status">{success}</SuccessText>}

//       {showCreateForm && (
//         <Card>
//           <h3>Create New Event</h3>
//           <form onSubmit={handleCreateEventSubmit}>
//             <input
//               type="text"
//               name="eventName"
//               placeholder="Event Name"
//               value={newEvent.eventName}
//               onChange={handleInputChange}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={newEvent.description}
//               onChange={handleInputChange}
//               style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
//             />
//             <input
//               type="date"
//               name="eventDate"
//               value={newEvent.eventDate}
//               onChange={handleInputChange}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//             <input
//               type="time"
//               name="eventTime"
//               value={newEvent.eventTime}
//               onChange={handleInputChange}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//             <input
//               type="text"
//               name="venue"
//               placeholder="Venue"
//               value={newEvent.venue}
//               onChange={handleInputChange}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//             <Button type="submit">Create Event</Button>
//             <Button type="button" onClick={handleCancelCreate}>Cancel</Button>
//           </form>
//         </Card>
//       )}

//       <h2>All Events</h2>
//       {events.map(event => (
//         <Card key={event.id}>
//           <h3>{event.eventName}</h3>
//           <p>{event.description}</p>
//           <div>
//             <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}<br />
//             <strong>Time:</strong> {event.eventTime}<br />
//             <strong>Venue:</strong> {event.venue}
//           </div>
//           {approvedRegistrations[event.id] && approvedRegistrations[event.id].length > 0 && (
//             <div style={{ marginTop: '15px' }}>
//               <h4>Approved Students:</h4>
//               {approvedRegistrations[event.id].map((reg, i) => (
//                 <p key={i}>{reg.student?.username || 'Unknown'} – {reg.registrationType}</p>
//               ))}
//             </div>
//           )}
//         </Card>
//       ))}

//       <h2>Pending Registrations</h2>
//       {pendingRegistrations.length === 0 ? (
//         <p>No pending registration requests.</p>
//       ) : (
//         pendingRegistrations.map(reg => (
//           <Card key={reg.id}>
//             <p><strong>Event:</strong> {reg.event?.eventName || 'Event data unavailable'}</p>
//             <p><strong>Student:</strong> {reg.student?.username || 'Unknown student'}</p>
//             <p><strong>Type:</strong> {reg.registrationType || 'Unknown'}</p>
//             <p><strong>Status:</strong> {reg.status || 'Unknown'}</p>
//             <Button
//               approve
//               disabled={processingId === reg.id}
//               onClick={() => handleUpdateStatus(reg.id, 'APPROVED')}
//             >
//               {processingId === reg.id ? 'Processing...' : 'Approve'}
//             </Button>
//             <Button
//               reject
//               disabled={processingId === reg.id}
//               onClick={() => handleUpdateStatus(reg.id, 'REJECTED')}
//             >
//               {processingId === reg.id ? 'Processing...' : 'Reject'}
//             </Button>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// }

// export default AdminDashboard;
// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../Api';
// import styled from '@emotion/styled';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const NavContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 30px;
//   border-bottom: 1px solid #ddd;
//   padding-bottom: 10px;
// `;

// const NavButton = styled.button`
//   padding: 10px 20px;
//   background: ${props => props.active ? '#007bff' : 'transparent'};
//   color: ${props => props.active ? 'white' : '#007bff'};
//   border: 1px solid #007bff;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
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
//   border: none;
//   background: ${props => props.approve ? '#28a745' : props.reject ? '#dc3545' : '#007bff'};
//   color: white;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
//   }
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const ErrorText = styled.p`
//   color: red;
// `;

// const SuccessText = styled.p`
//   color: green;
// `;

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);
//   const [pendingRegistrations, setPendingRegistrations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [approvedRegistrations, setApprovedRegistrations] = useState({});
//   const [newEvent, setNewEvent] = useState({
//     eventName: '',
//     description: '',
//     eventDate: '',
//     eventTime: '',
//     venue: ''
//   });

//   const fetchEvents = useCallback(async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('token');
//       const response = await api.get('/events', {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setEvents(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch events.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchPendingRegistrations = useCallback(async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('token');
//       const response = await api.get('/registrations', {
//         params: { status: 'PENDING' },
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setPendingRegistrations(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch pending registrations.');
//     }
//   }, []);

//   const fetchApprovedRegistrations = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const result = {};

//       for (const event of events) {
//         try {
//           const res = await api.get('/registrations/approved', {
//             params: { eventId: event.id },
//             headers: { Authorization: `Basic ${token}` }
//           });

//           result[String(event.id)] = res.data || [];
//         } catch (innerErr) {
//           console.error(`Error fetching approved for event ${event.id}:`, innerErr);
//           result[String(event.id)] = [];
//         }
//       }

//       setApprovedRegistrations(result);
//     } catch (err) {
//       console.error('Failed to fetch approved registrations:', err);
//       setError('Failed to fetch approved registrations.');
//     }
//   }, [events]);

//   useEffect(() => {
//     const loadInitial = async () => {
//       await fetchEvents();
//       await fetchPendingRegistrations();
//     };
//     loadInitial();
//   }, [fetchEvents, fetchPendingRegistrations]);

//   useEffect(() => {
//     if (events.length > 0) {
//       fetchApprovedRegistrations();
//     }
//   }, [events, fetchApprovedRegistrations]);

//   const handleUpdateStatus = async (registrationId, newStatus) => {
//     try {
//       setProcessingId(registrationId);
//       setError('');
//       setSuccess('');
//       const token = localStorage.getItem('token');
//       await api.patch(`/registrations/${registrationId}`, { status: newStatus }, {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setSuccess(`Registration ${newStatus.toLowerCase()} successfully.`);
//       await fetchPendingRegistrations();
//       fetchApprovedRegistrations();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to update registration status.');
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleCreateEventClick = () => {
//     setShowCreateForm(true);
//     setError('');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCreateEventSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await api.post('/events', newEvent, {
//         headers: { Authorization: `Basic ${token}` }
//       });
//       setShowCreateForm(false);
//       setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
//       await fetchEvents();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to create event');
//     }
//   };

//   const handleCancelCreate = () => {
//     setShowCreateForm(false);
//     setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
//     setError('');
//   };

//   if (loading) return <Container>Loading...</Container>;

//   return (
//     <Container>
//       <h1>Admin Dashboard</h1>

//       <NavContainer>
//         <NavButton onClick={() => navigate('/admin/generate-code')}>Generate Registration Code</NavButton>
//         <NavButton onClick={() => navigate('/registration-management')}>Manage Registrations</NavButton>
//         <NavButton onClick={handleCreateEventClick}>Create New Event</NavButton>
//       </NavContainer>

//       {error && <ErrorText role="alert">{error}</ErrorText>}
//       {success && <SuccessText role="status">{success}</SuccessText>}

//       {showCreateForm && (
//         <Card>
//           <h3>Create New Event</h3>
//           <form onSubmit={handleCreateEventSubmit}>
//             <input type="text" name="eventName" placeholder="Event Name" value={newEvent.eventName} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
//             <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }} />
//             <input type="date" name="eventDate" value={newEvent.eventDate} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
//             <input type="time" name="eventTime" value={newEvent.eventTime} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
//             <input type="text" name="venue" placeholder="Venue" value={newEvent.venue} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
//             <Button type="submit">Create Event</Button>
//             <Button type="button" onClick={handleCancelCreate}>Cancel</Button>
//           </form>
//         </Card>
//       )}

//       <h2>All Events</h2>
//       {events.map(event => (
//         <Card key={event.id}>
//           <h3>{event.eventName}</h3>
//           <p>{event.description}</p>
//           <div>
//             <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}<br />
//             <strong>Time:</strong> {event.eventTime}<br />
//             <strong>Venue:</strong> {event.venue}

//             {approvedRegistrations[String(event.id)]?.length > 0 && (
//               <div style={{ marginTop: '15px' }}>
//                 <h4>Approved Students:</h4>
//                 {approvedRegistrations[String(event.id)].map((reg, i) => (
//                   <p key={i}>
//                     {reg.student?.username || 'Unknown'} – {reg.registrationType || 'Unknown Type'}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       ))}

//       <h2>Pending Registrations</h2>
//       {pendingRegistrations.length === 0 ? (
//         <p>No pending registration requests.</p>
//       ) : (
//         pendingRegistrations.map(reg => (
//           <Card key={reg.id}>
//             <p><strong>Event:</strong> {reg.event?.eventName || 'Event data unavailable'}</p>
//             <p><strong>Student:</strong> {reg.student?.username || 'Unknown student'}</p>
//             <p><strong>Type:</strong> {reg.registrationType || 'Unknown'}</p>
//             <p><strong>Status:</strong> {reg.status || 'Unknown'}</p>
//             <Button approve disabled={processingId === reg.id} onClick={() => handleUpdateStatus(reg.id, 'APPROVED')}>
//               {processingId === reg.id ? 'Processing...' : 'Approve'}
//             </Button>
//             <Button reject disabled={processingId === reg.id} onClick={() => handleUpdateStatus(reg.id, 'REJECTED')}>
//               {processingId === reg.id ? 'Processing...' : 'Reject'}
//             </Button>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// }

// export default AdminDashboard;
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';
import styled from '@emotion/styled';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import AdminCommentSection from './AdminCommentSection';
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* match landing page aesthetic */
  min-height: 100vh;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#007bff'};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${props =>
    props.approve ? '#28a745' :
    props.reject ? '#dc3545' :
    '#007bff'};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  min-height: 80px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
`;

const ErrorText = styled.p`
  color: red;
`;

const SuccessText = styled.p`
  color: green;
`;

function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
  const [feedbackStats, setFeedbackStats] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });

  const fetchEvents = useCallback(async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await api.get('/events', { headers: { Authorization: `Basic ${token}` } });
      setEvents(response.data);
      await fetchAnalytics(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAnalytics = async (eventsList) => {
    try {
      const token = localStorage.getItem('token');
      const analytics = await Promise.all(eventsList.map(event =>
        api.get(`/feedback-form/analytics/${event.id}`, {
          headers: { Authorization: `Basic ${token}` }
        }).then(res => ({
          eventId: event.id,
          eventName: event.eventName,
          averageRating: res.data.averageRating,
          totalResponses: res.data.totalResponses
        }))
      ));
      setFeedbackStats(analytics);
    } catch (err) {
      console.error('Error fetching feedback analytics:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEventClick = () => {
    setShowCreateForm(true);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/events', newEvent, { headers: { Authorization: `Basic ${token}` } });
      setShowCreateForm(false);
      setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
      await fetchEvents();
    } catch (err) {
      console.error(err);
      setError('Failed to create event');
    }
  };

  const handleDownloadReport = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/event-reports/${eventId}/report`, {
        headers: { Authorization: `Basic ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `event_${eventId}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      setError('Failed to download report.');
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setNewEvent({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
    setError('');
  };

  const handleSendFeedback = async (eventId) => {
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      await api.post(`registrations/events/${eventId}/send-feedback`, {}, {
        headers: { Authorization: `Basic ${token}` }
      });
      setSuccess('Feedback forms sent successfully.');
    } catch (err) {
      console.error(err);
      setError('Failed to send feedback forms.');
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormData({ ...event });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`/events/${editEvent.id}`, formData, {
        headers: { Authorization: `Basic ${token}` }
      });
      setEditEvent(null);
      setSuccess('Event updated successfully.');
      await fetchEvents();
    } catch (err) {
      console.error(err);
      setError('Failed to update event.');
    }
  };

  const handleCancelEdit = () => {
    setEditEvent(null);
    setFormData({ eventName: '', description: '', eventDate: '', eventTime: '', venue: '' });
    setError('');
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/events/${eventId}`, {
        headers: { Authorization: `Basic ${token}` }
      });
      setSuccess('Event deleted successfully.');
      await fetchEvents();
    } catch (err) {
      console.error(err);
      setError('Failed to delete the event.');
    }
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <h1>Admin Dashboard</h1>

      <NavContainer>
        <NavButton onClick={() => navigate('/admin/generate-code')}>Generate Registration Code</NavButton>
        <NavButton onClick={() => navigate('/registration-management')}>Manage Registrations</NavButton>
        <NavButton onClick={handleCreateEventClick}>Create New Event</NavButton>
        <NavButton onClick={() => navigate('/admin/feedback-analytics')}>Feedback Analytics</NavButton>
      </NavContainer>

      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}

      {showCreateForm && (
        <Card>
          <SectionTitle>Create New Event</SectionTitle>
          <form onSubmit={handleCreateEventSubmit}>
            <Input type="text" name="eventName" placeholder="Event Name" value={newEvent.eventName} onChange={handleInputChange} required />
            <Textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleInputChange} />
            <Input type="date" name="eventDate" value={newEvent.eventDate} onChange={handleInputChange} required />
            <Input type="time" name="eventTime" value={newEvent.eventTime} onChange={handleInputChange} required />
            <Input type="text" name="venue" placeholder="Venue" value={newEvent.venue} onChange={handleInputChange} required />
            <Button type="submit">Create Event</Button>
            <Button type="button" onClick={handleCancelCreate}>Cancel</Button>
          </form>
        </Card>
      )}

      {editEvent && (
        <Card>
          <SectionTitle>Edit Event</SectionTitle>
          <form onSubmit={submitUpdate}>
            <Input type="text" name="eventName" value={formData.eventName} onChange={handleEditInputChange} required />
            <Textarea name="description" value={formData.description} onChange={handleEditInputChange} />
            <Input type="date" name="eventDate" value={formData.eventDate} onChange={handleEditInputChange} required />
            <Input type="time" name="eventTime" value={formData.eventTime} onChange={handleEditInputChange} required />
            <Input type="text" name="venue" value={formData.venue} onChange={handleEditInputChange} required />
            <Button type="submit">Update Event</Button>
            <Button type="button" onClick={handleCancelEdit}>Cancel</Button>
          </form>
        </Card>
      )}

      {events.map(event => (
        <Card key={event.id}>
          <SectionTitle>{event.eventName}</SectionTitle>
          <p>{event.description}</p>
          <div>
            <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}<br />
            <strong>Time:</strong> {event.eventTime}<br />
            <strong>Venue:</strong> {event.venue}
          </div>
          <ButtonGroup>
            <Button onClick={() => handleEdit(event)}>Edit</Button>
            <Button reject onClick={() => handleDelete(event.id)}>Delete</Button>
            <Button onClick={() => handleSendFeedback(event.id)}>Send Feedback Form</Button>
            <Button onClick={() => handleDownloadReport(event.id)}>Download Report</Button>
          </ButtonGroup>
            <AdminCommentSection eventId={event.id} />
        </Card>
      ))}
    </Container>
  );
}

export default AdminDashboard;



