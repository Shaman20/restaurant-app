import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendsData: any[] = []; // This array will store the friends data

  constructor(
    private friendsService: FriendsService,
    private dialogRef: MatDialogRef<FriendsComponent>
  ) {}

  ngOnInit() {
    this.getFriendsData();
  }

  getFriendsData() {
    this.friendsService.getFriends().subscribe(
      (data) => {
        this.friendsData = data.friends; // Assign the retrieved data to friendsData
      },
      (error) => {}
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
