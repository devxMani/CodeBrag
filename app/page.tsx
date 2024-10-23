import React from 'react';
import DashboardCard from './components/DashboardCard';

const Home = () => {
  const userData = {
    username: "username123",
    languages: [
      { name: "JavaScript", count: 24, progress: 80 },
      { name: "Python", count: 15, progress: 60 },
    ],
    ranking: 15234,
    reputation: 856,
    problemStats: { hard: 45, medium: 128, easy: 234 },
    acceptanceRate: 75, // New property
    skillStats: { advance: 10, intermediate: 20, fundamentals: 30 }, // New property
  };

  return (
    <div>
      <DashboardCard {...userData} />
    </div>
  );
};

export default Home;