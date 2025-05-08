import { Routes } from '@angular/router';

export const AGENT_ROUTES: Routes = [
  {
    path: '', // Rota /admin/agents -> Lista de agentes
    loadComponent: () => import('./agent-list/agent-list.component').then((m) => m.AgentListComponent),
    title: 'Admin - Agent List',
  },
  {
    path: 'new', // Rota /admin/agents/new -> Formulário de criação
    loadComponent: () => import('./agent-form/agent-form.component').then((m) => m.AgentFormComponent),
    title: 'Admin - New Agent',
  },
  {
    path: 'edit/:id', // Rota /admin/agents/edit/{agentId} -> Formulário de edição
    loadComponent: () => import('./agent-form/agent-form.component').then((m) => m.AgentFormComponent),
    title: 'Admin - Edit Agent',
  },
];
