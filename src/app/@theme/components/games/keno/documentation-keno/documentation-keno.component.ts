import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-documentation-keno',
  templateUrl: './documentation-keno.component.html',
  styleUrls: ['./documentation-keno.component.scss']
})
export class DocumentationKenoComponent implements OnInit, AfterViewInit{
  
  displayedColumns = ['offre', 'description', 'shorcut',];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  isLoading: boolean = false;
  data: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(protected ref: NbDialogRef<DocumentationKenoComponent>) {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  close(){
    this.ref.close(null);
  }
}
