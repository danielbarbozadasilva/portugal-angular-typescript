// filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\admin\agents\agent-form\agent-form.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AgentService } from '@app/core/http';
import { IAgent, IAgentData } from '@app/core/models/models.agent';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
})
export class AgentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private agentService = inject(AgentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  translate = inject(TranslateService);

  form!: FormGroup;
  agentId = signal<string | null>(null);
  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      specialty: ['', [Validators.required]],
      contact: ['', [Validators.required]],
    });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.agentId.set(id);
        this.isEditMode.set(true);
        this.loadAgentData(id);
      } else {
        this.isEditMode.set(false);
      }
    });
  }

  loadAgentData(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.agentService.getAgentById(id).subscribe({
      next: (agent) => {
        this.form.patchValue({
          name: agent.fullName || agent.companyName,
          specialty: agent.specialty,
          contact: agent.primaryEmail || agent.mobilePhone,
        });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading agent:', err);
        this.error.set(this.translate.instant('admin.agents.errors.loadError') || 'Failed to load agent data.');
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const agentData: Partial<IAgentData> = {
      fullName: this.form.value.name,
      specialty: this.form.value.specialty,
      primaryEmail: this.form.value.contact,
    };

    const operation =
      this.isEditMode() && this.agentId()
        ? this.agentService.updateAgent(this.agentId()!, agentData)
        : this.agentService.createAgent(agentData as IAgentData);

    operation.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/admin/agents']);
      },
      error: (err) => {
        console.error('Error saving agent:', err);
        const errorMsg =
          err?.message ||
          (this.isEditMode()
            ? this.translate.instant('admin.agents.errors.updateError')
            : this.translate.instant('admin.agents.errors.createError'));
        this.error.set(errorMsg || 'Failed to save agent.');
        this.saving.set(false);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/agents']);
  }

  get f() {
    return this.form.controls;
  }
}
