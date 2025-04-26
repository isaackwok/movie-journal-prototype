import React from 'react';
import EmotionIcons from '../EmotionIcons';

interface EmotionSectionProps {
  emotion: { label: string; icon: string; reason: string } | null;
  setEmotion: (val: { label: string; icon: string; reason: string }) => void;
}

const EmotionSection: React.FC<EmotionSectionProps> = ({ emotion, setEmotion }) => (
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  }}>
    <div style={{
      width: '100%',
      maxWidth: 370,
      margin: '0 auto',
      padding: '32px 16px 24px 16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px #0001',
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 12 }}>How do you feel after watching this movie?</div>
      <div style={{ color: '#888', fontSize: 13, marginBottom: 16, textAlign: 'center', width: '100%', whiteSpace: 'normal', wordBreak: 'break-word' }}>Describe your emotions while watching the film. Try to focus on a few adjectives.</div>
      <EmotionIcons value={emotion} onChange={setEmotion} grid={4} />
    </div>
  </div>
);

export default EmotionSection;
