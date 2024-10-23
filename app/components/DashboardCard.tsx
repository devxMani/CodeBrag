import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Github, Twitter, Linkedin, Globe, Trophy, Star, Code2, Brain } from "lucide-react";

// ... rest of your DashboardCard code

interface DashboardCardProps {
  username: string;
  languages: { name: string; count: number; progress: number }[];
  ranking: number;
  reputation: number;
  problemStats: { hard: number; medium: number; easy: number };
  acceptanceRate: number;
  skillStats: { advance: number; intermediate: number; fundamentals: number };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  username,
  languages,
  ranking,
  reputation,
  problemStats,
  acceptanceRate,
  skillStats,
}) => {
  const totalProblems = problemStats.hard + problemStats.medium + problemStats.easy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 rounded-full">
                <Code2 className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  🇮🇳 {username}
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Globe className="w-4 h-4" />
                  </Button>
                </h1>
                <p className="text-slate-500">Full Stack Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg font-semibold px-4 py-2">
                Leet-ytics
              </Badge>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Language Stats */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Brain className="w-4 h-4" /> Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-slate-500">{lang.count} solved</span>
                      </div>
                      <Progress value={lang.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ranking</span>
                    <Badge variant="outline">{ranking.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reputation</span>
                    <Badge variant="outline">{reputation}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Acceptance Rate</span>
                    <Badge variant="outline">{acceptanceRate}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problem Stats */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Star className="w-4 h-4" /> Problem Solving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-red-50 rounded-lg">
                    <div className="font-bold text-red-600">{problemStats.hard}</div>
                    <div className="text-xs text-slate-600">Hard</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-lg">
                    <div className="font-bold text-orange-600">{problemStats.medium}</div>
                    <div className="text-xs text-slate-600">Medium</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-600">{problemStats.easy}</div>
                    <div className="text-xs text-slate-600">Easy</div>
                  </div>
                </div>
                <div className="text-center text-sm text-slate-500">
                  Total Problems Solved: {totalProblems}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Stats */}
          <Card className="shadow-sm mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-xl font-bold text-blue-600">{skillStats.advance}</span>
                  <span className="text-sm text-slate-600">Advanced</span>
                  <Progress value={(skillStats.advance / (skillStats.advance + skillStats.intermediate + skillStats.fundamentals)) * 100} className="h-1 mt-2" />
                </div>
                <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-xl font-bold text-purple-600">{skillStats.intermediate}</span>
                  <span className="text-sm text-slate-600">Intermediate</span>
                  <Progress value={(skillStats.intermediate / (skillStats.advance + skillStats.intermediate + skillStats.fundamentals)) * 100} className="h-1 mt-2" />
                </div>
                <div className="flex flex-col items-center p-4 bg-teal-50 rounded-lg">
                  <span className="text-xl font-bold text-teal-600">{skillStats.fundamentals}</span>
                  <span className="text-sm text-slate-600">Fundamentals</span>
                  <Progress value={(skillStats.fundamentals / (skillStats.advance + skillStats.intermediate + skillStats.fundamentals)) * 100} className="h-1 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" size="icon" className="rounded-full hover:bg-slate-100">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:bg-slate-100">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:bg-slate-100">
              <Linkedin className="w-4 h-4" />
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Badge 
                key={i} 
                variant="secondary" 
                className="px-4 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all cursor-pointer"
              >
                Achievement {i}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;