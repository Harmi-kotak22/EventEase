import React, { useState } from 'react';
import styled from '@emotion/styled';
import api from '../Api';

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 500px;
  width: 90%;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: ${props => props.primary ? 'none' : '1px solid #007bff'};
  background: ${props => props.primary ? '#007bff' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#007bff'};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin: 10px 0;
`;

function ParticipantForm({ open, onClose, eventId, onSubmit }) {
  const [formData, setFormData] = useState({
    teamName: '',
    eventTopic: '',
    submissionLink: '',
    additionalInfo: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/participants/event/${eventId}`, formData);
      onSubmit(response.data);
      onClose();
    } catch (err) {
       console.error('Error submitting participant info:', {
    message: err.message,
    response: err.response,
    status: err.response?.status,
    data: err.response?.data,
    stack: err.stack
  });
      setError(err.response?.data?.message || 'Failed to submit participant information');
    }
  };

  if (!open) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Dialog>
        <h2>Participant Information</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              name="teamName"
              placeholder="Team Name (Optional)"
              value={formData.teamName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              name="eventTopic"
              placeholder="Event Topic"
              value={formData.eventTopic}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              name="submissionLink"
              placeholder="Submission Link (Optional)"
              value={formData.submissionLink}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextArea
              name="additionalInfo"
              placeholder="Additional Information"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>
          {error && <ErrorText>{error}</ErrorText>}
          <ButtonContainer>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" primary>
              Submit
            </Button>
          </ButtonContainer>
        </Form>
      </Dialog>
    </>
  );
}

export default ParticipantForm; 