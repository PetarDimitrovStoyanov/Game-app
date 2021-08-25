import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];
  email: string;
  page = 1;
  key = 'id';
  reverse = false;

  closeResult = '';
  currentUser: User;

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });

  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.reloadCurrentRoute();
    });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search() {
    if (this.email === '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter(res => {
        return res.email.toLowerCase().match(this.email.toLowerCase());
      });
    }
  }

  sort(id: string) {
    this.key = id;
    this.reverse = !this.reverse;
  }

  /*Modal*/
  open(content, user) {
    this.currentUser = user;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit(id, form: NgForm) {
    const role = form.value.roles === undefined ? 'Not an admin' : form.value.roles;
    const updatedUser = {email: form.value.email, name: form.value.name, roles: [`${role}`]};
    this.updateUser(id, updatedUser);
  }

  updateUser(id: string, updatedUser) {
    this.userService.editUser(id, updatedUser).subscribe(data => {
      this.reloadCurrentRoute();
    });
  }
}
