import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClinics } from '../data/mockClinics';

export default function MapPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const map = new window.naver.maps.Map('map', {
            center: new window.naver.maps.LatLng(37.5665, 126.9780),
            zoom: 13,
        });

        mockClinics.forEach((clinic) => {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(clinic.lat, clinic.lng),
                map,
            });

            const infoWindow = new window.naver.maps.InfoWindow({
                content: `<div style="padding:8px">${clinic.name}</div>`,
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
            {/* 상단 지도 */}
            <div
                id="map"
                style={{
                    width: '100%',
                    height: '60%',
                    minHeight: '300px',
                    backgroundColor: '#f0f0f0',
                }}
            ></div>

            {/* 하단 리스트 */}
            <div
                style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    flex: 1,
                }}
            >
                <h2 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🦷 치과 리스트</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {mockClinics.map((clinic) => (
                        <li
                            key={clinic.id}
                            style={{ marginBottom: '16px', cursor: 'pointer' }}
                            onClick={() => navigate(`/clinic/${clinic.id}`)}
                        >
                            <strong>{clinic.name}</strong><br />
                            {clinic.address}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
