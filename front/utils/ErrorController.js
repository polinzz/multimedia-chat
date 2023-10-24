export const handleLoginError = (error) => {
    console.error('Error making request:', error.message);
    alert('Invalid email or password');
  };