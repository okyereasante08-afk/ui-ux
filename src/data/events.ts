export interface EventItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

// Real events, verified via live fetch of acesknust.com. Day/month/time
// are honestly left off rather than inventing plausible-looking ones —
// the live site shows a literal "00:00" bug for time, not perpetuated
// here.
export const upcomingEvents: EventItem[] = [
  {
    id: "codefest-2025",
    title: "CodeFest 2025",
    description: "Join us for a thrilling day of coding challenges, workshops, and networking with tech enthusiasts.",
    image: "/events/codefest-2025.jpg",
  },
  {
    id: "robotics-meeting",
    title: "ACES Robotics Meeting",
    description: "Explore the latest in robotics. Collaborate, build bots, and automate solutions with fellow members.",
  },
  {
    id: "dinner-2025",
    title: "ACES Dinner 2025",
    description: "A night of fun, food, and fellowship. Connect with ACES members over an elegant dinner.",
  },
  {
    id: "hangout",
    title: "ACES Hangout",
    description: "Unwind with games, conversations, and chill vibes in this relaxed member-exclusive event.",
  },
];

// Real photos from actual past events, supplied directly by the team —
// not stock images.
export const pastEvents: EventItem[] = [
  {
    id: "cbet-dinner",
    title: "CBET Dinner",
    description: "Noche de Convivencia — a night of dinner, awards, and togetherness for the department.",
    image: "/events/cbet-dinner.webp",
  },
  {
    id: "robotics-meeting-past",
    title: "ACES Robotics Meeting",
    description: "Members collaborating hands-on at a past robotics meeting.",
    image: "/events/robotics-meeting.webp",
  },
];
