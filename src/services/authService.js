// src/services/authService.js

// Mocked users
let users = [
  { name: 'John Doe', email: 'john@example.com', password: '123456', credits: 10, badges: ['Beginner'], skills_offered: ['Python'], skills_wanted: ['Guitar'] },
];

export const loginService = async ({ email, password }) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  return user;
};

export const registerService = async ({ name, email, password }) => {
  const exists = users.some(u => u.email === email);
  if (exists) throw new Error('User already exists');
  const newUser = { name, email, password, credits: 0, badges: [], skills_offered: [], skills_wanted: [] };
  users.push(newUser);
  return newUser;
};

export const updateUserService = async (data) => {
  const userIndex = users.findIndex(u => u.email === data.email || u.email === data.email);
  if (userIndex === -1) throw new Error('User not found');
  users[userIndex] = { ...users[userIndex], ...data };
  return users[userIndex];
};

export const getUserService = async (email) => {
  return users.find(u => u.email === email);
};
