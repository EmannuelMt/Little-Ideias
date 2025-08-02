import { useEffect } from 'react';

export function useDeadlineNotifications(ideas) {
  useEffect(() => {
    const checkDeadlines = () => {
      ideas.forEach(idea => {
        if (idea.deadline && new Date(idea.deadline) < new Date()) {
          // Implementar notificação real
          console.log(`Ideia "${idea.name}" venceu!`);
        }
      });
    };

    const interval = setInterval(checkDeadlines, 3600000); // Checar a cada hora
    return () => clearInterval(interval);
  }, [ideas]);
}