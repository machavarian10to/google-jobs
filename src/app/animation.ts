import { trigger, transition, style, query, animate } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', 
    style({ position: 'absolute', top: 0, left: 0, width: '100%' }), { optional: true }),
    query(':leave', animate('700ms ease-out', style({ opacity: 0 })), { optional: true }),
    query(':enter', animate('700ms ease-out', style({ opacity: 1 })), { optional: true }),
  ]),
]);




