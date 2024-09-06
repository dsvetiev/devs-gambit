import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-play-against-computer-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton, CommonModule],
  templateUrl: './play-against-computer-dialog.component.html',
  styleUrl: './play-against-computer-dialog.component.css'
})
export class PlayAgainstComputerDialogComponent {
    public stockfishLevels: readonly number[] = [1, 2, 3, 4, 5];
    public stockfishLevel: number = 1;
}
