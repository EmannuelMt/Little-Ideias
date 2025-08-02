import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de nuvem de tags interativa
 */
export default function TagCloud({ ideas, onTagClick, maxTags = 20 }) {
  const tags = useMemo(() => {
    const allTechs = ideas.flatMap(idea => idea.technologies || []);
    const counts = {};
    
    allTechs.forEach(tech => {
      counts[tech] = (counts[tech] || 0) + 1;
    });
    
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxTags)
      .map(([name, count]) => ({ name, count }));
  }, [ideas, maxTags]);

  const getTagSize = (count, maxCount) => {
    const minSize = 12;
    const maxSize = 24;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  const maxCount = tags.length > 0 ? Math.max(...tags.map(t => t.count)) : 1;

  return (
    <div className="tag-cloud" aria-label="Nuvem de tecnologias">
      {tags.map(({ name, count }) => (
        <button
          key={name}
          className="tag"
          onClick={() => onTagClick?.(name)}
          style={{
            fontSize: `${getTagSize(count, maxCount)}px`,
            opacity: 0.5 + (count / maxCount) * 0.5
          }}
          aria-label={`Filtrar por ${name} (${count} ocorrências)`}
        >
          {name}
          <span className="tag-count">{count}</span>
        </button>
      ))}
    </div>
  );
}

TagCloud.propTypes = {
  ideas: PropTypes.array.isRequired,
  onTagClick: PropTypes.func,
  maxTags: PropTypes.number
};