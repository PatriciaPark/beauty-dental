// src/pages/ClinicDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { mockClinics } from '../data/mockClinics';

export default function ClinicDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const clinic = mockClinics.find((c) => c.id === id);

    if (!clinic) return <div>존재하지 않는 치과입니다.</div>;

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (savedUser) {
            const clicked = new Set(savedUser.clickedClinics || []);
            clicked.add(id); // 현재 클릭한 clinic id
            const updatedUser = {
                ...savedUser,
                clickedClinics: Array.from(clicked),
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        }
    }, [id]);

    return (
        <div style={{ padding: '1.5rem' }}>
            <button onClick={() => navigate('/map')}>← 목록으로 돌아가기</button>
            <h1>{clinic.name}</h1>
            <p><strong>주소:</strong> {clinic.address}</p>
            <p><strong>설명:</strong> {clinic.description}</p>
            {/* 위치 정보는 나중에 지도 연동할 때 활용 */}
        </div>
    );
}