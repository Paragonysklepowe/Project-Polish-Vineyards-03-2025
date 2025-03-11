import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postFeedback } from '~/utils/api';

export default function Feedback() {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postFeedback({ feedback, rating });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{t('feedback.title')}</h1>
      
      {submitted ? (
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          {t('feedback.thankYou')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">{t('feedback.rating')}</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2">{t('feedback.comments')}</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-wine-500 text-white px-4 py-2 rounded-lg hover:bg-wine-600"
          >
            {t('feedback.submit')}
          </button>
        </form>
      )}
    </div>
  );
}
