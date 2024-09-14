// components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children ,showSidebar = true,useLayout=true}) => {

  if (!useLayout) {
    return <>{children}</>; // Render children without the layout
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
      {showSidebar && <Sidebar />}

        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position:"relative"
  },
  mainContent: {
    display: 'flex',
    flex: 1,

  },
  content: {
    flex: 1,
    position:"relative",
    background: 'rgba(250,250,251)',
    margin:"12px",
    borderRadius:"10px",

    padding:'24px 20px'
  },
};

export default Layout;
