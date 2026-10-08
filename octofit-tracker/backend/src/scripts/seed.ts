import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();
    await Promise.all([
      User.init(),
      Team.init(),
      Activity.init(),
      Leaderboard.init(),
      Workout.init(),
    ]);

    const userData = [
      {
        username: 'alex-morgan',
        email: 'alex.morgan@example.com',
        name: 'Alex Morgan',
      },
      {
        username: 'jamie-lee',
        email: 'jamie.lee@example.com',
        name: 'Jamie Lee',
      },
      {
        username: 'taylor-rivera',
        email: 'taylor.rivera@example.com',
        name: 'Taylor Rivera',
      },
      {
        username: 'sam-patel',
        email: 'sam.patel@example.com',
        name: 'Sam Patel',
      },
    ];
    const users = await Promise.all(
      userData.map(async (user) => {
        const existing = await User.findOneAndUpdate(
          { username: user.username },
          { $set: user },
          { new: true },
        );
        return existing ?? User.create(user);
      }),
    );
    const usersByUsername = new Map(
      users.map((user) => [user.username, user._id]),
    );

    const teamData = [
      {
        name: 'Trailblazers',
        description: 'A team focused on running and outdoor adventures.',
        members: ['alex-morgan', 'jamie-lee'],
      },
      {
        name: 'Core Collective',
        description: 'A team building strength, balance, and healthy habits.',
        members: ['taylor-rivera', 'sam-patel'],
      },
    ];
    const teams = await Promise.all(
      teamData.map((team) => {
        const members = team.members.map((username) => {
          const userId = usersByUsername.get(username);
          if (!userId) throw new Error(`Missing seeded user: ${username}`);
          return userId;
        });

        return Team.findOneAndUpdate(
          { name: team.name },
          { $set: { name: team.name, description: team.description, members } },
          { new: true },
        ).then(
          (existing) =>
            existing ??
            Team.create({ name: team.name, description: team.description, members }),
        );
      }),
    );
    const teamsByName = new Map(teams.map((team) => [team.name, team._id]));
    const teamForUser = new Map<string, (typeof teams)[number]['_id']>();
    teamData.forEach((team) => {
      const teamId = teamsByName.get(team.name);
      if (!teamId) throw new Error(`Missing seeded team: ${team.name}`);
      team.members.forEach((username) => teamForUser.set(username, teamId));
    });

    const activityData = [
      {
        username: 'alex-morgan',
        type: 'Running',
        durationMinutes: 36,
        caloriesBurned: 345,
        occurredAt: new Date('2026-10-01T07:30:00.000Z'),
      },
      {
        username: 'jamie-lee',
        type: 'Cycling',
        durationMinutes: 48,
        caloriesBurned: 410,
        occurredAt: new Date('2026-10-02T08:00:00.000Z'),
      },
      {
        username: 'taylor-rivera',
        type: 'Strength training',
        durationMinutes: 42,
        caloriesBurned: 280,
        occurredAt: new Date('2026-10-03T17:15:00.000Z'),
      },
      {
        username: 'sam-patel',
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 130,
        occurredAt: new Date('2026-10-04T18:00:00.000Z'),
      },
      {
        username: 'alex-morgan',
        type: 'Hiking',
        durationMinutes: 65,
        caloriesBurned: 520,
        occurredAt: new Date('2026-10-05T09:00:00.000Z'),
      },
      {
        username: 'taylor-rivera',
        type: 'Running',
        durationMinutes: 28,
        caloriesBurned: 260,
        occurredAt: new Date('2026-10-06T07:45:00.000Z'),
      },
    ];
    await Promise.all(
      activityData.map((activity) => {
        const userId = usersByUsername.get(activity.username);
        if (!userId) throw new Error(`Missing seeded user: ${activity.username}`);
        const { username: _username, ...data } = activity;

        return Activity.findOneAndUpdate(
          { user: userId, type: data.type, occurredAt: data.occurredAt },
          { $set: { ...data, user: userId } },
          { new: true },
        ).then(
          (existing) =>
            existing ?? Activity.create({ ...data, user: userId }),
        );
      }),
    );

    const leaderboardData = [
      { username: 'alex-morgan', points: 980 },
      { username: 'jamie-lee', points: 845 },
      { username: 'taylor-rivera', points: 790 },
      { username: 'sam-patel', points: 675 },
    ];
    await Promise.all(
      leaderboardData.map((entry) => {
        const userId = usersByUsername.get(entry.username);
        const teamId = teamForUser.get(entry.username);
        if (!userId || !teamId) {
          throw new Error(`Missing seeded user or team for ${entry.username}`);
        }

        return Leaderboard.findOneAndUpdate(
          { user: userId },
          { $set: { user: userId, team: teamId, points: entry.points } },
          { new: true },
        ).then(
          (existing) =>
            existing ??
            Leaderboard.create({ user: userId, team: teamId, points: entry.points }),
        );
      }),
    );

    const workoutData = [
      {
        name: 'Easy Endurance Run',
        description: 'A conversational-pace run to build aerobic fitness.',
        activityType: 'Running',
        durationMinutes: 30,
        difficulty: 'beginner',
      },
      {
        name: 'Tempo Intervals',
        description: 'Alternate brisk running intervals with easy recovery periods.',
        activityType: 'Running',
        durationMinutes: 40,
        difficulty: 'intermediate',
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced session of squats, pushes, pulls, and core work.',
        activityType: 'Strength training',
        durationMinutes: 45,
        difficulty: 'intermediate',
      },
      {
        name: 'Mobility and Flow',
        description: 'Gentle movement focused on flexibility and recovery.',
        activityType: 'Yoga',
        durationMinutes: 25,
        difficulty: 'beginner',
      },
      {
        name: 'Hill Climb Ride',
        description: 'Build cycling power with steady hill efforts.',
        activityType: 'Cycling',
        durationMinutes: 50,
        difficulty: 'advanced',
      },
    ];
    await Promise.all(
      workoutData.map((workout) =>
        Workout.findOneAndUpdate(
          { name: workout.name },
          { $set: workout },
          { new: true },
        ).then((existing) => existing ?? Workout.create(workout)),
      ),
    );

    console.log('Database seeding complete');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
