# Employee UI
This is part of a demo to demonistrate Angular UI app and Sprinboot services.
Angular UI app: https://github.com/bhupatikrish/employee-ui
Springboot service: https://github.com/bhupatikrish/employee-service

## Physical architecture diagram
These applications are deployed to Amazon web services as per below architecture.

The app can be either accessed via a desktop or mobile web browser.

Angular application is deployed to Amason S3 bucket as a static web application. 
App Url: http://employee-ui.s3-website-us-east-1.amazonaws.com

Springboot aplication is deployed to Elastic Beanstalk as a Java application.
Service Url: http://employee-service.us-east-1.elasticbeanstalk.com/api/employees

## Component sequesnce diagram
<img src="https://s3.amazonaws.com/github-arch-img/component-sequence.jpg"/>

When the UI application is accessed, the app is donwloaded to the browser. 
Angular application is bootstrapped and based on the route configurations the initial component/ page is loaded.
Angular application calls the backend springboot services asynchronously as needed.

## Angular UI
The app is build using Google material design. https://material.angular.io

When the app is bootstrapped and loaded, based on the route configuration, the default route "sidenav" and its corresponding component/ page SidenavDemoComponent is loaded.

There are two views for the applications. View can switched be selecting 3 dots displayed on the top right of the screen.
1) "/sidenav": Employees displayed in side navigation and the main area displays employee information (view/ edit/ delete/ add). Users can be searched from search box on the side navigation. This search calls the backend "/search" endpoint to filter employees.
2) "/grid"" Employees are displayed using a grid displayed in the center of the screen. Employee information (view/ edit/ delete/ add) is displayed below the grid. The grid can be filtered using the filter above the grid. This is in-memory filtering using Google meterial data table component. https://material.angular.io/components/table/overview




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
