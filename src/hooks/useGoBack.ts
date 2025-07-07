import { useState, useCallback } from 'react';
import type { Document, Project } from '../types';

interface UseGoBackReturn {
  currentActiveDocument: Document | null;
  currentActiveProject: Project | null;
  setActiveDocument: (document: Document | null) => void;
  setActiveProject: (project: Project | null) => void;
  clearActiveDocument: () => void;
  clearActiveProject: () => void;
}

const useGoBack = (): UseGoBackReturn => {
  const [currentActiveDocument, setCurrentActiveDocument] = useState<Document | null>(null);
  const [currentActiveProject, setCurrentActiveProject] = useState<Project | null>(null);

  const setActiveDocument = useCallback((document: Document | null) => {
    setCurrentActiveDocument(document);
  }, []);

  const setActiveProject = useCallback((project: Project | null) => {
    setCurrentActiveProject(project);
  }, []);

  const clearActiveDocument = useCallback(() => {
    setCurrentActiveDocument(null);
  }, []);

  const clearActiveProject = useCallback(() => {
    setCurrentActiveProject(null);
  }, []);

  return {
    currentActiveDocument,
    currentActiveProject,
    setActiveDocument,
    setActiveProject,
    clearActiveDocument,
    clearActiveProject,
  };
};

export default useGoBack;
