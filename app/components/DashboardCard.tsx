import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "../ui/card"; // Ensure this path is correct
import { Badge } from "../ui/badge"; // Ensure this path is correct
import { Button } from "../ui/button"; // Ensure this path is correct
import { Progress } from "../ui/progress"; // Ensure this path is correct
import { Github, Twitter, Linkedin, Globe, Trophy, Star, Code2, Brain, Flame, Target, Award, Sparkles } from "lucide-react";

interface DashboardCardProps {
  username: string;
  languages: { name: string; count: number; progress: number }[];
  ranking: number;
  reputation: number; // Corrected this line
  problemStats: { hard: number; medium: number; easy: number };
  acceptanceRate: number;
  skillStats: { advance: number; intermediate: number; fundamentals: number };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  username,
  languages,
  ranking,
  problemStats,
  acceptanceRate,
  skillStats,
}) => {
  const totalProblems = problemStats.hard + problemStats.medium + problemStats.easy;
  const totalSkills = skillStats.advance + skillStats.intermediate + skillStats.fundamentals;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 bg-gradient-to-r from-slate-800 to-slate-700 border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Code2 className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    {username}
                    <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-300">
                      Pro Coder
                    </Badge>
                  </h1>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-white hover:bg-slate-700">
                      <Github className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-white hover:bg-slate-700">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-white hover:bg-slate-700">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">Full Stack Developer | Problem Solver | Algorithm Enthusiast</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-slate-700/50 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-white">{totalProblems}</div>
                    <div className="text-sm text-slate-300">Problems Solved</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-white">{ranking.toLocaleString()}</div>
                    <div className="text-sm text-slate-300">Global Ranking</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-white">{acceptanceRate}%</div>
                    <div className="text-sm text-slate-300">Acceptance Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Languages Card */}
          <Card className="bg-slate-800 border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" /> Language Proficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-200">{lang.name}</span>
                      <span className="text-slate-400">{lang.count} solved</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={lang.progress} 
                        className="h-2 bg-slate-700"
                        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500" 
                      />
                      <span className="absolute right-0 -top-6 text-xs text-slate-400">
                        {lang.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Problem Solving Stats */}
          <Card className="bg-slate-800 border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" /> Problem Solving
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-500/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">{problemStats.hard}</div>
                  <div className="text-sm text-slate-300">Hard</div>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">{problemStats.medium}</div>
                  <div className="text-sm text-slate-300">Medium</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{problemStats.easy}</div>
                  <div className="text-sm text-slate-300">Easy</div>
                </div>
              </div>
              <div className="mt-6">
                <Progress 
                  value={(totalProblems / 2000) * 100} 
                  className="h-2 bg-slate-700"
                  indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
                />
                <div className="flex justify-between mt-2 text-sm text-slate-400">
                  <span>{totalProblems} solved</span>
                  <span>2000 total</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Distribution */}
          <Card className="bg-slate-800 border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-400" /> Skill Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Advanced</span>
                    <span className="text-purple-400">{((skillStats.advance / totalSkills) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={(skillStats.advance / totalSkills) * 100} 
                    className="h-2 bg-slate-700"
                    indicatorClassName="bg-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Intermediate</span>
                    <span className="text-blue-400">{((skillStats.intermediate / totalSkills) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={(skillStats.intermediate / totalSkills) * 100} 
                    className="h-2 bg-slate-700"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Fundamentals</span>
                    <span className="text-green-400">{((skillStats.fundamentals / totalSkills) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={(skillStats.fundamentals / totalSkills) * 100} 
                    className="h-2 bg-slate-700"
                    indicatorClassName="bg-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mt-6 bg-slate-800 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" /> Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Sparkles, label: "100 Days Streak", color: "text-yellow-400" },
                { icon: Trophy, label: "Top Contributor", color: "text-emerald-400" },
                { icon: Star, label: "Problem Setter", color: "text-blue-400" },
                { icon: Award, label: "Contest Winner", color: "text-purple-400" },
                { icon: Flame, label: "Speed Demon", color: "text-red-400" },
              ].map((achievement, i) => (
                <Badge 
                  key={i}
                  variant="secondary"
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-2"
                >
                  <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                  <span className="text-slate-200">{achievement.label}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCard;
