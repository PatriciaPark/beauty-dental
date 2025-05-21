import { useState } from 'react';
import { mockUsers as initialUsers } from '../data/mockUsers';
import { mockClinics } from '../data/mockClinics';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function AdminPage() {
    const [users, setUsers] = useState(initialUsers);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

    // 로그아웃 버튼
    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('isAdmin');
            window.location.href = '/admin/login';
        }
    };

    // 즐겨찾기 버튼
    const toggleFavorite = (userId) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user
            )
        );
    };

    // 삭제 버튼
    const deleteUser = (userId) => {
        if (window.confirm('정말 이 사용자를 삭제할까요?')) {
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        }
    };

    // 치과 이름 가져오기
    const getClinicName = (clinicId) => {
        const clinic = mockClinics.find((c) => c.id === clinicId);
        return clinic ? clinic.name : '(삭제된 치과)';
    };

    // 즐겨찾기 버튼 눌렀을 때 보여줄 사용자 필터링
    const filteredUsers = showOnlyFavorites
        ? users.filter((u) => u.isFavorite)
        : users;

    // Excel 다운로드
    const downloadExcel = () => {
        const rows = [];

        users.forEach((user) => {
            user.clickedClinics.forEach((click) => {
                const clinicName = getClinicName(click.clinicId);
                rows.push({
                    이름: user.name,
                    연락처: user.phone,
                    즐겨찾기: user.isFavorite ? '⭐' : '',
                    치과: clinicName,
                    시간: new Date(click.timestamp).toLocaleString(),
                });
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '클릭 기록');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const blob = new Blob([excelBuffer], {
            type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // 날짜 추가된 파일명 만들기
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}${mm}${dd}`;

        saveAs(blob, `클릭기록_${formattedDate}.xlsx`);
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '768px', margin: '0 auto' }}>
            {/* 로그아웃 버튼 */}
            <button onClick={handleLogout} style={{ float: 'right', color: 'gray' }}>
                로그아웃
            </button>

            <h2>👩‍⚕️ 관리자 페이지 - 사용자 클릭 기록</h2>

            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowOnlyFavorites((prev) => !prev)}>
                    {showOnlyFavorites ? '⭐ 전체 보기' : '⭐ 즐겨찾기만 보기'}
                </button>
                <button onClick={downloadExcel}>📥 Excel 다운로드</button>
            </div>

            {filteredUsers.map((user) => (
                <div
                    key={user.id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        backgroundColor: user.isFavorite ? '#fffce7' : '#f9f9f9',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>
                            {user.name} ({user.phone}) {user.isFavorite && <span>⭐</span>}
                        </h3>
                        <div>
                            <button onClick={() => toggleFavorite(user.id)} style={{ marginRight: '0.5rem' }}>
                                {user.isFavorite ? '⭐ 즐겨찾기 해제' : '📌 즐겨찾기'}
                            </button>
                            <button onClick={() => deleteUser(user.id)} style={{ color: 'red' }}>
                                🗑 삭제
                            </button>
                        </div>
                    </div>

                    <div>
                        <p style={{ fontWeight: 'bold' }}>🧭 활동 로그:</p>
                        {user.clickedClinics.length > 0 ? (
                            <ul>
                                {[...user.clickedClinics]
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                    .map((click, index) => (
                                        <li key={index}>
                                            [{new Date(click.timestamp).toLocaleString()}] {getClinicName(click.clinicId)}
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p style={{ color: 'gray' }}>기록 없음</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}