import { useState, useEffect } from 'react';
import { MessageSquare, Mail, User, Calendar, Trash2, Download } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  userId: string | null;
}

export function FeedbackViewer() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = () => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    // Sort by newest first
    const sorted = storedFeedbacks.sort((a: Feedback, b: Feedback) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setFeedbacks(sorted);
  };

  const handleDelete = (id: string) => {
    const updatedFeedbacks = feedbacks.filter(f => f.id !== id);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    setFeedbacks(updatedFeedbacks);
    toast.success('Feedback deleted');
  };

  const handleExportCSV = () => {
    if (feedbacks.length === 0) {
      toast.error('No feedbacks to export');
      return;
    }

    const headers = ['Date', 'Name', 'Email', 'Subject', 'Message', 'User ID'];
    const rows = feedbacks.map(f => [
      new Date(f.timestamp).toLocaleString(),
      f.name,
      f.email,
      f.subject,
      f.message,
      f.userId || 'Guest'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Feedbacks exported successfully');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all feedbacks? This action cannot be undone.')) {
      localStorage.setItem('feedbacks', '[]');
      setFeedbacks([]);
      toast.success('All feedbacks cleared');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl text-gray-900 mb-2">Feedback Messages</h1>
            <p className="text-xl text-gray-600">
              View and manage user feedback ({feedbacks.length} total)
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleExportCSV}
              variant="outline"
              disabled={feedbacks.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={feedbacks.length === 0}
            >
              Clear All
            </Button>
          </div>
        </div>

        {feedbacks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl text-gray-900 mb-2">No Feedback Yet</h2>
            <p className="text-gray-600">
              User feedback messages will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{feedback.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <a 
                          href={`mailto:${feedback.email}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {feedback.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(feedback.timestamp).toLocaleString()}
                      {feedback.userId && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Registered User
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(feedback.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Subject:</span>
                    </div>
                    <p className="text-gray-900 ml-6">{feedback.subject}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Message:</span>
                    </div>
                    <p className="text-gray-700 ml-6 whitespace-pre-wrap">{feedback.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg text-gray-900 mb-2">📍 Current Storage: Browser localStorage</h3>
          <p className="text-gray-600 mb-3">
            Feedback messages are currently stored locally in the browser. This means:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            <li>Data is only visible on this device and browser</li>
            <li>Clearing browser data will delete all feedbacks</li>
            <li>No email notifications are sent</li>
            <li>Data is not backed up to a server</li>
          </ul>
          <p className="text-gray-700">
            💡 <strong>Recommendation:</strong> For production use, integrate with a backend service like Supabase 
            to store feedbacks securely, send email notifications, and access them from anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}
