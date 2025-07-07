import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import WindowLeftMenu from './WindowLeftMenu';

// Types
type Project = {
  id: string;
  name: string;
  title: Record<string, string>;
  description: Record<string, string>;
  technologies: string[];
  image: string;
  link?: string;
  isFocus: boolean;
  isActive: boolean;
  component?: string;
};

type Category = {
  id: string;
  name: Record<string, string>;
  projects: Project[];
};

interface MyProjectsProps {
  leftMenuType?: string;
}

// Sample data - replace with your actual data import
const projectData: { categories: Category[] } = {
  categories: [
    {
      id: 'web',
      name: { en: 'Web Projects', fr: 'Projets Web' },
      projects: [
        // Add your projects here
      ]
    }
  ]
};

const MyProjects: React.FC<MyProjectsProps> = ({ leftMenuType }) => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Initialize categories from project data
  useEffect(() => {
    const initializedCategories: Category[] = projectData.categories.map((category: Category) => ({
      ...category,
      projects: category.projects.map((project: Project) => ({
        ...project,
        isFocus: false,
        isActive: false
      }))
    }));
    setCategories(initializedCategories);
    
    // Set first category as active by default
    if (initializedCategories.length > 0) {
      setActiveCategory(initializedCategories[0].id);
    }
  }, []);

  const focusProject = (project: Project) => {
    if (project.isFocus) return;

    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        projects: category.projects.map(p => ({
          ...p,
          isFocus: p.id === project.id,
          isActive: p.id === project.id ? p.isActive : false
        }))
      }))
    );
  };

  const toggleProject = (project: Project) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        projects: category.projects.map(p => ({
          ...p,
          isActive: p.id === project.id ? !p.isActive : p.isActive,
          isFocus: p.id === project.id ? true : p.isFocus
        }))
      }))
    );

    setSelectedProject(prev => 
      prev?.id === project.id ? null : project
    );
  };

  const closeAllProjects = () => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        projects: category.projects.map(p => ({
          ...p,
          isActive: false,
          isFocus: false
        }))
      }))
    );
    setSelectedProject(null);
  };

  const getLocalizedCategoryName = (category: Category) => {
    return category.name[i18n.language] || category.name['en'] || '';
  };

  const getLocalizedProjectName = (project: Project) => {
    if (typeof project.title === 'string') return project.title;
    return project.title[i18n.language] || project.title['en'] || project.name;
  };

  const renderProjectContent = () => {
    if (!selectedProject) return null;

    // You can implement dynamic component loading here if needed
    return (
      <div className="project-content p-4">
        <h2 className="text-xl font-bold mb-4">
          {getLocalizedProjectName(selectedProject)}
        </h2>
        {selectedProject.image && (
          <img 
            src={selectedProject.image} 
            alt={getLocalizedProjectName(selectedProject)}
            className="w-full max-h-48 object-cover mb-4"
          />
        )}
        <p className="mb-4">
          {selectedProject.description[i18n.language] || selectedProject.description['en']}
        </p>
        {selectedProject.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedProject.technologies.map(tech => (
              <span key={tech} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
        )}
        {selectedProject.link && (
          <a 
            href={selectedProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {t('projects.viewProject')}
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full">
      {/* Left menu */}
      {leftMenuType && <WindowLeftMenu leftMenuType={leftMenuType} />}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Categories */}
        <div className="flex border-b">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 ${
                activeCategory === category.id 
                  ? 'border-b-2 border-blue-500 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              {getLocalizedCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Project list */}
          <div className="w-1/3 border-r overflow-y-auto">
            {activeCategory && categories.find(c => c.id === activeCategory)?.projects.map(project => (
              <div 
                key={project.id}
                className={`p-3 border-b cursor-pointer ${
                  project.isFocus ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onMouseEnter={() => focusProject(project)}
                onClick={() => toggleProject(project)}
              >
                <h3 className="font-medium">
                  {getLocalizedProjectName(project)}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.description[i18n.language]?.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>

          {/* Project details */}
          <div className="flex-1 overflow-y-auto">
            {selectedProject ? (
              renderProjectContent()
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                {t('projects.selectProject')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
