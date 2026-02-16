import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private zone: NgZone){}

  currentSlide = 0;

  slides = ["p2.png","p1.png","p2.png","p1.png"];

  ngOnInit() {
    this.zone.runOutsideAngular(()=>{
      setInterval(()=>{
        this.zone.run(()=>{
          this.nextSlide();
        });
      },4000);
    });
  }

  nextSlide(){
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(i:number){
    this.currentSlide = i;
  }

    features = [
        {
            icon: '🛡️',
            title: 'Real-time Monitoring',
            description: 'Advanced tracking systems to monitor disaster prone areas and provide early warnings.'
        },
        {
            icon: '🚑',
            title: 'Quick Response',
            description: 'Integrated responder network ensuring help reaches affected areas within minutes.'
        },
        {
            icon: '🤝',
            title: 'Community Support',
            description: 'Empowering citizens to report incidents and help each other during emergencies.'
        }
    ];

    stats = [
        { value: '24/7', label: 'Monitoring' },
        { value: '500+', label: 'Responders' },
        { value: '100%', label: 'Commitment' }
    ];
}
