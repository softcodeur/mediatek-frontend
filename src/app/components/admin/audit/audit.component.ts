import { Component, OnInit, ViewChild } from '@angular/core';
import{ AdminService} from '../../../services/admin.service';
import {Audit} from '../../../model/audit';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

 
 AuditList: Array<Audit>;
  dataSource: MatTableDataSource<Audit> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'libelle', 'dateajout','stock'];
 
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllAudit();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllAudit(){
    this.adminService.findAllAudit().subscribe(data => {
      this.AuditList = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
