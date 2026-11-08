export interface StatItem {
  value: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

export interface AboutData {
  stats: StatItem[];
  timeline: TimelineItem[];
  team: TeamMember[];
  values: ValueItem[];
}
