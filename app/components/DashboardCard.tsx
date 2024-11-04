'use client'

import React from 'react'
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { ExternalLink, Github, Twitter, Linkedin, Globe, Code, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface DashboardCardProps {
  username: string
  company?: string
  languages: Array<{
    name: string
    count: number
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
  leetcodeUrl?: string
  websiteUrl?: string
}

'use client'

import React from 'react'
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { ExternalLink, Github, Twitter, Linkedin, Globe, Code, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface DashboardCardProps {
  username: string
  company?: string
  languages: Array<{
    name: string
    count: number
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
  leetcodeUrl?: string
  websiteUrl?: string
}

export default function DashboardCard({
  username = "username",
  company = "School or Company",
  languages = [],
  ranking = 0,
  reputation = 0,
  problemStats = { hard: 0, medium: 0, easy: 0 },
  acceptanceRate = 0,
  skillStats = { advance: 0, intermediate: 0, fundamentals: 0 },
  leetcodeUrl,
  websiteUrl,
}: DashboardCardProps) {
  const handleLeetCodeClick = () => leetcodeUrl && window.open(leetcodeUrl, '_blank')
  const handleWebsiteClick = () => websiteUrl && window.open(websiteUrl, '_blank')

  const totalProblems = Object.values(problemStats).reduce((a, b) => a + b, 0)
  const sortedLanguages = [...languages].sort((a, b) => b.count - a.count)

  const MotionCard = motion(Card)
  const MotionBadge = motion(Badge)

  return (
    <TooltipProvider>
      <MotionCard 
        className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-8">
          {/* Header Section */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                  {username[0].toUpperCase()}
                </div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                >
                  <Award className="w-4 h-4 text-gray-900" />
                </motion.div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{username}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Code className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{company}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                    onClick={handleLeetCodeClick}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View LeetCode Profile</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={handleWebsiteClick}
              >
                Leet-e-lytics
              </Button>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Language Stats */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Language Proficiency
              </h3>
              <div className="space-y-3">
                {sortedLanguages.slice(0, 5).map((lang, index) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm flex-grow">{lang.name}</span>
                    <span className="text-sm text-gray-400">{lang.count}</span>
                    <Progress 
                      value={(lang.count / sortedLanguages[0].count) * 100} 
                      className="w-24 h-1" 
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Middle Stats */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <div className="text-sm text-gray-400 mb-1">Global Ranking</div>
                <div className="text-3xl font-bold text-purple-400">#{ranking.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Reputation</div>
                <div className="text-3xl font-bold text-pink-400">{reputation.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Problem Solving</div>
                <div className="flex gap-2">
                  <MotionBadge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/50">
                    Hard: {problemStats.hard}
                  </MotionBadge>
                  <MotionBadge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                    Medium: {problemStats.medium}
                  </MotionBadge>
                  <MotionBadge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/50">
                    Easy: {problemStats.easy}
                  </MotionBadge>
                </div>
              </div>
            </motion.div>

            {/* Right Stats */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <div className="text-sm text-gray-400 mb-2">Acceptance Rate</div>
                <div className="flex items-center gap-4">
                  <Progress value={acceptanceRate} className="h-2 flex-grow" />
                  <span className="text-lg font-semibold">{acceptanceRate}%</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Skill Distribution</div>
                <div className="space-y-2">
                  {Object.entries(skillStats).map(([skill, value]) => (
                    <div key={skill} className="flex items-center gap-2">
                      <span className="text-sm capitalize">{skill}</span>
                      <Progress 
                        value={(value / Object.values(skillStats).reduce((a, b) => a + b, 0)) * 100} 
                        className="h-1 flex-grow" 
                      />
                      <span className="text-sm text-gray-400">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[Github, Twitter, Linkedin, Globe].map((Icon, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full bg-gray-700 hover:bg-gray-600 border-gray-600">
                    <Icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View {Icon.name} Profile</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>

          {/* Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {['🏆', '🥇', '🥈', '🥉', '⭐', '🔥'].map((emoji, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xl">{emoji}</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Achievement {i + 1}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </CardContent>
      </MotionCard>
    </TooltipProvider>
  )
}