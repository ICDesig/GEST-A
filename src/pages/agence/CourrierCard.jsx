import { Mail, Clock, CheckCircle2, Hourglass } from 'lucide-react';

const CourrierCard = ({ data }) => {
  const { sender, subject, status, priority, date, time } = data;

  const statusColor = {
    pending: 'text-yellow-500',
    processed: 'text-green-600',
    unknown: 'text-gray-400'
  };

  const statusIcon = {
    pending: <Hourglass size={18} className={statusColor[status]} />,
    processed: <CheckCircle2 size={18} className={statusColor[status]} />,
    unknown: <Clock size={18} className={statusColor[status]} />
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Mail size={20} className="text-gray-500" />
          {subject}
        </h3>
        <div className="flex items-center gap-1">
          {statusIcon[status]}
          <span className={`text-sm font-medium ${statusColor[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600"><strong>Expéditeur :</strong> {sender}</p>
      <p className="text-sm text-gray-600"><strong>Date :</strong> {date} à {time}</p>
      <p className="text-sm text-gray-600"><strong>Priorité :</strong> {priority}</p>
    </div>
  );
};

export default CourrierCard;
