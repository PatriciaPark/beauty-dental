// src/pages/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !phone || !agree) {
            alert('모든 항목을 입력하고 동의해주세요!');
            return;
        }

        // 나중에 이 정보를 Firebase에 저장
        // Firestore 연동 예정
        // firestore.collection("users").doc(userId).update({
        //     clickedClinics: firebase.firestore.FieldValue.arrayUnion(clinicId)
        //   });
          
        const userInfo = {
            name,
            phone,
            agree,
            clickedClinics: [], // 초기화
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 리스트 페이지로 이동
        navigate('/map');
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>치과 찾기 - 사용자 정보 입력</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름: </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>연락처: </label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        개인정보 수집 및 이용에 동의합니다.
                    </label>
                </div>
                <button type="submit">확인하고 지도 보기</button>
            </form>
        </div>
    );
}