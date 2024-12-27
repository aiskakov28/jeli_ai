export const users = [
  {
    email: 'demo@jeli.ai',
    password: 'password123',
    fullName: 'Demo User',
    linkedinProfile: 'https://www.linkedin.com/in/demo-user',
    subscriptionType: 'pro'
  }
];

export const addUser = (user) => {
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUser = (email) => {
  return users.find(user => user.email === email);
};