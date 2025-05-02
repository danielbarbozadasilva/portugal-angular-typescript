import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { IActivity } from '../../core/models/models.activity';
import {
  selectActivityLoading,
  selectActivityError,
} from '../../core/store/activity/activity.selectors';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  activity$: Observable<IActivity | null> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;

  activityData: IActivity | null = null;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loading$ = this.store.select(selectActivityLoading);
    this.error$ = this.store.select(selectActivityError);
    // this.activity$ = this.store.select(selectActivityCurrentPage);

    // this.route.paramMap
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     switchMap((params) => {
    //       const id = params.get('id');
    //       if (!id) {
    //         console.error('Activity ID not found in route parameters.');
    //         this.router.navigate(['/not-found']);
    //         throw new Error('Activity ID not found');
    //       }
    //       this.store.dispatch(ActivityActions.loadActivityById({ id }));
    //       return this.activity$;
    //     })
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this.activityData = data;
    //     },
    //     error: (err) => {
    //       console.error('Error in activity subscription pipeline:', err);
    //     },
    //   });

    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        console.error('Error fetching activity details from store:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToCart(activity: IActivity): void {
    if (!activity || !activity._id) return;
    console.log('Dispatching add to cart for activity:', activity._id);
    alert('Atividade adicionada ao carrinho (implementação pendente com NgRx)!');
  }

  shareActivity(activity: IActivity): void {
    console.log('Sharing activity:', activity);
    alert('Compartilhamento de atividade (implementação pendente)!');
  }

  createGroup(activity: IActivity): void {
    if (!activity || !activity._id) return;
    console.log('Dispatching create group for activity:', activity._id);
    alert('Criação de grupo (implementação pendente com NgRx)!');
  }
}
