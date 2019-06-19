import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from './data.service';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';


export interface User {
  position: number,
  name    : string,
  weight  : number,
  symbol  : string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  dataSource;
  users: User[];
  
  public options = [{id:"2",status:"All"},{id:"1",status: "Pending"},{id:"0",status:"completed"}];

  constructor(private dialog: MatDialog , private dataService: DataService){}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  ngOnInit() { 
    return this.dataService.getData().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;

    })
  }

  // Filter Values
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Delete a Row
  delete(element) {
    this.dataSource.data = this.dataSource.data.filter(i => i !== element);
  }
 
  // Update a Row
  openDialogEdit(user) {  
    console.log('user=>',user);   
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('result=>',result);      
      this.users.forEach(x=>{    
        if(x.name==result.name){
          x.name=result.name;
          x.position=result.position;
          x.symbol=result.symbol;
          x.weight=result.weight;
        }
      });
    //  console.log('users after edit is => ',this.users);  
      
      this.dataSource = new MatTableDataSource(this.users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;
    });
  }



  // Create a Row 
  openDialogCreate(){   
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe( result => {
      // console.log(result);   
      if(result){
        this.users.push(result);
        this.dataSource = new MatTableDataSource(this.users);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;
    });
  }
  
  
    getColor(status){
    if(status == "completed"){
      return 'green';
    }else {
      return 'red';
    }
  }

  getStyle(status){
    if(status == 'completed'){
      return 'green';
    }else {
      return 'blue';
    }
  }


  onSelectChange(value){

    // console.log(value.trim());

    let index = this.options.findIndex(x=>x.id==value);
    // console.log('indx:',indx);
    
    let status=this.options[index].status;
    
    if(value == '1'){console.log('pending');
    
    if(index!=-1)
      this.dataSource.filter = status.trim().toLowerCase();
    }else if(value == '0'){console.log('completed');
      this.dataSource.filter = status.trim().toLowerCase();
    }else {
      this.dataSource = new MatTableDataSource(this.users);
    }
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }


}




