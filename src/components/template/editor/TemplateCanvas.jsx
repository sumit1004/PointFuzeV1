import { useState, useRef, useEffect, useMemo } from 'react';
import { LAYER_TYPES } from '../../../constants/templateConstants';
import { compileTemplate } from '../../../services/template/templateCompiler';

/**
 * Basic Layer renderer that takes style objects and maps them to DOM CSS.
 */
const LayerRenderer = ({ layer, isSelected, onSelect }) => {
  const { style, type, content, compiledSubLayers } = layer;
  
  const cssStyles = {
    position: 'absolute',
    left: `${style.x}px`,
    top: `${style.y}px`,
    width: `${style.width}px`,
    height: `${style.height}px`,
    zIndex: style.zIndex,
    fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
    color: style.color,
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    textAlign: style.align,
    border: isSelected ? '2px dashed #ff7a00' : 'none',
    boxShadow: isSelected ? '0 0 10px rgba(255, 122, 0, 0.5)' : 'none',
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: style.align === 'center' ? 'center' : style.align === 'right' ? 'flex-end' : 'flex-start',
    backgroundColor: type !== LAYER_TYPES.TEXT && !compiledSubLayers ? 'rgba(255,255,255,0.02)' : 'transparent',
    overflow: 'hidden'
  };

  const renderContent = () => {
    // If the compiler generated subLayers (like for Widgets), render them relatively!
    if (compiledSubLayers && compiledSubLayers.length > 0) {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {compiledSubLayers.map(sub => (
            <div key={sub.id} style={{ 
              position: 'absolute', 
              left: `${sub.style.x - style.x}px`, // Relative to parent
              top: `${sub.style.y - style.y}px`, 
              fontSize: `${sub.style.fontSize}px`, 
              color: sub.style.color,
              fontWeight: sub.style.fontWeight 
            }}>
              {sub.content}
            </div>
          ))}
        </div>
      );
    }

    switch (type) {
      case LAYER_TYPES.TEXT:
        return <span>{content || 'Double click to edit'}</span>;
      case LAYER_TYPES.IMAGE:
        return <div className="text-center w-full opacity-50">Image Placeholder</div>;
      case LAYER_TYPES.SHAPE:
        return <div className="w-full h-full bg-[rgba(255,255,255,0.1)]"></div>;
      default:
        return <div>Unknown Layer Type</div>;
    }
  };

  return (
    <div 
      style={cssStyles}
      onClick={(e) => { e.stopPropagation(); onSelect(layer.id); }}
      className={`group ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : 'hover:ring-1 hover:ring-[rgba(255,255,255,0.3)]'}`}
    >
      {renderContent()}
      
      {/* Selection Handles (Visual Only for now) */}
      {isSelected && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 bg-white border border-primary -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-white border border-primary translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-white border border-primary -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-white border border-primary translate-x-1/2 translate-y-1/2" />
        </>
      )}
    </div>
  );
};

const TemplateCanvas = ({ template, selectedLayerId, onSelectLayer, onUpdateLayer }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const { width, height, backgroundColor } = template.settings;

  // Auto-scale the canvas to fit the window exactly
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      
      // Calculate scale to fit 80% of container width/height
      const scaleX = (container.clientWidth * 0.9) / width;
      const scaleY = (container.clientHeight * 0.9) / height;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  const canvasStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: backgroundColor || '#000000',
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
  };

  const compiledTemplate = useMemo(() => {
    // Mock data payload for the editor preview
    const mockData = {
      TOURNAMENT_NAME: 'Summer Championship',
      MATCH_DATE: 'Aug 14, 2026',
      MATCH_NUMBER: 'Match 1',
      MAP_NAME: 'Erangel'
    };
    return compileTemplate(template, mockData);
  }, [template]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center cursor-default"
      onClick={() => onSelectLayer(null)}
    >
      <div style={canvasStyle}>
        {/* Render Grid for alignment */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        {compiledTemplate.layers.map(layer => (
          <LayerRenderer 
            key={layer.id} 
            layer={layer} 
            isSelected={selectedLayerId === layer.id}
            onSelect={onSelectLayer}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateCanvas;
