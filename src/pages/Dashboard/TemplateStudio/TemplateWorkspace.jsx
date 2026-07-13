import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { fetchUserTemplates, duplicateTemplate, deleteTemplate } from '../../../services/template/templateService';
import { Plus, Copy, Trash2, Edit2, LayoutTemplate } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from '../../../components/ui/Skeleton';
import toast from 'react-hot-toast';

const TemplateWorkspace = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTemplates = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await fetchUserTemplates(user.uid);
      setTemplates(data);
    } catch (err) {
      toast.error('Failed to load templates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, [user]);

  const handleDuplicate = async (template) => {
    try {
      await duplicateTemplate(user.uid, template);
      toast.success('Template duplicated!');
      loadTemplates();
    } catch (err) {
      toast.error('Failed to duplicate template.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTemplate(user.uid, id);
      toast.success('Template deleted!');
      loadTemplates();
    } catch (err) {
      toast.error('Failed to delete template.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-h2 text-gradient">Template Studio</h2>
          <p className="text-body mt-1">Design premium broadcast graphics for your tournaments.</p>
        </div>
        <Link to="/dashboard/template-studio/new" className="btn btn-primary flex items-center gap-2 shadow-glow">
          <Plus size={18} /> New Template
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map(template => (
            <div key={template.metadata.id} className="glass-panel rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden group hover:border-primary transition-all duration-300">
              {/* Thumbnail Placeholder */}
              <div className="aspect-video bg-[rgba(0,0,0,0.5)] flex items-center justify-center border-b border-[rgba(255,255,255,0.05)] relative overflow-hidden">
                <LayoutTemplate size={48} className="text-[rgba(255,255,255,0.1)]" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm gap-4">
                  <Link to={`/dashboard/template-studio/${template.metadata.id}`} className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform">
                    <Edit2 size={20} />
                  </Link>
                  <button onClick={() => handleDuplicate(template)} className="p-3 bg-[rgba(255,255,255,0.1)] text-white rounded-full hover:scale-110 transition-transform">
                    <Copy size={20} />
                  </button>
                  {!template.metadata.isBuiltIn && (
                    <button onClick={() => handleDelete(template.metadata.id)} className="p-3 bg-error text-white rounded-full hover:scale-110 transition-transform">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                {template.metadata.isBuiltIn && (
                  <span className="absolute top-2 right-2 text-[10px] uppercase font-bold bg-primary px-2 py-0.5 rounded text-black">Built-in</span>
                )}
              </div>
              
              {/* Meta */}
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{template.metadata.name}</h3>
                <p className="text-xs text-text-secondary mt-1">{template.metadata.category.replace('_', ' ')} • {template.settings.width}x{template.settings.height}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateWorkspace;
