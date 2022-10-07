interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, sed.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, sed.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, sed.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
