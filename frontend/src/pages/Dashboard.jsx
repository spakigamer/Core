import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'pending' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(res.data.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${currentTask._id}`, currentTask);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, currentTask);
      }
      closeModal();
      fetchTasks();
    } catch (err) {
      console.error('Error saving task', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task', err);
      }
    }
  };

  const openEditModal = (task) => {
    setCurrentTask({ ...task });
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTask({ title: '', description: '', status: 'pending' });
    setIsEditing(false);
  };

  return (
    <div className="py-16">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <h1 style={{ textTransform: 'uppercase', letterSpacing: '-0.05em' }}>Dashboard</h1>
          <p className="text-muted">{tasks.length} entries recorded</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ height: '32px', padding: '0 0.875rem' }}>
          <Plus size={14} /> New entry
        </button>
      </header>

      {loading ? (
        <div style={{ padding: '2rem 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Loading records...</div>
      ) : (
        <div className="grid grid-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div 
                key={task._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span className={`badge badge-${task.status}`}>{task.status}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditModal(task)} className="btn btn-ghost" style={{ padding: 0, height: 'auto', color: 'var(--text-muted)' }}>
                      <Edit size={12} />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="btn btn-ghost" style={{ padding: 0, height: 'auto', color: 'var(--danger)' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                
                <h3 style={{ marginBottom: '0.375rem', fontWeight: 600 }}>{task.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{task.description}</p>
                
                <div style={{ marginTop: '1.5rem', fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  REF: {task._id.slice(-8)} / {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && tasks.length === 0 && (
        <div style={{ padding: '4rem 0', textAlign: 'center', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
          <p className="text-muted">No records found.</p>
        </div>
      )}

      {/* Industrial Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1.5rem' }}>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-active)', borderRadius: '4px', width: '100%', maxWidth: '400px', padding: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <h2 style={{ textTransform: 'uppercase', fontSize: '1rem' }}>{isEditing ? 'Edit entry' : 'New entry'}</h2>
                <button onClick={closeModal} className="btn btn-ghost" style={{ padding: 0, height: 'auto' }}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>TITLE</label>
                  <input 
                    type="text" 
                    value={currentTask.title} 
                    onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <textarea 
                    rows="3"
                    value={currentTask.description} 
                    onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })} 
                    required 
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>STATUS</label>
                  <select 
                    value={currentTask.status} 
                    onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '3rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{isEditing ? 'Update record' : 'Create record'}</button>
                  <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
