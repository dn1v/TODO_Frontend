

// export const fadeIn = trigger('fadeIn', [
//     state('void', style({ opacity: 0 })),
//     state('*', style({ opacity: 100 })),
//     transition('void => *', [
//         animate('300ms ease-in')
//     ]),
// ])

import { Component, HostBinding } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';
