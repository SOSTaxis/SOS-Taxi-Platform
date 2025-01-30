import React, { useState } from 'react';
import './App.css';

// Utility for OTP generation
function generateOTP(length: number = 6): string {
  return Array.from(
    crypto.getRandomValues(new Uint32Array(length))
  ).map(x => (x % 10).toString()).join('');
}

// Validate Indian Phone Number
function validateIndianPhoneNumber(phone: string): boolean {
  // Indian phone number regex: 10 digits, starts with 6-9
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  return indianPhoneRegex.test(phone);
}

function MobileRegistration() {
  const [stage, setStage] = useState<'phone' | 'otp'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    userType: 'passenger',
    generatedOTP: ''
  });

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateIndianPhoneNumber(formData.phone)) {
      alert('Please enter a valid Indian mobile number');
      return;
    }

    // Generate and store OTP
    const otp = generateOTP();
    setFormData(prev => ({ ...prev, generatedOTP: otp }));
    
    console.log(`OTP for ${formData.phone}: ${otp}`);
    
    setStage('otp');
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.otp !== formData.generatedOTP) {
      alert('Invalid OTP. Please try again.');
      return;
    }

    try {
      // Placeholder for user registration logic
      console.log('User registered:', formData);
      alert('Registration Successful! 🚕');
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: 'auto', 
      padding: '20px', 
      backgroundColor: '#f4f4f4',
      borderRadius: '10px'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#FF6D00', 
        fontWeight: 'bold' 
      }}>
        🚕 SOS Taxi Service
      </h2>
      
      {stage === 'phone' && (
        <form onSubmit={handlePhoneSubmit}>
          <div>
            <label>Mobile Number:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                padding: '10px', 
                backgroundColor: '#FF6D00', 
                color: 'white', 
                borderRadius: '4px 0 0 4px' 
              }}>+91</span>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  borderRadius: '0 4px 4px 0' 
                }}
                required 
              />
            </div>
          </div>
          
          <div>
            <label>User Type:</label>
            <select 
              name="userType" 
              value={formData.userType} 
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginTop: '10px' 
              }}
            >
              <option value="passenger">Passenger</option>
              <option value="agent">Travel Agent</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#FF6D00', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              marginTop: '15px' 
            }}
          >
            Send OTP
          </button>
        </form>
      )}

      {stage === 'otp' && (
        <form onSubmit={handleOTPSubmit}>
          <div>
            <label>Enter OTP:</label>
            <input 
              type="text" 
              name="otp" 
              value={formData.otp} 
              onChange={handleChange} 
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginTop: '10px' 
              }}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#FF6D00', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              marginTop: '15px' 
            }}
          >
            Verify
          </button>
        </form>
      )}

      <p style={{ 
        fontSize: '0.8em', 
        color: '#666', 
        textAlign: 'center', 
        marginTop: '15px' 
      }}>
        By registering, you agree to our terms of service
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <MobileRegistration />
    </div>
  );
}

export default App;