import { useParams } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

const blogPosts = {
  'launch-strategy': {
    title: {
      en: "Our Comprehensive Launch Strategy",
      pl: "Nasza Kompleksowa Strategia Wdrożenia"
    },
    content: {
      en: `
        <h2>Phase 1: Pre-Launch</h2>
        <ul>
          <li>Finalize app features and testing</li>
          <li>Create marketing materials</li>
          <li>Establish partnerships with vineyards</li>
        </ul>
        
        <h2>Phase 2: Launch</h2>
        <ul>
          <li>App Store Optimization (ASO)</li>
          <li>Press release distribution</li>
          <li>Social media campaigns</li>
        </ul>
        
        <h2>Phase 3: Post-Launch</h2>
        <ul>
          <li>Monitor app performance</li>
          <li>Collect user feedback</li>
          <li>Plan feature updates</li>
        </ul>
      `,
      pl: `
        <h2>Faza 1: Przed Wdrożeniem</h2>
        <ul>
          <li>Finalizacja funkcji aplikacji i testów</li>
          <li>Tworzenie materiałów marketingowych</li>
          <li>Nawiazanie współpracy z winnicami</li>
        </ul>
        
        <h2>Faza 2: Wdrożenie</h2>
        <ul>
          <li>Optymalizacja sklepu aplikacji (ASO)</li>
          <li>Dystrybucja komunikatu prasowego</li>
          <li>Kampanie w mediach społecznościowych</li>
        </ul>
        
        <h2>Faza 3: Po Wdrożeniu</h2>
        <ul>
          <li>Monitorowanie wydajności aplikacji</li>
          <li>Zbieranie opinii użytkowników</li>
          <li>Planowanie aktualizacji funkcji</li>
        </ul>
      `
    }
  }
};

export default function BlogPost() {
  const { postId } = useParams();
  const { t, i18n } = useTranslation();
  const post = blogPosts[postId];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{post.title[i18n.language]}</h1>
      <div 
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content[i18n.language] }}
      />
    </div>
  );
}
