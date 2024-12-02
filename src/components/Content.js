import React from 'react';

const Content = () => {
  return (
    <div>
      <h1>Welcome to Recipe Organiser!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
}

export default Content;