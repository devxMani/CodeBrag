'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { ExternalLink, Github, Twitter, Linkedin, Globe, Code, Award, Zap, Trophy, Target, Brain, Flame, Star, Calendar, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DashboardCardProps {
  username: string
  company?: string
  languages: Array<{
    name: string
    count: number
    proficiency: number
  }>
  ranking: number
  reputation: number
  problemStats: {
    hard: number
    medium: number
    easy: number
  }
  acceptanceRate: number
  skillStats: {
    advance: number
    intermediate: number
    fundamentals: number
  }
  badges: Array<{
    name: string
    icon: string
    description: string
    tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  }>
  contestRating?: number
  contestRank?: string
  streak: number
  leetcodeUrl?: string
  websiteUrl?: string
  recentSubmissions: Array<{
    problemName: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded'
    timestamp: string
  }>
  studyPlan: {
    name: string
    progress: number
    totalProblems: number
  }
}

export default function EnhancedDashboardCard({
  username = "username123",
  company = "School or Company",
  languages = [
    { name: "JavaScript", count: 24, proficiency: 85 },
    { name: "Python", count: 15, proficiency: 70 },
    { name: "Java", count: 12, proficiency: 65 },
    { name: "C++", count: 8, proficiency: 55 },
    { name: "TypeScript", count: 6, proficiency: 45 }
  ],
  ranking = 15234,
  reputation = 856,
  problemStats = { hard: 45, medium: 128, easy: 234 },
  acceptanceRate = 75,
  skillStats = { advance: 10, intermediate: 20, fundamentals: 30 },
  badges = [
    { name: "Problem Solver", icon: "🏆", description: "Solved 100+ Problems", tier: "gold" },
    { name: "Speed Demon", icon: "⚡️", description: "Fast Solutions", tier: "silver" },
    { name: "Consistent", icon: "🔥", description: "30 Day Streak", tier: "platinum" },
    { name: "Contest Winner", icon: "🥇", description: "Top 10%", tier: "gold" },
    { name: "Bug Buster", icon: "🐛", description: "No Runtime Errors", tier: "silver" },
    { name: "Algorithm Master", icon: "🧠", description: "Dynamic Programming", tier: "bronze" }
  ],
  contestRating = 1856,
  contestRank = "Guardian",
  streak = 30,
  leetcodeUrl,
  websiteUrl,
  recentSubmissions = [
    { problemName: "Two Sum", difficulty: "Easy", status: "Accepted", timestamp: "2023-06-15T10:30:00Z" },
    { problemName: "LRU Cache", difficulty: "Medium", status: "Time Limit Exceeded", timestamp: "2023-06-14T15:45:00Z" },
    { problemName: "Merge k Sorted Lists", difficulty: "Hard", status: "Wrong Answer", timestamp: "2023-06-13T09:20:00Z" },
  ],
  studyPlan = {
    name: "Dynamic Programming",
    progress: 15,
    totalProblems: 50
  }
}: DashboardCardProps) {
  const [animatedRanking, setAnimatedRanking] = useState(ranking)
  const [showRecentSubmissions, setShowRecentSubmissions] = useState(false)

  useEffect(() => {
    const animationDuration = 2000 // 2 seconds
    const steps = 50
    const increment = (ranking - animatedRanking) / steps
    let currentStep = 0

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedRanking(prev => Math.round(prev + increment))
        currentStep++
      } else {
        clearInterval(timer)
      }
    }, animationDuration / steps)

    return () => clearInterval(timer)
  }, [ranking])

  const totalProblems = Object.values(problemStats).reduce((a, b) => a + b, 0)
  const sortedLanguages = [...languages].sort((a, b) => b.count - a.count)

  const getBadgeColor = (tier: string) => {
    const colors = {
      bronze: "from-orange-400 to-orange-600",
      silver: "from-gray-300 to-gray-500",
      gold: "from-yellow-300 to-yellow-600",
      platinum: "from-cyan-300 to-cyan-600"
    }
    return colors[tier] || colors.bronze
  }

  const getStatusColor = (status: string) => {
    const colors = {
      "Accepted": "text-green-400",
      "Wrong Answer": "text-red-400",
      "Time Limit Exceeded": "text-yellow-400"
    }
    return colors[status] || "text-gray-400"
  }

  return (
    <TooltipProvider>
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl border-gray-700">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
                    {username[0].toUpperCase()}
                  </div>
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Trophy className="w-5 h-5 text-gray-900" />
                  </motion.div>
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {username}
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                      {contestRank}
                    </Badge>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Code className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{company}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Contest Rating</div>
                  <div className="text-2xl font-bold text-yellow-400">{contestRating}</div>
                </div>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Leet-e-lytics
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Language Stats */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Language Proficiency
                </h3>
                <div className="space-y-3">
                  {sortedLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between text-sm">
                        <span>{lang.name}</span>
                        <span className="text-gray-400">{lang.count} solved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="h-1.5 bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.proficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <span className="text-xs text-gray-400">{lang.proficiency}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Problem Solving Stats */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-sm text-gray-400 mb-1">Global Ranking</div>
                  <div className="text-3xl font-bold text-purple-400">#{animatedRanking.toLocaleString()}</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-sm text-gray-400 mb-1">Current Streak</div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-400">{streak} days</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-sm text-gray-400 mb-2">Problem Solving</div>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(problemStats).map(([difficulty, count], index) => (
                      <motion.div
                        key={difficulty}
                        className={`bg-${difficulty === 'hard' ? 'red' : difficulty === 'medium' ? 'yellow' : 'green'}-500/20 rounded-lg p-2 text-center`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring' }}
                      >
                        <div className={`text-${difficulty === 'hard' ? 'red' : difficulty === 'medium' ? 'yellow' : 'green'}-300 text-sm capitalize`}>{difficulty}</div>
                        <div className={`text-xl font-bold text-${difficulty === 'hard' ? 'red' : difficulty === 'medium' ? 'yellow' : 'green'}-400`}>{count}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Skill Stats */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-sm text-gray-400 mb-2">Acceptance Rate</div>
                  <div className="flex items-center gap-4">
                    <Progress value={acceptanceRate} className="h-2 flex-grow" />
                    <span className="text-lg font-semibold">{acceptanceRate}%</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-sm text-gray-400 mb-2">Skill Distribution</div>
                  <div className="space-y-2">
                    {Object.entries(skillStats).map(([skill, value], index) => (
                      <div key={skill} className="flex items-center gap-2">
                        <span className="text-sm capitalize w-24">{skill}</span>
                        <motion.div
                          className="h-1.5 bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(value / Object.values(skillStats).reduce((a, b) => a + b, 0)) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <span className="text-sm text-gray-400 w-8 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Study Plan Progress */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Current Study Plan
              </h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{studyPlan.name}</span>
                  <span className="text-sm text-gray-400">{studyPlan.progress} / {studyPlan.totalProblems} completed</span>
                </div>
                <Progress value={(studyPlan.progress / studyPlan.totalProblems) * 100} className="h-2" />
              </div>
            </motion.div>

            {/* Recent Submissions */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Recent Submissions
              </h3>
              <Button
                variant="outline"
                onClick={() => setShowRecentSubmissions(!showRecentSubmissions)}
                className="mb-4"
              >
                {showRecentSubmissions ? "Hide" : "Show"} Recent Submissions
              </Button>
              <AnimatePresence>
                {showRecentSubmissions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2">
                      {recentSubmissions.map((submission, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div>
                            <span className="font-medium">{submission.problemName}</span>
                            <span className={`ml-2 text-sm ${getStatusColor(submission.status)}`}>
                              {submission.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(submission.timestamp).toLocaleDateString()}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Badges Section */}
            <motion.div 
              className="border-t border-gray-700 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {badges.map((badge, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <motion.div
                        className={`bg-gradient-to-br ${getBadgeColor(badge.tier)} p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="text-xs font-medium text-center">{badge.name}</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{badge.description}</p>
                      <p className="text-xs text-gray-400 capitalize">{badge.tier} Tier</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[Github, Twitter, Linkedin, Globe].map((Icon, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-gray-700 hover:bg-gray-600 border-gray-600"
                      >
                        <Icon className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View {Icon.name} Profile</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  )
}