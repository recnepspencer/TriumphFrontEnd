import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTaskComponent } from './add-task/add-task.component';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { SharedModule } from '../shared/shared.module';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameDay, startOfDay, addMinutes, isToday, format } from 'date-fns';
import { addIcons } from 'ionicons';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  standalone: true,
  imports: [SharedModule]
})

export class ScheduleComponent implements OnInit {

  iconsToAdd = {
    arrowBackOutline,
    arrowForwardOutline
  }

  tasks: any[] = [];
  pastTasks: any[] = [];
  upcomingTasks: any[] = [];
  currentDate: Date = new Date();
  viewMode: string = 'month';
  monthView: any[] = [];
  weekView: any[] = [];
  dayView: any[] = [];
  selectedDay: Date = new Date();
  selectedDayTasks: any[] = [];
  isToday: any = isToday;
  format: any = format;

  constructor(
    private modalController: ModalController,
    private scheduleService: ScheduleService
  ) {
    addIcons(this.iconsToAdd);
  }

  ngOnInit() {
    this.loadTasks();
    this.generateMonthView();
    this.generateWeekView();
    this.generateDayView();
    this.selectDay({ date: new Date() });
  }

  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskComponent
    });
    modal.onDidDismiss().then(() => {
      this.loadTasks();
      this.generateMonthView();
      this.generateWeekView();
      this.generateDayView();
      this.selectDay({ date: new Date() });
    });
    return await modal.present();
  }

  loadTasks() {
    this.scheduleService.index().subscribe((tasks: any[]) => {
      const now = new Date();
      this.tasks = tasks;
      this.pastTasks = tasks.filter(task => new Date(task.timeScheduled) < now);
      this.upcomingTasks = tasks.filter(task => new Date(task.timeScheduled) >= now);
      this.generateMonthView();
      this.generateWeekView();
      this.generateDayView();
      this.selectDay({ date: new Date() });
    });
  }

  toggleTaskCompletion(task: any) {
    task.isCompleted = !task.isCompleted;
    this.scheduleService.update(task._id, task).subscribe(
      { next: this.loadTasks.bind(this) }
    );
  }

  prev() {
    if (this.viewMode === 'month') {
      this.currentDate = subMonths(this.currentDate, 1);
      this.generateMonthView();
    } else if (this.viewMode === 'week') {
      this.currentDate = addDays(this.currentDate, -7);
      this.generateWeekView();
    } else if (this.viewMode === 'day') {
      this.currentDate = addDays(this.currentDate, -1);
      this.generateDayView();
    }
  }

  next() {
    if (this.viewMode === 'month') {
      this.currentDate = addMonths(this.currentDate, 1);
      this.generateMonthView();
    } else if (this.viewMode === 'week') {
      this.currentDate = addDays(this.currentDate, 7);
      this.generateWeekView();
    } else if (this.viewMode === 'day') {
      this.currentDate = addDays(this.currentDate, 1);
      this.generateDayView();
    }
  }

  getCurrentLabel() {
    if (this.viewMode === 'month') {
      return this.currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    } else if (this.viewMode === 'week') {
      const start = startOfWeek(this.currentDate);
      const end = endOfWeek(this.currentDate);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    } else if (this.viewMode === 'day') {
      return this.currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
    return '';
  }

  generateMonthView() {
    const start = startOfWeek(startOfMonth(this.currentDate));
    const end = endOfWeek(endOfMonth(this.currentDate));
    const days = [];
    let date = start;
    while (date <= end) {
      days.push({
        date,
        tasks: this.tasks.filter(task => isSameDay(new Date(task.timeScheduled), date))
      });
      date = addDays(date, 1);
    }
    this.monthView = [];
    for (let i = 0; i < days.length; i += 7) {
      this.monthView.push(days.slice(i, i + 7));
    }
  }

  generateWeekView() {
    const start = startOfWeek(this.currentDate);
    const days = [];
    let date = start;
    for (let i = 0; i < 7; i++) {
      days.push({
        date,
        tasks: this.tasks.filter(task => isSameDay(new Date(task.timeScheduled), date))
      });
      date = addDays(date, 1);
    }
    this.weekView = days;
  }

  generateDayView() {
    this.selectedDayTasks = this.tasks.filter(task => 
      isSameDay(new Date(task.timeScheduled), this.currentDate)
    );
  }

  selectDay(day: any) {
    this.selectedDay = day.date;
    this.selectedDayTasks = this.tasks.filter(task => isSameDay(new Date(task.timeScheduled), this.selectedDay));
  }

  isSelectedDay(day: Date): boolean {
    return isSameDay(day, this.selectedDay);
  }

  getTaskHeader(): string {
    if (isToday(this.selectedDay)) {
      return "Today's Tasks";
    } else {
      return `${format(this.selectedDay, 'MMMM d')} Tasks`;
    }
  }
}
