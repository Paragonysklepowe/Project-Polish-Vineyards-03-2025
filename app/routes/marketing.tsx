import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';

export default function Marketing() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{t('marketing.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t('marketing.launchPlan.title')}</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>{t('marketing.launchPlan.betaTesting')}</li>
            <li>{t('marketing.launchPlan.softLaunch')}</li>
            <li>{t('marketing.launchPlan.marketingPush')}</li>
            <li>{t('marketing.launchPlan.officialLaunch')}</li>
          </ol>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t('marketing.iterationPlan.title')}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('marketing.iterationPlan.userFeedback')}</li>
            <li>{t('marketing.iterationPlan.analyticsReview')}</li>
            <li>{t('marketing.iterationPlan.featurePrioritization')}</li>
            <li>{t('marketing.iterationPlan.continuousDeployment')}</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Link 
          to="/blog/launch-strategy" 
          className="text-wine-500 hover:text-wine-600"
        >
          {t('marketing.readMore')}
        </Link>
      </div>
    </div>
  );
}
