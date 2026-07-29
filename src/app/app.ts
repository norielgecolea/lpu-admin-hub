import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly links = [
    { name: 'MIS Helpdesk', url: 'https://helpdesk.lpulaguna.com', description: 'Support and concerns' },
    { name: 'LMS', url: 'https://lms.lpulaguna.edu.ph', description: 'Learning Management System' },
    { name: 'Office 365', url: 'https://office.com', description: 'Email and productivity tools' },
    { name: 'ERP', url: 'https://erp.lpulaguna.edu.ph', description: 'Enterprise resource planning' },
    { name: 'Dorado', url: 'https://dorado.grantthorntonsolutions.ph/1.0.0.17871/Account/Login', description: 'Grant Thornton Dorado' },
    { name: 'Reservation', url: 'https://reservation.lpulaguna.com', description: 'Book rooms and facilities' },
    { name: 'Internet', url: 'http://web.lpu-laguna.edu.ph:8090', description: 'LPU Captive Portal' }
  ];
}
