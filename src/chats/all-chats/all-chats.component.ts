import { Chat } from './../../interfaces/chat';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { environment } from '../../environments/environment.development';
import { TimeFormatService } from '../../services/time-format.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-chats.component.html',
  styleUrl: './all-chats.component.scss',
})
export class AllChatsComponent implements OnInit {
  AllCHats: Chat[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  myUserId: string = '';
  itemsPerPage: number = 10;
  pages: number[] = [];
  customerId: string = '';

  constructor(
    private chatService: ChatService,
    private router: Router,
    private FormatTime: TimeFormatService
  ) {}

  ngOnInit(): void {
    this.myUserId = this.getCurrentUserId();
    this.loadChats(this.currentPage);
  }

  loadChats(page: number): void {
    this.chatService
      .getAllChats(page, this.itemsPerPage)
      .subscribe((response: any) => {
        console.log(response);
        this.AllCHats = response.data.map((chat: Chat) => ({
          ...chat,
          user: {
            ...chat.user,
            profileImage: `${environment.UrlForImages}/${chat.user.profileImage}`,
          },
          lastMessageSentAtFormatted: this.FormatTime.formatingTime(
            new Date(chat.lastMessageSentAt)
          ),
        }));
        this.totalPages = response.paginationInfo.totalPages;
        this.pages = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i + 1);
      });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadChats(this.currentPage);
    }
  }

  goToMessage(chatId: any, userId: string): void {
    this.router.navigate(['/Chats/chat', chatId]);
    localStorage.setItem('customerId', userId);
    sessionStorage.setItem('customerId', userId);
  }

  getCurrentUserId(): string {
    return 'current-user-id';
  }
}
