const API_URL = 'https://vernanbackend.ezlab.in/api/contact-us/';

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const ContactUsForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = React.useState({});
  const [submissionStatus, setSubmissionStatus] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    }
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('');

    if (!validateForm()) return;

    setSubmissionStatus('submitting');

    const payload = { ...formData };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="contact-outer">
      <header className="contact-header">
        <h3 className="site-title">V Films</h3>
      </header>

      <div className="contact-wrapper">
        <h2 className="contact-quote">
          “V take art where it belongs, to the people.”
        </h2>
        <div className="quote-underline"></div>

        <div className="contact-container">
          <div className="contact-photo-card">
            <img src="./illustration.png" alt="illustration" />
            <p className="img-caption">Contact Us</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <p className="msg-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <p className="msg-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <p className="msg-error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <p className="msg-error">{errors.message}</p>}
            </div>

            {submissionStatus === 'submitting' && (
              <p className="msg submitting">Submitting...</p>
            )}
            {submissionStatus === 'success' && (
              <p className="msg success">Form Submitted ✅</p>
            )}
            {submissionStatus === 'error' && (
              <p className="msg error">Failed, Try Again ❌</p>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={submissionStatus === 'submitting'}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContactUsForm />);
