/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './lib/AuthContext';
import Home from './pages/Home';
import { MiLubricentro } from './pages/MiLubricentro';
import { PanelAdmin } from './pages/PanelAdmin';
import { Productos } from './pages/Productos';
import { ConsultaVehiculo } from './pages/ConsultaVehiculo';
import { InvitacionFamilia } from './pages/InvitacionFamilia';
import { Empresas } from './pages/Empresas';
import { PortalEmpresa } from './pages/PortalEmpresa';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);

    // Global listener for internal links (e.g. href="/MiLubricentro") to support smooth SPA routing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//') && !target.hasAttribute('target')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    const normalized = currentPath.toLowerCase();

    if (normalized.startsWith('/milubricentro')) {
      return <MiLubricentro onNavigate={handleNavigate} />;
    }
    if (normalized.startsWith('/paneladmin')) {
      return <PanelAdmin onNavigate={handleNavigate} />;
    }
    if (normalized.startsWith('/productos')) {
      return <Productos onNavigate={handleNavigate} />;
    }
    if (normalized.startsWith('/consulta')) {
      return <ConsultaVehiculo onNavigate={handleNavigate} />;
    }
    if (normalized.startsWith('/invitacion')) {
      return <InvitacionFamilia onNavigate={handleNavigate} />;
    }
    if (normalized.startsWith('/empresas')) {
      return <Empresas onNavigate={handleNavigate} />;
    }
    if (normalized.startsWith('/portal-empresa')) {
      return <PortalEmpresa onNavigate={handleNavigate} />;
    }

    return <Home />;
  };

  return (
    <AuthProvider>
      {renderPage()}
    </AuthProvider>
  );
}
