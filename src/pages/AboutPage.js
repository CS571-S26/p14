import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import PageHero from '../components/PageHero';
import './AboutPage.css';

const EMAILJS_SERVICE_ID  = 'service_ho3q1ml';
const EMAILJS_TEMPLATE_ID = 'template_bpaq6s7';
const EMAILJS_PUBLIC_KEY  = 'QpBRF02lSmthkl-3p';

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
  const [sending, setSending] = useState(false);
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
    setSending(true);

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:    form.name,
        from_email:   form.email,
        message_type: form.type,
        message:      form.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setSending(false);
      setSubmitted(true);
    })
    .catch(() => {
      setSending(false);
      setError('Something went wrong. Please try again.');
    });
  };

  const resetForm = () => {
    setForm({ name: '', email: '', type: 'suggest', message: '' });
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="about-page">
      <PageHero
        title="About Discover China"
        subtitle="Bringing the beauty of China closer to the world, one destination at a time"
      />

      <div className="about-body">

        {/* Mission */}
        <section className="about-split mission-section">
          <Container>
            <Row className="align-items-center g-5">
              <Col md={6}>
                <img
                  src="https://picsum.photos/seed/about-mission/700/460"
                  alt="China landscape"
                  className="about-img rounded-3 shadow"
                />
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
          </Container>
        </section>

        {/* Values */}
        <section className="values-section">
          <Container>
            <h2 className="values-title">What We Offer</h2>
            <Row xs={1} sm={2} lg={4} className="g-4">
              {values.map((v, i) => (
                <Col key={i}>
                  <Card className="value-card h-100 text-center border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <div className="value-icon">{v.icon}</div>
                      <Card.Title as="h3" className="value-title-text">{v.title}</Card.Title>
                      <Card.Text className="text-muted">{v.desc}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Story */}
        <section className="about-split story-section">
          <Container>
            <Row className="align-items-center g-5">
              <Col md={6}>
                <h2>Our Story</h2>
                <p>
                  We are a team of travel enthusiasts, cultural explorers, and digital storytellers who believe
                  that China deserves more visitors. This website was built to bridge the gap between curiosity
                  and action — to take you from <em>"I've heard about the Great Wall"</em> to{' '}
                  <em>"I'm booking my trip to the Mutianyu section in October."</em>
                </p>
                <p>
                  Whether you're planning your first trip or your tenth, whether you're drawn to ancient history
                  or stunning natural landscapes, we hope Discover China becomes your go-to inspiration guide.
                </p>
              </Col>
              <Col md={6}>
                <img
                  src="https://picsum.photos/seed/about-story/700/460"
                  alt="Travel inspiration"
                  className="about-img rounded-3 shadow"
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Contact form */}
        <section className="contact-section">
          <Container>
            <div className="contact-header">
              <h2>Get In Touch</h2>
              <p>Suggest a place, ask a question, or just say hello — we'd love to hear from you.</p>
            </div>

            {submitted ? (
              <Alert variant="success" className="success-card text-center py-5">
                <div className="success-icon">✅</div>
                <Alert.Heading>Thank you, {form.name}!</Alert.Heading>
                <p>Your message has been sent. We'll follow up at <strong>{form.email}</strong>.</p>
                <Button variant="outline-success" onClick={resetForm}>Send Another Message</Button>
              </Alert>
            ) : (
              <Form className="contact-form" onSubmit={handleSubmit}>
                <Row className="mb-3 g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        disabled={sending}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        disabled={sending}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Message Type</Form.Label>
                  <Form.Select name="type" value={form.type} onChange={handleChange} disabled={sending}>
                    <option value="suggest">Suggest a Destination</option>
                    <option value="question">Ask a Question</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about a place you'd love to see featured, ask us anything, or share your thoughts…"
                    rows={6}
                    disabled={sending}
                  />
                </Form.Group>
                {error && <Alert variant="danger" className="py-2">{error}</Alert>}
                <Button type="submit" variant="danger" className="submit-btn" disabled={sending}>
                  {sending ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Form>
            )}
          </Container>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
