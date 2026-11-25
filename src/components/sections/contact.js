import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, email, socialMedia } from '@config';
import sr from '@utils/sr';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 40px;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    color: var(--lightest-slate);
  }

  .copy-button {
    ${({ theme }) => theme.mixins.smallButton};
    min-width: 90px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px 32px;
    margin-top: 40px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .secondary-link {
    ${({ theme }) => theme.mixins.inlineLink};
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const [copied, setCopied] = useState(false);
  const linkedin = socialMedia.find(({ name }) => name === 'Linkedin');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      window.location.href = `mailto:${email}`;
    }
  };

  useEffect(() => {
    // Read the preference directly: the hook's value isn't known yet on mount.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I'd love to hear from you! Whether you have a question, want to collaborate, or just feel
        like saying hello, feel free to reach out. I’m always open to connecting with new people and
        exploring new opportunities.
      </p>

      <div className="email-row">
        <span>{email}</span>
        <button className="copy-button" type="button" onClick={copyEmail}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>
      </div>

      <div className="actions">
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
        {linkedin && (
          <a className="secondary-link" href={linkedin.url}>
            Connect on LinkedIn
          </a>
        )}
      </div>
    </StyledContactSection>
  );
};

export default Contact;
