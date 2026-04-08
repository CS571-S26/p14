import React, { useState } from 'react';
import './AboutPage.css';

const values = [
  {
    icon: '🗺️',
    title: 'Curated Destinations',
    desc: 'Each location is carefully selected and richly described to give you a genuine sense of what awaits.',
  },
  {
    icon: '📖',
    title: 'Personal Bookmarks',
    desc: 'Save your favorite destinations and build your own China travel wishlist, accessible anytime.',
  },
  {
    icon: '💬',
    title: 'Community Voices',
    desc: 'Share your thoughts, experiences, and recommendations with fellow travelers from around the world.',
  },
  {
    icon: '🌟',
    title: 'Genuine Inspiration',
    desc: 'We aim to kindle real curiosity and excitement about the wonders China has to offer every visitor.',
  },
];

function AboutPage() {
  const [form, setForm] = useState({ name: '', email: '', type: 'suggest', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', type: 'suggest', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <h1>About Discover China</h1>
        <p>Bringing the beauty of China closer to the world, one destination at a time</p>
      </div>

      <div className="about-body">

        {/* Mission */}
        <section className="about-split mission-section">
          <div className="split-image">
            <img src="https://picsum.photos/seed/about-mission/700/460" alt="China landscape" />
          </div>
          <div className="split-text">
            <h2>Our Mission</h2>
            <p>
              Discover China was born from a deep love for one of the world's most extraordinary countries.
              China's landscapes range from the tropical rainforests of Yunnan to the ice-bound peaks of Tibet,
              from bustling neon-lit megacities to remote villages where ancient traditions still thrive.
            </p>
            <p>
              Our mission is simple: to inspire travelers to explore the incredible diversity of China,
              and to serve as your personal bookmark for the places you dream of visiting.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="values-section">
          <h2 className="values-title">What We Offer</h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="about-split story-section">
          <div className="split-text">
            <h2>Our Story</h2>
            <p>
              We are a team of travel enthusiasts, cultural explorers, and digital storytellers who believe
              that China deserves more visitors. This website was built to bridge the gap between curiosity
              and action — to take you from <em>"I've heard about the Great Wall"</em> to
              <em>"I'm booking my trip to the Mutianyu section in October."</em>
            </p>
            <p>
              Whether you're planning your first trip or your tenth, whether you're drawn to ancient history
              or stunning natural landscapes, we hope Discover China becomes your go-to inspiration guide.
            </p>
          </div>
          <div className="split-image">
            <img src="https://picsum.photos/seed/about-story/700/460" alt="Travel inspiration" />
          </div>
        </section>

        {/* Contact form */}
        <section className="contact-section">
          <div className="contact-header">
            <h2>Get In Touch</h2>
            <p>Suggest a place, ask a question, or just say hello — we'd love to hear from you.</p>
          </div>

          {submitted ? (
            <div className="success-card">
              <div className="success-icon">✅</div>
              <h3>Thank you, {form.name}!</h3>
              <p>We've received your message and will follow up at <strong>{form.email}</strong>.</p>
              <button className="another-btn" onClick={resetForm}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row two-col">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Message Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-control">
                  <option value="suggest">Suggest a Destination</option>
                  <option value="question">Ask a Question</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about a place you'd love to see featured, ask us anything, or share your thoughts…"
                  className="form-control form-textarea"
                  rows={6}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
