import { Check } from 'lucide-react';
import { METHOD_STAGES } from '../data/mock';
import './progressTracker.css';

export default function ProgressTracker({ currentStage }) {
  return (
    <div className="tracker">
      {METHOD_STAGES.map((stage, i) => {
        const status =
          stage.id < currentStage ? 'done' : stage.id === currentStage ? 'current' : 'upcoming';
        return (
          <div className={`tracker-item ${status}`} key={stage.id}>
            <div className="tracker-line">
              <div className="tracker-dot">
                {status === 'done' ? <Check size={13} strokeWidth={3} /> : stage.id}
              </div>
              {i < METHOD_STAGES.length - 1 && <div className="tracker-connector" />}
            </div>
            <div className="tracker-text">
              <strong>{stage.label}</strong>
              <span>{stage.desc}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
