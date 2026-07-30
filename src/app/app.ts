import { Component, OnInit, signal } from '@angular/core';

type HubLink = {
  name: string;
  url: string;
  description: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  /** null = still checking, true/false = result */
  protected readonly internetReachable = signal<boolean | null>(null);

  protected readonly links: HubLink[] = [
    { name: 'MIS Helpdesk', url: 'https://helpdesk.lpulaguna.com', description: 'Support and concerns' },
    { name: 'LMS', url: 'https://lms.lpulaguna.edu.ph', description: 'Learning Management System' },
    { name: 'Office 365', url: 'https://office.com', description: 'Email and productivity tools' },
    { name: 'ERP', url: 'https://erp.lpulaguna.edu.ph', description: 'Enterprise resource planning' },
    { name: 'Dorado', url: 'https://dorado.grantthorntonsolutions.ph/1.0.0.17871/Account/Login', description: 'Grant Thornton Dorado' },
    { name: 'Reservation', url: 'https://reservation.lpulaguna.com', description: 'Book rooms and facilities' },
    { name: 'Internet', url: 'http://web.lpu-laguna.edu.ph:8090', description: 'LPU Captive Portal' }
  ];

  ngOnInit(): void {
    const internet = this.links.find((link) => link.name === 'Internet');
    if (!internet) {
      return;
    }

    void this.isReachable(internet.url).then((reachable) => {
      this.internetReachable.set(reachable);
    });
  }

  protected isInternetDisabled(): boolean {
    return this.internetReachable() !== true;
  }

  protected onLinkClick(event: Event, link: HubLink): void {
    if (link.name === 'Internet' && this.isInternetDisabled()) {
      event.preventDefault();
    }
  }

  /**
   * Probes the captive portal. Uses fetch when possible; falls back to an image
   * request so HTTPS pages can still detect the HTTP portal (passive mixed content).
   */
  private isReachable(url: string, timeoutMs = 3500): Promise<boolean> {
    const probe = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`;

    return new Promise((resolve) => {
      let settled = false;
      const finish = (value: boolean) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timer);
        resolve(value);
      };

      const timer = setTimeout(() => finish(false), timeoutMs);

      fetch(probe, {
        mode: 'no-cors',
        cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs)
      })
        .then(() => finish(true))
        .catch(() => {
          const img = new Image();
          img.onload = () => finish(true);
          img.onerror = () => {
            // Captive portals usually return HTML (decode fails → onerror).
            // Resource timing tells us whether the host actually responded.
            requestAnimationFrame(() => {
              const entries = performance.getEntriesByName(probe) as PerformanceResourceTiming[];
              const entry = entries.at(-1);
              if (!entry) {
                finish(false);
                return;
              }

              const status = (entry as PerformanceResourceTiming & { responseStatus?: number })
                .responseStatus;
              const responded =
                entry.encodedBodySize > 0 ||
                entry.transferSize > 0 ||
                (typeof status === 'number' && status > 0) ||
                entry.duration > 100;
              finish(responded);
            });
          };
          img.src = probe;
        });
    });
  }
}
