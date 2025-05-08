// src/app/dashboard/pages/activities/activity-form/activity-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../../../../core/http/activity.service';
import { IActivity, ActivityCategory } from '../../../../../core/models/models.activity';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html'
})
export class ActivityFormComponent implements OnInit {

  activityId: string | null = null;
  loading = false;

  // Lista de categorias
  categories: ActivityCategory[] = ['Passeio', 'Excursão', 'Evento', 'Outro'];

  // Reactive Form
  activityForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl<ActivityCategory>('Passeio', [Validators.required]),
    description: new FormControl<string>(''),
    shortDescription: new FormControl<string>(''),
    startDate: new FormControl<string>('', [Validators.required]),
    endDate: new FormControl<string>('', [Validators.required]),
    location: new FormControl<string>(''),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    totalSlots: new FormControl<number>(0, [Validators.min(0)]),
    bookedSlots: new FormControl<number>(0, [Validators.min(0)]),
    featured: new FormControl<boolean>(false)
  }, {
    validators: [this.dateRangeValidator('startDate', 'endDate')]
  });

  dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startKey)?.value;
      const end = group.get(endKey)?.value;

      if (!start || !end) return null; // se um dos campos estiver vazio, não valida

      // Comparar datas (strings "yyyy-MM-dd" ou Date)
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (endDate < startDate) {
        return { dateRangeInvalid: true };
      }
      return null;
    };
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activitiesService: ActivitiesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    if (this.activityId) {
      this.fetchActivity(this.activityId);
    }
  }

  fetchActivity(id: string): void {
    this.loading = true;
    this.activitiesService.getActivityById(id).subscribe({
      next: (activity) => {
        this.loading = false;
        // Preenchemos o form com os dados retornados
        this.activityForm.patchValue({
          name: activity.name,
          category: activity.category,
          description: activity.description,
          shortDescription: activity.shortDescription,
          startDate: (activity.startDate as string).slice(0, 10), // se vier data completa
          endDate: (activity.endDate as string).slice(0, 10),
          location: activity.location,
          price: activity.price,
          totalSlots: activity.totalSlots,
          bookedSlots: activity.bookedSlots,
          featured: activity.featured
        });
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Erro ao carregar a atividade: ' + (err.message || err), 'Fechar', {
          duration: 5000
        });
      }
    });
  }

  // Acesso fácil aos controles para validação no template
  get f() {
    return this.activityForm.controls;
  }

  saveActivity(): void {
    if (this.activityForm.invalid) {
      this.snackBar.open('Por favor, corrija os campos inválidos.', 'Fechar', { duration: 3000 });
      return;
    }
    this.loading = true;

    // Montamos um objeto Partial<IActivity> a partir do form
    const formValues = this.activityForm.value;
    const data: Partial<IActivity> = {
      name: formValues.name!,
      category: formValues.category!,
      description: formValues.description!,
      shortDescription: formValues.shortDescription!,
      startDate: formValues.startDate!,
      endDate: formValues.endDate!,
      location: formValues.location!,
      price: formValues.price!,
      totalSlots: formValues.totalSlots!,
      bookedSlots: formValues.bookedSlots!,
      featured: formValues.featured!
    };

    if (this.activityId) {
      // Atualizar
      this.activitiesService.updateActivity(this.activityId, data).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Atividade atualizada com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/dashboard/activities']);
        },
        error: (err) => {
          this.loading = false;
          this.snackBar.open('Erro ao atualizar a atividade: ' + (err.message || err), 'Fechar', {
            duration: 5000
          });
        }
      });
    } else {
      // Criar nova
      this.activitiesService.createActivity(data).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Atividade criada com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/dashboard/activities']);
        },
        error: (err) => {
          this.loading = false;
          this.snackBar.open('Erro ao criar a atividade: ' + (err.message || err), 'Fechar', {
            duration: 5000
          });
        }
      });
    }
  }
  imagePreviews: string[] = [];
  uploadedFiles: File[] = [];

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    this.imagePreviews = [];
    this.uploadedFiles = [];

    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        this.uploadedFiles.push(file);
        // Gerar pré-visualização:
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  saveActivity(): void {
    // Se quisermos enviar junto com form data:
    const formData = new FormData();
    // Campos do activityForm
    Object.keys(this.activityForm.value).forEach(key => {
      // Para datas e números, pode ser .toString()
      formData.append(key, this.activityForm.value[key] as any);
    });

    // Imagens
    this.uploadedFiles.forEach(file => {
      formData.append('images', file);
    });

    // Exemplo do service:
    this.loading = true;
    if (this.activityId) {
      this.activitiesService.updateActivityWithImages(this.activityId, formData).subscribe({

      });
    } else {
      this.activitiesService.createActivityWithImages(formData).subscribe({
  
      });
    }
  cancel(): void {
    this.router.navigate(['/dashboard/activities']);
  }
}
