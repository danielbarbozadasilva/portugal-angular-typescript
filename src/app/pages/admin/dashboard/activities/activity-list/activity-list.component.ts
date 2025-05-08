// activities-list.component.ts (exemplo de sorting local)
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivitiesService } from '@app/core/http/activity.service';
import { IActivity } from '../../models';
import { PageEvent } from '@angular/material/paginator.d-BpWCCOIR';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activity-list.component.html'
})

export class ActivitiesListComponent implements OnInit {
  dataSource = new MatTableDataSource<IActivity>([]); // Usaremos MatTableDataSource
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'category', 'startDate', 'endDate', 'actions'];

  constructor(private activitiesService: ActivitiesService) { }
  // Paginação local
  activitiesAll: IActivity[] = []; // guardamos todos
  activitiesCurrentPage: IActivity[] = []; // exibimos somente a página atual

  // Controles de paginação
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;

  fetchActivities(): void {
    this.dispatch.getActivitiesDashboard(this.currentPage, this.pageSize);
  }
}

onPageChange(event: PageEvent): void {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.updatePage();
}

updatePage(): void {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.activitiesCurrentPage = this.activitiesAll.slice(startIndex, endIndex);
}

  ngOnInit(): void {
    this.fetchActivities();
  }

  ngAfterViewInit(): void {
    // Necessário para inicializar o sorting após a view estar pronta
    this.dataSource.sort = this.sort;
  }
}
