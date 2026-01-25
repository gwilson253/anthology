import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <p>&copy; {new Date().getFullYear()} Greg Wilson. All rights reserved.</p>
            <style jsx="true">{`
        .main-footer {
          padding: 2rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: auto;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
        </footer>
    );
};

export default Footer;
