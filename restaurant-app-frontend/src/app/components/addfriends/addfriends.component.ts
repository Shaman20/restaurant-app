import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.scss'],
})
export class AddfriendsComponent {
  users: any[] = [];

  constructor(
    private friendsService: FriendsService,
    private dialogRef: MatDialogRef<AddfriendsComponent>,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.loadUsers(); // Fetch the list of users when the component initializes
    }
  }

  loadUsers() {
    this.friendsService.getUsers().subscribe(
      (data) => {
        // Assume 'isSelected' is initially false for all users
        this.users = Object.values(data.users).map((user: any) => ({
          ...user,
          isSelected: false,
          isFriend: this.friendsService.getFriendStatus(user.id),
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  toggleSelection(user: any) {
    user.isSelected = !user.isSelected;
  }

  addSelectedFriends() {
    const selectedFriends = this.users.filter((user) => user.isSelected);

    if (selectedFriends.length === 0) {
      this.snackBar.openErrorSnackbar(
        'Please select at least one friend to add.',
        'Close'
      );
      return;
    }

    selectedFriends.forEach((friend) => {
      this.friendsService.addFriend(friend.id).subscribe(
        (response) => {
          // Update the 'isFriend' property for the added friend
          const friendIndex = this.users.findIndex(
            (user) => user.id === friend.id
          );
          if (friendIndex !== -1) {
            this.users[friendIndex].isFriend = true;
            this.friendsService.setFriendStatus(friend.id, true);
          }
        },
        (error) => {
          console.error('Error adding friend:', error);
        }
      );
    });

    localStorage.setItem('users', JSON.stringify(this.users));

    this.snackBar.openSuccessSnackbar('Friends added successfully.', 'Close');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
