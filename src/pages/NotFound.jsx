import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { TopBar } from '../components/ui';

export default function NotFound() {
  const { t } = useApp();
  const navigate = useNavigate();
  return (
    <>
      <TopBar title={t('notFound')} back />
      <div className="pad center" style={{ paddingTop: '3rem' }}>
        <div className="big-emoji">🪔</div>
        <p className="muted">{t('notFound')}</p>
        <button className="btn p" onClick={() => navigate('/', { replace: true })}>{t('goHome')}</button>
      </div>
    </>
  );
}
