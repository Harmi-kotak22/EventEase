import React, { useState } from 'react';
import api from '../Api';

function GenerateCode() {
    const [codes, setCodes] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const generateNewCode = async () => {
        try {
            setError('');
            setSuccess('');
            
            const response = await api.post('/auth/generate-code');
            
            setCodes(prevCodes => [...prevCodes, {
                code: response.data.code,
                expiryDate: new Date(response.data.expiryDate).toLocaleString()
            }]);
            setSuccess('New registration code generated successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to generate code. Please try again.');
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '40px auto',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: 'white'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px'
    };

    const codeListStyle = {
        listStyle: 'none',
        padding: 0
    };

    const codeItemStyle = {
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between'
    };

    const errorStyle = {
        color: 'red',
        marginBottom: '1rem'
    };

    const successStyle = {
        color: 'green',
        marginBottom: '1rem'
    };

    return (
        <div style={containerStyle}>
            <h2>Generate Registration Codes</h2>
            
            {error && <p style={errorStyle}>{error}</p>}
            {success && <p style={successStyle}>{success}</p>}

            <button style={buttonStyle} onClick={generateNewCode}>
                Generate New Code
            </button>

            <h3>Generated Codes:</h3>
            <ul style={codeListStyle}>
                {codes.map((codeData, index) => (
                    <li key={index} style={codeItemStyle}>
                        <span><strong>Code:</strong> {codeData.code}</span>
                        <span><strong>Expires:</strong> {codeData.expiryDate}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenerateCode;