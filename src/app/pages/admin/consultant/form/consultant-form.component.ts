import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IConsultant } from '../../core/models/models.consultant';
import { addConsultant, deleteConsultant, loadConsultant, updateConsultant } from '../../core/redux/consultant/consultant.actions';
import { selectConsultantById } from '../../core/redux/consultant/consultant.selectors';

@Component({
  selector: 'app-consultant-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultant-form.component.html'
})
export class ConsultantFormComponent {
  form: FormGroup<IConsultant>;
  consultantId?: string;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.form = this.fb.nonNullable.group({
      _id: this.fb.control('', { nonNullable: true }),
      user: this.fb.control('', { nonNullable: true }),
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      birthDate: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      country: this.fb.control(''),
      documentType: this.fb.control(''),
      documentValue: this.fb.control(''),
      phones: this.fb.array([this.fb.control('', Validators.required)]),
      address: this.fb.nonNullable.group({
        street: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        number: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        complement: this.fb.control(''),
        district: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        city: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        state: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        zipCode: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        country: this.fb.control('', { nonNullable: true, validators: [Validators.required] })
      }),
      cpf: this.fb.control(''),
      deleted: this.fb.control(false, { nonNullable: true }),
      paymentMethods: this.fb.array([]),
      specialty: this.fb.array([], Validators.required),
      createdAt: this.fb.control(new Date()),
      updatedAt: this.fb.control(new Date())
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.consultantId = id;
        this.store.dispatch(loadConsultant({ id }));
        this.store.select(selectConsultantById(id)).subscribe(consultant => {
          if (consultant) this.form.patchValue(consultant);
        });
      }
    });
  }
  get phones(): FormArray<FormControl<string>> {
    return this.form.get('phones') as FormArray<FormControl<string>>;
  }
  get specialties(): FormArray<FormControl<string>> {
    return this.form.get('specialty') as unknown as FormArray<FormControl<string>>;
  }
  addPhone(): void {
    this.phones.push(this.fb.control('', Validators.required));
  }
  removePhone(index: number): void {
    this.phones.removeAt(index);
  }
  addSpecialty(): void {
    this.specialties.push(this.fb.control('', Validators.required));
  }
  removeSpecialty(index: number): void {
    this.specialties.removeAt(index);
  }
  addPaymentMethod(method: string): void {
    const methods = this.form.get('paymentMethods') as FormArray<FormControl<string>>;
    if (!methods.value.includes(method)) methods.push(this.fb.control(method));
  }
  removePaymentMethod(index: number): void {
    const methods = this.form.get('paymentMethods') as FormArray<FormControl<string>>;
    methods.removeAt(index);
  }
  save(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    if (this.consultantId) {
      this.store.dispatch(updateConsultant({ id: this.consultantId, consultant: value }));
    } else {
      this.store.dispatch(addConsultant({ consultant: value }));
    }
    this.router.navigate(['/consultants']);
  }
  delete(): void {
    if (!this.consultantId) return;
    this.store.dispatch(deleteConsultant({ id: this.consultantId }));
    this.router.navigate(['/consultants']);
  }
}
