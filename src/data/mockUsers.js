export const mockUsers = [
    {
      id: 'user1',
      name: '김영지',
      phone: '010-1234-5678',
      isFavorite: true,
      clickedClinics: [
        { clinicId: 'clinic1', timestamp: '2025-05-21T09:00:00' },
        { clinicId: 'clinic2', timestamp: '2025-05-21T12:00:00' },
      ],
    },
    {
      id: 'user2',
      name: '이수정',
      phone: '010-5678-1234',
      isFavorite: false,
      clickedClinics: [
        { clinicId: 'clinic1', timestamp: '2025-05-20T15:30:00' },
      ],
    },
  ];
  