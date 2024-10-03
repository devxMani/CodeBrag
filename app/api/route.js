import { NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '../../utils/database';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leetcode-cards');
    const cardsCollection = db.collection('cards');

    // Check if card exists in the database
    let card = await cardsCollection.findOne({ username });

    if (!card) {
      // If not found, fetch data from LeetCode API
      const leetCodeData = await fetchLeetCodeData(username);

      card = {
        username: leetCodeData.username,
        solvedQuestions: leetCodeData.solvedQuestions,
        badges: leetCodeData.badges,
        createdAt: new Date(),
      };

      // Save the card to the database
      await cardsCollection.insertOne(card);
    }

    // Set CORS headers
    return new NextResponse(JSON.stringify(card), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error in generate-card handler:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error generating card', message: error.message }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

async function fetchLeetCodeData(username) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          displayName
          icon
        }
      }
    }
  `;

  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables: { username },
    });

    const userData = response.data.data.matchedUser;

    if (!userData) {
      throw new Error('User not found');
    }

    const solvedQuestions = userData.submitStats.acSubmissionNum.reduce((total, stat) => total + stat.count, 0);
    const badges = userData.badges.map(badge => badge.displayName);

    return {
      username: userData.username,
      solvedQuestions,
      badges,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`LeetCode API error: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from LeetCode API');
    } else {
      throw new Error(`Error fetching LeetCode data: ${error.message}`);
    }
  }
}
