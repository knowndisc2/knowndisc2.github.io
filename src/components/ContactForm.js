import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <footer style={{
      position: 'relative',
      width: '100%',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: '80px 0',
      marginTop: 'auto',
      zIndex: 10
    }}>
      <motion.div 
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <motion.h2 
          className="section-title" 
          variants={itemVariants}
          style={{
            fontSize: '3rem',
            fontFamily: '"Canopee", serif',
            textAlign: 'center',
            margin: '0 auto 1.5rem',
            fontWeight: 'normal',
            color: '#fff',
            width: '100%',
            padding: '0 20px',
            boxSizing: 'border-box'
          }}
        >
          Get In Touch
        </motion.h2>
        
        <motion.p 
          className="section-subtitle" 
          variants={itemVariants}
          style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#aaa',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}
        >
          Have a project in mind or want to collaborate? Send me a message.
        </motion.p>

        {submitStatus === 'success' && (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thank you for your message! I'll get back to you soon.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Oops! Something went wrong. Please try again later.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <motion.div 
            className="form-group" 
            variants={itemVariants}
            style={{
              marginBottom: '2rem',
              position: 'relative'
            }}
          >
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label 
              htmlFor="name" 
              className="form-label"
            >
              Name
            </label>
          </motion.div>

          <motion.div 
            className="form-group" 
            variants={itemVariants}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label 
              htmlFor="email" 
              className="form-label"
            >
              Email
            </label>
          </motion.div>

          <motion.div 
            className="form-group" 
            variants={itemVariants}
          >
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-input textarea"
              placeholder=" "
              required
            />
            <label 
              htmlFor="message" 
              className="form-label"
            >
              Message
            </label>
          </motion.div>

          <motion.button 
            type="submit" 
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid #fff',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              display: 'block',
              margin: '3rem auto 0',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: '#fff',
              color: '#000'
            }}
            whileTap={{ 
              scale: 0.98 
            }}
            variants={itemVariants}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>

        <motion.div 
          className="social-links"
          style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}
          variants={containerVariants}
        >
          <motion.h3 
            style={{
              color: '#fff',
              marginBottom: '1.5rem',
              fontWeight: 'normal',
              letterSpacing: '1px'
            }}
            variants={itemVariants}
          >
            Or find me on
          </motion.h3>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            {[
              { 
                name: 'Instagram', 
                url: 'https://www.instagram.com/knowndisc/', 
                icon: 'fab fa-instagram',
                color: '#E1306C'
              },
              { 
                name: 'Twitter', 
                url: 'https://x.com/knowndisc2', 
                icon: 'fab fa-twitter',
                color: '#1DA1F2'
              },
              { 
                name: 'YouTube', 
                url: 'https://www.youtube.com/@knowndisc', 
                icon: 'fab fa-youtube',
                color: '#FF0000'
              },
              { 
                name: 'VGen', 
                url: 'https://vgen.co/knowndisc',
                icon: 'fas fa-paint-brush',
                color: '#8A2BE2'
              },
              { 
                name: 'Email', 
                url: 'mailto:knowndisc.questionmail@gmail.com', 
                icon: 'fas fa-envelope',
                color: '#34A853'
              }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  fontSize: '1.5rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  margin: '0 0.5rem',
                  textDecoration: 'none'
                }}
                whileHover={{
                  backgroundColor: social.color,
                  y: -5,
                  scale: 1.1
                }}
                variants={itemVariants}
                custom={index}
                aria-label={social.name}
              >
                <i className={social.icon} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default ContactForm;
