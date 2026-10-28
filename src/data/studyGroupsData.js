/**
 * Realistic Collegiate Study Groups data for Peer Tutor platform
 */

export const INITIAL_STUDY_GROUPS = [
  {
    id: 'sg-1',
    title: 'CS201 Algorithm & LeetCode Sprint',
    subject: 'Data Structures and Algorithms',
    description: 'Weekly collaborative problem-solving covering binary trees, graph BFS/DFS, and dynamic programming patterns.',
    leadTutor: 'Elena Rostova',
    leadAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    membersCount: 16,
    maxMembers: 20,
    schedule: 'Tuesdays & Thursdays • 6:00 PM',
    format: 'Online Zoom + Discord',
    tags: ['Trees', 'Graphs', 'DP', 'Interview Prep'],
    isJoined: true // Alex Morgan is enrolled by default
  },
  {
    id: 'sg-2',
    title: 'Math 215 Linear Algebra & Matrix Proofs',
    subject: 'Mathematics',
    description: 'Deconstruct vector spaces, eigenvalues, diagonalization, and orthonormal bases with intuitive step-by-step proofs.',
    leadTutor: 'Sofia Rodriguez',
    leadAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    membersCount: 11,
    maxMembers: 15,
    schedule: 'Wednesdays • 4:30 PM',
    format: 'Math Commons Rm 110 (In-Person)',
    tags: ['Vector Spaces', 'Eigenvalues', 'Proof Clinic'],
    isJoined: false
  },
  {
    id: 'sg-3',
    title: 'Full-Stack Web Dev & React Hooks Lab',
    subject: 'Web Development',
    description: 'Build real portfolio applications: state management, REST APIs, Tailwind CSS, and asynchronous JavaScript debugging.',
    leadTutor: 'Aiden Taylor',
    leadAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    membersCount: 18,
    maxMembers: 25,
    schedule: 'Mondays & Fridays • 5:00 PM',
    format: 'Online Discord Lab',
    tags: ['React', 'Node.js', 'Tailwind', 'Projects'],
    isJoined: true
  },
  {
    id: 'sg-4',
    title: 'Database Architecture & SQL Optimization Pod',
    subject: 'Database Management Systems',
    description: 'Master 3NF/BCNF normalization, indexing structures (B+ trees), and writing lightning-fast analytical queries.',
    leadTutor: 'Priya Sharma',
    leadAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    membersCount: 9,
    maxMembers: 15,
    schedule: 'Saturdays • 11:00 AM',
    format: 'Science Center 3rd Floor Peer Pods',
    tags: ['SQL', 'PostgreSQL', 'Normalization', 'Indexing'],
    isJoined: false
  },
  {
    id: 'sg-5',
    title: 'Applied AI & PyTorch Model Workshop',
    subject: 'Artificial Intelligence and Machine Learning',
    description: 'Hands-on Jupyter notebooks: training CNNs, fine-tuning Hugging Face transformers, and demystifying gradient descent.',
    leadTutor: 'Marcus Chen',
    leadAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    membersCount: 14,
    maxMembers: 18,
    schedule: 'Thursdays • 7:00 PM',
    format: 'Online Google Meet',
    tags: ['PyTorch', 'Neural Networks', 'Jupyter', 'Computer Vision'],
    isJoined: false
  },
  {
    id: 'sg-6',
    title: 'Computer Networks & Wireshark Packet Clinic',
    subject: 'Computer Networks',
    description: 'Inspect live TCP handshakes, subnetting calculations, DNS lookups, and socket programming in Python/C.',
    leadTutor: 'Devon Vance',
    leadAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    membersCount: 8,
    maxMembers: 12,
    schedule: 'Wednesdays • 6:30 PM',
    format: 'Student Union Innovation Pod',
    tags: ['TCP/IP', 'Wireshark', 'Subnetting', 'Sockets'],
    isJoined: false
  }
];
