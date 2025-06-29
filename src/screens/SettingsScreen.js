import React, { useState } from 'react';
import './SettingsScreen.css';

const SettingsScreen = ({ userData, onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');
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
    name: userData?.name || "Alex Johnson",
    email: userData?.email || "alex.johnson@email.com",
    university: userData?.university || "University of California, Berkeley",
    organization: userData?.organization || "Alpha Beta Gamma",
    year: userData?.year || "Junior",
    major: userData?.major || "Computer Science",
    minor: userData?.minor || "Mathematics",
    phone: userData?.phone || "(555) 123-4567",
    address: userData?.address || "123 Greek Row, University City, ST 12345",
    bio: userData?.bio || "Passionate about technology and Greek life. Currently serving as the chapter's social media coordinator and love organizing events that bring our community together.",
    interests: userData?.interests || ["Technology", "Leadership", "Community Service", "Networking"],
    skills: userData?.skills || ["Event Planning", "Social Media Management", "Public Speaking", "Team Leadership"]
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addInterest = () => {
    const newInterest = prompt("Enter a new interest:");
    if (newInterest && newInterest.trim()) {
      setProfileForm(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
    }
  };

  const removeInterest = (index) => {
    setProfileForm(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    const newSkill = prompt("Enter a new skill:");
    if (newSkill && newSkill.trim()) {
      setProfileForm(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
    }
  };

  const removeSkill = (index) => {
    setProfileForm(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    alert("Profile updated successfully!");
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

  const formatCardNumber = (number) => {
    return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="settings-screen">
      <header className="settings-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Settings</h1>
        <p>Manage your account preferences and payment methods</p>
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
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="form-input"
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
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Organization</label>
                    <input 
                      type="text" 
                      name="organization"
                      value={profileForm.organization}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Year</label>
                    <select
                      name="year"
                      value={profileForm.year}
                      onChange={handleProfileChange}
                      className="form-input"
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Major</label>
                    <input 
                      type="text" 
                      name="major"
                      value={profileForm.major}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Minor</label>
                    <input 
                      type="text" 
                      name="minor"
                      value={profileForm.minor}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      placeholder="(555) 123-4567"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <textarea 
                      name="address"
                      value={profileForm.address}
                      onChange={handleProfileChange}
                      className="form-textarea"
                      rows="2"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself..."
                    className="form-textarea"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Interests</label>
                  <div className="tags-container">
                    {profileForm.interests.map((interest, index) => (
                      <span key={index} className="tag">
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(index)}
                          className="tag-remove"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button type="button" onClick={addInterest} className="btn btn-secondary add-tag">
                      + Add Interest
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Skills</label>
                  <div className="tags-container">
                    {profileForm.skills.map((skill, index) => (
                      <span key={index} className="tag">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="tag-remove"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button type="button" onClick={addSkill} className="btn btn-secondary add-tag">
                      + Add Skill
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={onBack}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="payments-section">
              <div className="payments-header">
                <h2>Payment Methods</h2>
                <p>Manage your payment methods for events and donations</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddPayment(true)}
                >
                  + Add Payment Method
                </button>
              </div>

              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <div key={method.id} className="payment-method-card">
                    <div className="payment-method-info">
                      <div className="card-icon">
                        {method.brand === 'Visa' ? '💳' : 
                         method.brand === 'Mastercard' ? '💳' : '💳'}
                      </div>
                      <div className="card-details">
                        <h4>{method.brand} •••• {method.last4}</h4>
                        <p>Expires {method.expiry}</p>
                        {method.isDefault && <span className="default-badge">Default</span>}
                      </div>
                    </div>
                    
                    <div className="payment-method-actions">
                      {!method.isDefault && (
                        <button 
                          className="btn btn-outline"
                          onClick={() => setDefaultPayment(method.id)}
                        >
                          Set Default
                        </button>
                      )}
                      <button 
                        className="btn btn-danger"
                        onClick={() => removePaymentMethod(method.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="payment-features">
                <h3>Payment Features</h3>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🎫</div>
                    <h4>Event Tickets</h4>
                    <p>Purchase tickets for campus events and activities</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🎁</div>
                    <h4>Donations</h4>
                    <p>Support your favorite organizations and causes</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🏪</div>
                    <h4>Merchandise</h4>
                    <p>Buy official organization merchandise and gear</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h4>Transaction History</h4>
                    <p>View all your payment history and receipts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-section">
              <div className="notifications-header">
                <h2>Notification Preferences</h2>
                <p>Choose how you want to be notified about events and updates</p>
              </div>

              <div className="notification-settings">
                <div className="notification-group">
                  <h3>Event Notifications</h3>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>New Events</h4>
                      <p>Get notified when new events are posted</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Event Reminders</h4>
                      <p>Receive reminders for events you're attending</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Event Updates</h4>
                      <p>Get notified about changes to events</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="notification-group">
                  <h3>Organization Updates</h3>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>New Members</h4>
                      <p>When new members join your organization</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Group Messages</h4>
                      <p>New messages in organization group chats</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
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
                  <h3>Profile Visibility</h3>
                  <div className="privacy-item">
                    <div className="privacy-info">
                      <h4>Public Profile</h4>
                      <p>Allow other users to see your profile information</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="privacy-item">
                    <div className="privacy-info">
                      <h4>Show Online Status</h4>
                      <p>Display when you're active on the platform</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="privacy-group">
                  <h3>Security</h3>
                  <div className="security-item">
                    <div className="security-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn btn-outline">Enable</button>
                  </div>
                  <div className="security-item">
                    <div className="security-info">
                      <h4>Change Password</h4>
                      <p>Update your account password</p>
                    </div>
                    <button className="btn btn-outline">Change</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="modal-overlay" onClick={() => setShowAddPayment(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Payment Method</h3>
              <button className="close-btn" onClick={() => setShowAddPayment(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="payment-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formatCardNumber(newPaymentMethod.cardNumber)}
                    onChange={(e) => setNewPaymentMethod({
                      ...newPaymentMethod,
                      cardNumber: e.target.value.replace(/\s/g, '')
                    })}
                    maxLength="19"
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={newPaymentMethod.expiryDate}
                      onChange={(e) => setNewPaymentMethod({
                        ...newPaymentMethod,
                        expiryDate: e.target.value
                      })}
                      maxLength="5"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={newPaymentMethod.cvv}
                      onChange={(e) => setNewPaymentMethod({
                        ...newPaymentMethod,
                        cvv: e.target.value
                      })}
                      maxLength="4"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={newPaymentMethod.cardholderName}
                    onChange={(e) => setNewPaymentMethod({
                      ...newPaymentMethod,
                      cardholderName: e.target.value
                    })}
                    className="form-input"
                  />
                </div>

                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={() => setShowAddPayment(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleAddPaymentMethod}>
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen; 