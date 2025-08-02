import React, { useState } from 'react';
import './SettingsScreen.css';

const SettingsScreen = ({ user, onNavigate, onLogout, onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock join requests data
  const joinRequests = [
    {
      id: 1,
      organization: "Delta Epsilon Zeta",
      status: "pending",
      date: "2024-03-10",
      message: "Your application is under review"
    },
    {
      id: 2,
      organization: "Computer Science Club",
      status: "approved",
      date: "2024-03-05",
      message: "Welcome to the club!"
    },
    {
      id: 3,
      organization: "Environmental Club",
      status: "denied",
      date: "2024-03-01",
      message: "Unfortunately, we cannot accept your application at this time"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'green';
      case 'denied': return 'red';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'denied': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      last4: '8888',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false
    }
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    brand: ''
  });

  // Enhanced profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "Alex Johnson",
    username: user?.username || "alex.johnson",
    email: user?.email || "alex.johnson@email.com",
    university: user?.university || "University of California, Berkeley",
    organization: user?.organization?.name || user?.organization || "Alpha Beta Gamma",
    year: user?.year || "Junior",
    major: user?.major || "Computer Science",
    bio: user?.bio || "Passionate about technology and Greek life. Currently serving as the chapter's social media coordinator and love organizing events that bring our community together.",
    image: user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [originalProfile, setOriginalProfile] = useState(profileForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [twoFAData, setTwoFAData] = useState({
    phoneNumber: '',
    verificationCode: '',
    step: 'phone' // 'phone' or 'code'
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters!');
      return;
    }
    // In a real app, this would update the password in the backend
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordModal(false);
  };

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setOriginalProfile(profileForm);
      if (onProfileUpdate) onProfileUpdate(profileForm);
      setTimeout(() => setSuccess(false), 2000);
    }, 1000);
  };

  const handleCancel = () => {
    setProfileForm(originalProfile);
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.cardNumber && newPaymentMethod.expiryDate && 
        newPaymentMethod.cvv && newPaymentMethod.cardholderName) {
      const last4 = newPaymentMethod.cardNumber.slice(-4);
      const brand = getCardBrand(newPaymentMethod.cardNumber);
      
      const newMethod = {
        id: Date.now(),
        type: 'card',
        last4,
        brand,
        expiry: newPaymentMethod.expiryDate,
        isDefault: paymentMethods.length === 0
      };
      
      setPaymentMethods([...paymentMethods, newMethod]);
      setNewPaymentMethod({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        brand: ''
      });
      setShowAddPayment(false);
    }
  };

  const getCardBrand = (cardNumber) => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'Mastercard';
    if (cardNumber.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const handle2FAChange = (e) => {
    const { name, value } = e.target;
    setTwoFAData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendCode = () => {
    if (twoFAData.phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    // In a real app, this would send a verification code
    alert(`Verification code sent to ${twoFAData.phoneNumber}`);
    setTwoFAData(prev => ({ ...prev, step: 'code' }));
  };

  const handleVerifyCode = () => {
    if (twoFAData.verificationCode.length !== 6) {
      alert('Please enter the 6-digit verification code');
      return;
    }
    // In a real app, this would verify the code
    alert('Two-factor authentication setup successfully!');
    setShow2FAModal(false);
    setTwoFAData({
      phoneNumber: '',
      verificationCode: '',
      step: 'phone'
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (window.confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        alert('Account deletion initiated. You will be logged out.');
        onLogout();
      }
    }
  };

  return (
    <div className="settings-screen">
      <header className="settings-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Back
        </button>
      </header>

      <div className="settings-container">
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span>
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="tab-icon">📋</span>
            Requests
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <span className="tab-icon">💳</span>
            Payment Methods
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className="tab-icon">🔔</span>
            Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <span className="tab-icon">🔒</span>
            Privacy & Security
          </button>

        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-header">
                <h2>Profile Settings</h2>
                <p>Update your personal information and preferences</p>
              </div>

              <div className="profile-form">
                <div className="profile-picture-group">
                  <img src={profileForm.image} alt="Profile" className="profile-picture-preview" />
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={profileForm.username}
                      onChange={handleProfileChange}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>University</label>
                    <input 
                      type="text"
                      name="university"
                      value={profileForm.university}
                      onChange={handleProfileChange}
                      placeholder="Enter your university"
                    />
                  </div>
                  <div className="form-group">
                    <label>Organization</label>
                    <input 
                      type="text"
                      name="organization"
                      value={profileForm.organization}
                      onChange={handleProfileChange}
                      placeholder="Enter your organization"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Year</label>
                    <select name="year" value={profileForm.year} onChange={handleProfileChange}>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Major</label>
                    <input 
                      type="text"
                      name="major"
                      value={profileForm.major}
                      onChange={handleProfileChange}
                      placeholder="Enter your major"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself"
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button className="save-btn" onClick={handleSaveProfile} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                  <button className="cancel-btn" onClick={handleCancel} disabled={saving}>Cancel</button>
                  {success && <span className="success-message">Profile updated!</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="payments-section">
              <div className="payments-header">
                <h2>Payment Methods</h2>
                <p>Manage your payment methods for events and dues</p>
              </div>

              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <div key={method.id} className="payment-method">
                    <div className="method-info">
                      <div className="method-icon">
                        {method.brand === 'Visa' ? '💳' : method.brand === 'Mastercard' ? '💳' : '💳'}
                      </div>
                      <div className="method-details">
                        <h4>{method.brand} •••• {method.last4}</h4>
                        <p>Expires {method.expiry}</p>
                        {method.isDefault && <span className="default-badge">Default</span>}
                      </div>
                    </div>
                    <div className="method-actions">
                      {!method.isDefault && (
                        <button onClick={() => setDefaultPayment(method.id)}>
                          Set Default
                        </button>
                      )}
                      <button onClick={() => removePaymentMethod(method.id)} className="remove-btn">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!showAddPayment ? (
                <button className="add-payment-btn" onClick={() => setShowAddPayment(true)}>
                  + Add Payment Method
                </button>
              ) : (
                <div className="add-payment-form">
                  <h3>Add New Payment Method</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input 
                        type="text"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text"
                        value={newPaymentMethod.expiryDate}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input 
                        type="text"
                        value={newPaymentMethod.cvv}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input 
                      type="text"
                      value={newPaymentMethod.cardholderName}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardholderName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-actions">
                    <button onClick={handleAddPaymentMethod} className="save-btn">
                      Add Payment Method
                    </button>
                    <button onClick={() => setShowAddPayment(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-section">
              <div className="notifications-header">
                <h2>Notification Settings</h2>
                <p>Choose what notifications you want to receive</p>
              </div>

              <div className="notification-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Event Reminders</h4>
                    <p>Get notified about upcoming events</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>New Messages</h4>
                    <p>Receive notifications for new messages</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Organization Updates</h4>
                    <p>Get updates about your organization</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Payment Reminders</h4>
                    <p>Reminders for dues and payments</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="privacy-section">
              <div className="privacy-header">
                <h2>Privacy & Security</h2>
                <p>Manage your privacy settings and account security</p>
              </div>

              <div className="privacy-settings">
                <div className="privacy-group">
                  <h3>Privacy Settings</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Profile Visibility</h4>
                      <p>Control who can see your profile</p>
                    </div>
                    <select defaultValue="organization" className="privacy-select">
                      <option value="public">Public</option>
                      <option value="organization">Organization Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="privacy-group">
                  <h3>Security Settings</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security</p>
                    </div>
                    <button className="setup-btn" onClick={() => setShow2FAModal(true)}>Setup 2FA</button>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Change Password</h4>
                      <p>Update your account password</p>
                    </div>
                    <button className="setup-btn" onClick={() => setShowPasswordModal(true)}>
                      Change Password
                    </button>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account</p>
                    </div>
                    <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="requests-section">
              <div className="requests-header">
                <h2>Join Requests</h2>
                <p>Track your organization and club membership requests</p>
                <button className="btn btn-primary" onClick={() => onNavigate('events', { defaultTab: 'organizations' })}>
                  Discover New Organizations
                </button>
              </div>

              <div className="requests-list">
                {joinRequests.length > 0 ? (
                  joinRequests.map(request => (
                    <div key={request.id} className={`request-card ${request.status}`}>
                      <div className="request-header">
                        <h4>{request.organization}</h4>
                        <span className={`status-badge ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)} {request.status}
                        </span>
                      </div>
                      <div className="request-details">
                        <p className="request-date">Submitted: {request.date}</p>
                        <p className="request-message">{request.message}</p>
                      </div>
                      {request.status === 'denied' && (
                        <button className="btn btn-secondary">
                          Reapply
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-requests">
                    <p>No join requests found.</p>
                    <p>Start exploring organizations to submit join requests!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Section */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <button className="help-btn" onClick={() => onNavigate('help')}>
          <span className="help-icon">❓</span>
          Help & Support
        </button>
        <p className="help-description">Get help with your account, reset your password, or request new organizations</p>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="change-password-btn" onClick={handleChangePassword}>
                Change Password
              </button>
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="modal-overlay" onClick={() => setShow2FAModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Setup Two-Factor Authentication</h2>
              <button className="modal-close" onClick={() => setShow2FAModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {twoFAData.step === 'phone' ? (
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel"
                    name="phoneNumber"
                    value={twoFAData.phoneNumber}
                    onChange={handle2FAChange}
                    placeholder="Enter your phone number"
                  />
                  <p className="form-help">We'll send a verification code to this number</p>
                </div>
              ) : (
                <div className="form-group">
                  <label>Verification Code</label>
                  <input 
                    type="text"
                    name="verificationCode"
                    value={twoFAData.verificationCode}
                    onChange={handle2FAChange}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                  />
                  <p className="form-help">Enter the 6-digit code sent to your phone</p>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              {twoFAData.step === 'phone' ? (
                <button className="setup-btn" onClick={handleSendCode}>
                  Send Code
                </button>
              ) : (
                <button className="setup-btn" onClick={handleVerifyCode}>
                  Verify Code
                </button>
              )}
              <button className="cancel-btn" onClick={() => setShow2FAModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen; 