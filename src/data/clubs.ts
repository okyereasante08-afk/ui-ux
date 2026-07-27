export interface Club {
  slug: string;
  code: string;
  name: string;
  image: string;
  // Real copy, verified via live fetch of acesknust.com — not invented.
  description: string;
}

export const clubs: Club[] = [
  {
    slug: "arduino",
    code: "ch01",
    name: "Arduino Club",
    image: "/clubs/arduino.jpg",
    description:
      "A club for electronics and embedded systems lovers. Dive into real hardware projects with Arduino boards.",
  },
  {
    slug: "coding",
    code: "ch02",
    name: "Coding Club",
    image: "/clubs/coding.jpg",
    description:
      "Build beautiful websites and applications. This club focuses on HTML, CSS, JavaScript, and modern frameworks.",
  },
  {
    slug: "robotics",
    code: "ch03",
    name: "Robotics Club",
    image: "/clubs/robotics.avif",
    description:
      "Design, build, and program intelligent robots. From autonomous vehicles to robotic arms, explore the future of automation.",
  },
];
