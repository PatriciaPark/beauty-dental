import { useState } from 'react';
import { mockUsers } from '../data/mockUsers';
import { mockClinics } from '../data/mockClinics';

export default function AdminByClinic() {
  const [search, setSearch] = useState('');
  const [sortDesc, setSortDesc] = useState(true);

  // 각 치과마다 클릭한 사용자 목록 추가
  const clinicsWithClicks = mockClinics.map((clinic) => {
    const usersClicked = mockUsers.filter((user) =>
      user.clickedClinics.includes(clinic.id)
    );
    return {
      ...clinic,
      users: usersClicked,
      clickCount: usersClicked.length,
    };
  });

  // 검색 필터
  const filteredClinics = clinicsWithClicks.filter((clinic) =>
    clinic.name.includes(search)
  );

  // 클릭 수 정렬
  const sortedClinics = [...filteredClinics].sort((a, b) =>
    sortDesc ? b.clickCount - a.clickCount : a.clickCount - b.clickCount
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '768px', margin: '0 auto' }}>
      <h2>🦷 관리자 대시보드 - 치과 클릭 분석</h2>

      {/* 검색 + 정렬 */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="치과 이름 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button onClick={() => setSortDesc(!sortDesc)}>
          {sortDesc ? '👑 클릭순 ↓' : '👑 클릭순 ↑'}
        </button>
      </div>

      {/* 치과 리스트 */}
      {sortedClinics.map((clinic) => (
        <div
          key={clinic.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#fafafa',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem' }}>
            {clinic.name} <span style={{ color: '#888' }}>({clinic.clickCount}회 클릭)</span>
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>{clinic.address}</p>
          {clinic.users.length > 0 ? (
            <ul style={{ paddingLeft: '1.2rem' }}>
              {clinic.users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.phone})
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#999' }}>클릭한 사용자가 없습니다.</p>
          )}
        </div>
      ))}
    </div>
  );
}